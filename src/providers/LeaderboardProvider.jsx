import { useCallback, useEffect, useState, useRef } from "react";
import { LeaderboardContext } from "../context/LeaderboardContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";
import { useFlavour } from "../hooks/useFlavour";

export default function LeaderboardProvider({ children }) {
    const { supabase } = useDatabase();
    const { refreshSignal } = useAuth();

    const [leaderboard, setLeaderboard] = useState([]);
    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading Leaderboards..."
    });

    const [scopeType, setScopeType] = useState("campaign");
    const [scopeId, setScopeId] = useState(null);
    const [population, setPopulation] = useState("global");

    const {
        flavourId,
        activeCampaignId
    } = useFlavour();

    const cacheRef = useRef({});
    const requestRef = useRef(0);
    const refreshLeaderboardRef = useRef();
    
    const effectiveScopeId =
        scopeType === "campaign"
            ? activeCampaignId
            : scopeId;

    const refreshLeaderboard = useCallback(async () => {
        if (
            (scopeType === "campaign" || scopeType === "stage") &&
            effectiveScopeId == null
        ) {
            return;
        }

        const cacheKey =
            `${flavourId}:${scopeType}:${effectiveScopeId}:${population}`;

        if (cacheRef.current[cacheKey]) {
            setLeaderboard(cacheRef.current[cacheKey]);

            setLoadingState({
                loading: false,
                message: ""
            });

            return;
        }

        const requestId = ++requestRef.current;

        setLoadingState({
            loading: true,
            message: "Fetching Leaderboard..."
        });

        try {
            const { data, error } = await supabase.rpc(
                "get_from_leaderboard",
                {
                    p_flavour_id: flavourId,
                    p_scope_type: scopeType,
                    p_scope_id: effectiveScopeId,
                    p_population: population
                }
            );

            if (error) throw error;

            if (requestId !== requestRef.current) return;

            const result = data ?? [];

            cacheRef.current[cacheKey] = result;

            setLeaderboard(result);
        } catch (error) {
            console.error(error);
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
        flavourId,
        scopeType,
        effectiveScopeId,
        population
    ]);

    useEffect(() => {
        refreshLeaderboardRef.current = refreshLeaderboard;
    }, [refreshLeaderboard]);

    useEffect(() => {
        refreshLeaderboard();
    }, [refreshLeaderboard]);

    useEffect(() => {
        if (!refreshSignal) return;

        cacheRef.current = {};

        refreshLeaderboard();
    }, [refreshSignal, refreshLeaderboard]);

    useEffect(() => {
        const channel = supabase
            .channel("leaderboard-provider")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "leaderboard"
                },
                () => {
                    cacheRef.current = {};

                    refreshLeaderboardRef.current?.();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    const value = {
        leaderboard,
        leaderboardCount: leaderboard.length,
        leaderboardLoading: loadingState.loading,
        leaderboardLoadingMessage: loadingState.message,

        scopeType,
        scopeId: effectiveScopeId,

        population,

        refreshLeaderboard,
        setScopeType,
        setScopeId,
        setPopulation
    };

    return (
        <LeaderboardContext.Provider value={value}>
            {children}
        </LeaderboardContext.Provider>
    );
}