import { useEffect, useState, useCallback, useMemo } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { FixturesContext } from "../context/FixturesContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";
import { useFlavour } from "../hooks/useFlavour";

export function FixturesProvider({ children }) {
    const { supabase } = useDatabase();
    const { refreshSignal } = useAuth();

    const { flavourId } = useFlavour();

    const [fixtures, setFixtures] = useState([]);

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading fixtures..."
    });

    const fetchFixtures = useCallback(async ({
        showLoading = false
    } = {}) => {
        if (!flavourId) return;

        if (showLoading) {
            setLoadingState({
                loading: true,
                message: "Fetching fixtures..."
            });
        }

        try {
            const { data, error } = await supabase.rpc(
                "get_fixture_provider",
                {
                    p_flavour_id: flavourId
                }
            );

            if (error) throw error;

            setFixtures(data || []);

            if (showLoading) {
                setLoadingState({
                    loading: false,
                    message: ""
                });
            }

        } catch (error) {
            console.error(
                "Failed to load fixtures:",
                error
            );

            if (showLoading) {
                setLoadingState({
                    loading: false,
                    message: "Failed to load fixtures"
                });
            }
        }
    }, [supabase, flavourId]);

    // Initial load only.
    // This is the only fixture fetch that should block the UI.
    useEffect(() => {
        fetchFixtures({
            showLoading: true
        });
    }, [fetchFixtures]);

    // App/session resume refresh.
    // Existing fixtures remain visible while this happens.
    useEffect(() => {
        if (!refreshSignal) return;

        console.log(
            "SESSION REFRESH REQUEST -> FIXTURES"
        );

        fetchFixtures();
    }, [refreshSignal, fetchFixtures]);

    // Realtime updates.
    // These refresh fixture data silently without showing
    // the global loading screen.
    useEffect(() => {
        const channel = supabase
            .channel("fixtures-provider")

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "fixtures"
                },
                (payload) => {
                    console.log(
                        "REALTIME FIXTURES CHANGE -> FIXTURES",
                        payload
                    );

                    fetchFixtures();
                }
            )

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "results"
                },
                (payload) => {
                    console.log(
                        "REALTIME RESULTS CHANGE -> FIXTURES",
                        payload
                    );

                    fetchFixtures();
                }
            )

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "ties"
                },
                (payload) => {
                    console.log(
                        "REALTIME TIES CHANGE -> FIXTURES",
                        payload
                    );

                    fetchFixtures();
                }
            )

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "gameweeks"
                },
                (payload) => {
                    console.log(
                        "REALTIME GAMEWEEKS CHANGE -> FIXTURES",
                        payload
                    );

                    fetchFixtures();
                }
            )

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "stages"
                },
                (payload) => {
                    console.log(
                        "REALTIME STAGES CHANGE -> FIXTURES",
                        payload
                    );

                    fetchFixtures();
                }
            )

            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, fetchFixtures]);

    const groupByKickoff = (fixtures) => {
        return fixtures.reduce((acc, f) => {
            const key = f.kickoff_at;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(f);

            return acc;
        }, {});
    };

    const groupedByKickoff = useMemo(() => {
        return groupByKickoff(fixtures);
    }, [fixtures]);

    const snapshotFixtures = useMemo(() => {
        if (!fixtures.length) return [];

        const userTimeZone =
            Intl.DateTimeFormat()
                .resolvedOptions()
                .timeZone;

        const today = formatInTimeZone(
            new Date(),
            userTimeZone,
            "yyyy-MM-dd"
        );

        const todaysFixtures = fixtures
            .filter(fixture => {
                const fixtureDate = formatInTimeZone(
                    new Date(fixture.kickoff_at),
                    userTimeZone,
                    "yyyy-MM-dd"
                );

                return fixtureDate === today;
            })
            .sort(
                (a, b) =>
                    new Date(a.kickoff_at) -
                    new Date(b.kickoff_at)
            );

        if (!todaysFixtures.length) {
            return [];
        }

        const liveFixtures =
            todaysFixtures.filter(fixture =>
                fixture.fixture_status === "live_90" ||
                fixture.fixture_status === "live_et"
            );

        if (liveFixtures.length) {
            return liveFixtures;
        }

        return todaysFixtures;
    }, [fixtures]);

    return (
        <FixturesContext.Provider
            value={{
                fixtures,
                groupByKickoff,
                groupedByKickoff,
                snapshotFixtures,

                fixturesLoading: loadingState.loading,
                fixturesLoadingMessage: loadingState.message,                
                refreshFixtures: fetchFixtures
            }}
        >
            {children}
        </FixturesContext.Provider>
    );
}