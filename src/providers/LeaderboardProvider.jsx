import { useCallback, useEffect, useState, useRef } from "react";
import { LeaderboardContext } from "../context/LeaderboardContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";

export default function LeaderboardProvider({ children }) {
    const { supabase } = useDatabase();
    const { refreshSignal } = useAuth();

    const [leaderboard, setLeaderboard] = useState([]);
    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading Leaderboards..."
    });

    const [scopeType, setScopeType] = useState("campaign");
    const [scopeId, setScopeId] = useState(1);

    const flavourId = 1;

    const cacheRef = useRef({});
    const requestRef = useRef(0);

    const getCacheKey = useCallback(() => {
        return `${flavourId}:${scopeType}:${scopeId}`;
    }, [flavourId, scopeType, scopeId]);

    const refreshLeaderboard = useCallback(async () => {
        if (
            (scopeType === "campaign" || scopeType === "stage") &&
            scopeId == null
        ) {
            return;
        }

        const cacheKey = `${flavourId}:${scopeType}:${scopeId}`;

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
                    p_scope_id: scopeId
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
    }, [supabase, flavourId, scopeType, scopeId]);

    useEffect(() => {
        refreshLeaderboard();
    }, [refreshLeaderboard]);

    useEffect(() => {
        if (!refreshSignal) return;

        cacheRef.current = {};

        refreshLeaderboard();
    }, [refreshSignal, refreshLeaderboard])

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
                (payload) => {
                    console.log("leaderboard changed", payload);

                    // IMPORTANT: invalidate cache so realtime actually updates UI
                    cacheRef.current = {};

                    refreshLeaderboard();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, refreshLeaderboard]);

    const value = {
        leaderboard,
        leaderboardCount: leaderboard.length,
        leaderboardLoading: loadingState.loading,
        leaderboardLoadingMessage: loadingState.message,

        scopeType,
        scopeId,

        refreshLeaderboard,
        setScopeType,
        setScopeId
    };

    return (
        <LeaderboardContext.Provider value={value}>
            {children}
        </LeaderboardContext.Provider>
    );
}