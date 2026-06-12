import { useState, useEffect, useRef, useCallback } from "react";
import { FixtureScoreboardContext } from "../context/FixtureScoreboardContext";
import { useDatabase } from "../hooks/useDatabase";

const STALE_AFTER_MS = 60 * 1000;
const DEBOUNCE_MS = 500;

export function FixtureScoreboardProvider({ children }) {
    const { supabase } = useDatabase();

    const [fixtureLeaderboard, setFixtureLeaderboard] = useState({});
    const [loadingFixtureLeaderboard, setLoadingFixtureLeaderboard] = useState({});

    const activeFixtureIds = useRef(new Set());
    const lastFetched = useRef({});
    const pendingRefreshes = useRef({});

    const fetchFixtureLeaderboard = useCallback(async (
        fixtureId,
        { force = false } = {}
    ) => {

        const now = Date.now();
        const lastFetchTime = lastFetched.current[fixtureId];
        const existingData = fixtureLeaderboard[fixtureId];
        const hasData = existingData !== undefined;

        const isStale =
            !lastFetchTime ||
            (now - lastFetchTime > STALE_AFTER_MS);

        // prevent unnecessary calls
        if (!force && hasData && !isStale) {
            return;
        }

        setLoadingFixtureLeaderboard(prev => ({
            ...prev,
            [fixtureId]: true
        }));

        const { data, error } = await supabase.rpc(
            "get_fixture_leaderboard",
            {
                p_fixture_id: fixtureId
            }
        );

        if (error) {
            console.error(
                `Failed to fetch fixture leaderboard ${fixtureId}`,
                error
            );

            setLoadingFixtureLeaderboard(prev => ({
                ...prev,
                [fixtureId]: false
            }));

            return;
        }

        setFixtureLeaderboard(prev => ({
            ...prev,
            [fixtureId]: data ?? []
        }));

        lastFetched.current[fixtureId] = now;

        setLoadingFixtureLeaderboard(prev => ({
            ...prev,
            [fixtureId]: false
        }));

    }, [fixtureLeaderboard, supabase]);

    const openFixtureLeaderboard = useCallback((fixtureId) => {
        activeFixtureIds.current.add(fixtureId);
        fetchFixtureLeaderboard(fixtureId, { force: false });
    }, [fetchFixtureLeaderboard]);

    const closeFixtureLeaderboard = useCallback((fixtureId) => {
        activeFixtureIds.current.delete(fixtureId);
    }, []);

    // console.log("leaderboard:", fixtureLeaderboard)

    useEffect(() => {

        const channel = supabase
            .channel("fixture-scoreboards")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "prediction_scores"
                },
                payload => {

                    const fixtureId =
                        payload.new?.fixture_id ??
                        payload.old?.fixture_id;

                    if (!fixtureId) return;

                    if (!activeFixtureIds.current.has(fixtureId)) {
                        return;
                    }

                    if (pendingRefreshes.current[fixtureId]) {
                        return;
                    }

                    pendingRefreshes.current[fixtureId] = true;

                    setTimeout(async () => {
                        try {
                            await fetchFixtureLeaderboard(
                                fixtureId,
                                { force: true }
                            );
                        } finally {
                            delete pendingRefreshes.current[fixtureId];
                        }
                    }, DEBOUNCE_MS);

                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };

    }, [supabase, fetchFixtureLeaderboard]);

    const value = {
        fixtureLeaderboard,
        loadingFixtureLeaderboard,

        fetchFixtureLeaderboard,
        openFixtureLeaderboard,
        closeFixtureLeaderboard
    };

    return (
        <FixtureScoreboardContext.Provider value={value}>
            {children}
        </FixtureScoreboardContext.Provider>
    );
}