import { useCallback, useRef, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { ClubLeaderboardContext } from "../context/ClubLeaderboardContext";

export default function ClubLeaderboardProvider({
    children,
}) {
    const { supabase } = useDatabase();
    const [clubLeaderboard, setClubLeaderboard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cacheRef = useRef({});

    const fetchClubLeaderboard = useCallback(async (
        clubId,
        flavourId,
        forceRefresh = false
    ) => {

        if (!clubId || !flavourId) {
            setClubLeaderboard([]);
            return;
        }

        const cacheKey = `${clubId}-${flavourId}`;

        if (
            !forceRefresh &&
            cacheRef.current[cacheKey]
        ) {
            setClubLeaderboard(cacheRef.current[cacheKey]);
            return;
        }

        setLoading(true);
        setError(null);

        const {
            data,
            error,
        } = await supabase.rpc(
            "get_club_leaderboard",
            {
                p_club_id: clubId,
                p_flavour_id: flavourId,
            }
        );

        if (error) {
            console.error(
                "Error fetching club leaderboard:",
                error
            );

            setError("Failed to load club leaderboard.");
            setClubLeaderboard([]);
        } else {
            const rows = data ?? [];

            cacheRef.current[cacheKey] = rows;
            setClubLeaderboard(rows);
        }

        setLoading(false);

    }, []);

    const value = {
        clubLeaderboard,
        loading,
        error,
        fetchClubLeaderboard,
    };

    return (
        <ClubLeaderboardContext.Provider value={value}>
            {children}
        </ClubLeaderboardContext.Provider>
    );
}