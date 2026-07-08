import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { ProfileTickerContext } from "../context/ProfileTickerContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import { useFlavour } from "../hooks/useFlavour";
import { useStage } from "../hooks/useStage";


export default function ProfileTickerProvider({ children }) {

    const { supabase } = useDatabase();
    const { refreshSignal } = useAuth();

    const { profile } = useProfile();
    const { flavourId, activeCampaignId } = useFlavour();
    const { tickerStageId } = useStage();

    const profileId = profile?.profile_id;

    console.log("profile:", profileId)
    console.log("flavourId:", flavourId)
    console.log("activeCampaignId:", activeCampaignId)
    console.log("stage:", tickerStageId)

    const [ticker, setTicker] = useState({
        global: null,
        flavour: null,
        campaign: null,
        stage: null
    });

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading profile ticker..."
    });

    const cacheRef = useRef({});
    const requestRef = useRef(0);

    const refreshTicker = useCallback(async () => {
        if (
            !profileId ||
            !flavourId ||
            !activeCampaignId ||
            !tickerStageId
        ) {
            return;
        }

        const cacheKey = `${profileId}:${flavourId}:${activeCampaignId}:${tickerStageId}`;

        // serve cache instantly
        if (cacheRef.current[cacheKey]) {

            setTicker(cacheRef.current[cacheKey]);

            setLoadingState({
                loading: false,
                message: ""
            });

            return;
        }

        const requestId = ++requestRef.current;

        setLoadingState({
            loading: true,
            message: "Fetching profile ticker..."
        });

        try {
            const { data, error } = await supabase.rpc(
                "get_profile_ticker",
                {
                    p_profile_id: profileId,
                    p_flavour_id: flavourId,
                    p_campaign_id: activeCampaignId,
                    p_stage_id: tickerStageId
                }
            );

            console.log("ticker rpc data:", data);
            console.log("ticker rpc error:", error);

            if (error) throw error;

            if (requestId !== requestRef.current) return;

            const result = {
                global:
                    data?.find(
                        item => item.scope === "global"
                    ) ?? null,

                flavour:
                    data?.find(
                        item => item.scope === "flavour"
                    ) ?? null,

                campaign:
                    data?.find(
                        item => item.scope === "campaign"
                    ) ?? null,

                stage:
                    data?.find(
                        item => item.scope === "stage"
                    ) ?? null,
            };

            cacheRef.current[cacheKey] = result;

            setTicker(result);

        } catch(error) {

            console.error(
                "Failed to load profile ticker:",
                error
            );

        } finally {

            if (requestId === requestRef.current) {

                setLoadingState({
                    loading: false,
                    message: ""
                });

            }

        }

    }, [
        supabase,
        profileId,
        flavourId,
        activeCampaignId,
        tickerStageId
    ]);

    // initial load
    useEffect(() => {
        refreshTicker();
    }, [refreshTicker]);

    // auth refresh
    useEffect(() => {
        if (!refreshSignal) return;
        cacheRef.current = {};
        refreshTicker();
    }, [
        refreshSignal,
        refreshTicker
    ]);

    // expose flat values for easier header consumption
    const tickerStats = useMemo(() => {

        return {
            globalPoints:
                ticker.global?.total_points ?? 0,
            globalRank:
                ticker.global?.rank_position ?? null,
            flavourPoints:
                ticker.flavour?.total_points ?? 0,
            flavourRank:
                ticker.flavour?.rank_position ?? null,
            campaignPoints:
                ticker.campaign?.total_points ?? 0,
            campaignRank:
                ticker.campaign?.rank_position ?? null,
            stagePoints:
                ticker.stage?.total_points ?? 0,
            stageRank:
                ticker.stage?.rank_position ?? null,
        };

    }, [ticker]);

    const value = {
        ticker,
        ...tickerStats,
        tickerLoading: loadingState.loading,
        tickerLoadingMessage: loadingState.message,
        refreshTicker
    };

    return (
        <ProfileTickerContext.Provider value={value}>
            {children}
        </ProfileTickerContext.Provider>
    );
}