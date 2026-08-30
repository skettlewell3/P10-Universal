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
        activeCampaignId,
        loading: flavourLoading
    } = useFlavour();

    const cacheRef = useRef({});
    const requestRef = useRef(0);
    const refreshLeaderboardRef = useRef();

    const effectiveScopeId =
        scopeType === "campaign"
            ? activeCampaignId
            : scopeId;

    const refreshLeaderboard = useCallback(async () => {
        console.log("LEADERBOARD REFRESH", {
            flavourId,
            activeCampaignId,
            scopeType,
            effectiveScopeId,
            population,
            flavourLoading
        });

        // Flavour has not finished resolving yet.
        if (flavourLoading) {
            return;
        }

        // No flavour means there is nothing to load.
        if (!flavourId) {
            return;
        }

        // Campaign/stage leaderboards require a resolved scope.
        if (
            (scopeType === "campaign" || scopeType === "stage") &&
            effectiveScopeId == null
        ) {
            setLoadingState({
                loading: true,
                message: "Waiting for scope..."
            });

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
            console.log("LEADERBOARD RPC START");

            const { data, error } = await supabase.rpc(
                "get_from_leaderboard",
                {
                    p_flavour_id: flavourId,
                    p_scope_type: scopeType,
                    p_scope_id: effectiveScopeId,
                    p_population: population
                }
            );

            console.log("LEADERBOARD RPC RESULT", {
                data,
                error
            });

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

        console.log("LEADERBOARD FINALLY", {
            requestId,
            currentRequestId: requestRef.current
        });
    }, [
        supabase,
        flavourId,
        activeCampaignId,
        flavourLoading,
        scopeType,
        effectiveScopeId,
        population
    ]);

    useEffect(() => {
        console.log("LEADERBOARD SCOPE CHANGED", {
            flavourId,
            activeCampaignId,
            effectiveScopeId
        });
    }, [
        flavourId,
        activeCampaignId,
        effectiveScopeId
    ]);

    useEffect(() => {
        refreshLeaderboardRef.current = refreshLeaderboard;
    }, [refreshLeaderboard]);

    // Initial load and reload when leaderboard dependencies change.
    useEffect(() => {
        refreshLeaderboard();
    }, [refreshLeaderboard]);

    // Explicit refresh requested by AuthProvider.
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