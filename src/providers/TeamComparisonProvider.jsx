import { useCallback, useState } from "react";
import { TeamComparisonContext } from "../context/TeamComparisonContext";
import { useDatabase } from "../hooks/useDatabase";
import { useFlavour } from "../hooks/useFlavour";

export function TeamComparisonProvider({ children }) {
    const { supabase } = useDatabase();
    const { flavourId } = useFlavour();

    const [comparisons, setComparisons] = useState({});
    const [loadingState, setLoadingState] = useState({
        loading: false,
        message: ""
    });
    const [error, setError] = useState(null);

    const fetchTeamComparison = useCallback(async (
        team1Id,
        team2Id
    ) => {
        if (!flavourId || !team1Id || !team2Id) return null;

        const key = `${team1Id}-${team2Id}`;

        // Return cached comparison
        if (comparisons[key]) {
            return comparisons[key];
        }

        setLoadingState({
            loading: true,
            message: "Fetching team comparison..."
        });

        setError(null);

        try {
            const { data, error } = await supabase.rpc(
                "get_team_results_comparison",
                {
                    p_flavour_id: flavourId,
                    p_team_1_id: team1Id,
                    p_team_2_id: team2Id
                }
            );

            if (error) throw error;

            const result = data || [];

            setComparisons(prev => ({
                ...prev,
                [key]: result
            }));

            setLoadingState({
                loading: false,
                message: ""
            });

            return result;

        } catch (error) {
            console.error(
                "Failed to load team comparison:",
                error
            );

            setError(error);

            setLoadingState({
                loading: false,
                message: "Failed to load team comparison"
            });

            return null;
        }
    }, [
        supabase,
        flavourId,
        comparisons
    ]);

    const clearComparisons = useCallback(() => {
        setComparisons({});
    }, []);

    return (
        <TeamComparisonContext.Provider
            value={{
                comparisons,
                loading: loadingState.loading,
                loadingMessage: loadingState.message,
                error,
                fetchTeamComparison,
                clearComparisons
            }}
        >
            {children}
        </TeamComparisonContext.Provider>
    );
}