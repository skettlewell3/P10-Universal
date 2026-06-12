import { useCallback, useEffect, useState } from "react";
import { LeaderboardContext } from "../context/LeaderboardContext"
import { useDatabase } from "../hooks/useDatabase"

export default function LeaderboardProvider({children}) {
    const { supabase } = useDatabase();

    const [leaderboard, setLeaderboard] = useState([]);
    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading Leaderboards..."
    });

    const [scopeType, setScopeType] = useState("campaign");
    const [scopeId, setScopeId] = useState(null);

    const flavourId = 1;

    const refreshLeaderboard = useCallback(async () => {
        setLoadingState({
            loading: true,
            message: "Fetching Leaderboard..."
        });

        try {
            const { data, error } = await supabase.rpc(
                'get_from_leaderboard',
                {
                    p_flavour_id: flavourId,
                    p_scope_type:scopeType,
                    p_scope_id: scopeId
                }
            );

            if (error) throw error;

            setLeaderboard(data ?? []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingState({
                loading: false,
                message: ""
            });
        }
    }, [supabase, flavourId, scopeType, scopeId]);

    useEffect(() => {
        refreshLeaderboard();
    }, [refreshLeaderboard]);

    useEffect(() => {
        
        const channel = supabase
            .channel("leadboard-provider")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "leaderboard"
                },
                (payload) => {
                    console.log("leaderboard changed", payload)
                    refreshLeaderboard();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, refreshLeaderboard])

    const value = {
        leaderboard,
        leadeboardCount: leaderboard.length,
        leaderboardLoading: loadingState.loading,
        leaderboardLoadingMessage: loadingState.message,
        scopeType,
        scopeId,
        
        refreshLeaderboard,
        setScopeType,
        setScopeId
    }


    return (
        <LeaderboardContext.Provider value={value}>
            {children}
        </LeaderboardContext.Provider>
    )
}