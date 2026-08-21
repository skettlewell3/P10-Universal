import { useEffect, useState, useCallback, useMemo } from 'react';
import { FixturesContext } from '../context/FixturesContext';
import { useDatabase } from '../hooks/useDatabase';
import { useAuth } from '../hooks/useAuth';
import { useFlavour } from '../hooks/useFlavour'; 

export function FixturesProvider({ children }) {
    const { supabase } = useDatabase();
    const { refreshSignal } = useAuth();

    const { flavourId } = useFlavour();

    const [fixtures, setFixtures] = useState([]);

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading fixtures..."
    });

    const refreshFixtures = useCallback(async () => {
        if (!flavourId) return;

        setLoadingState({
            loading: true,
            message: "Fetching fixtures..."
        });

        try {
            const { data, error } = await supabase.rpc(
                'get_fixture_provider',
                {
                    p_flavour_id: flavourId
                }
            );

            if (error) throw error;

            setFixtures(data || []);

            setLoadingState({
                loading: false,
                message: ""
            });

        } catch (error) {
            console.error('Failed to load fixtures:', error);

            setLoadingState({
                loading: false,
                message: "Failed to load fixtures"
            });
        }
    }, [supabase, flavourId]);

    // initial load (safe, no dependency chain issues)
    useEffect(() => {
        refreshFixtures();
        // console.log("Fixtures initial load fired");
    }, [refreshFixtures]);

    useEffect(() => {
      if (!refreshSignal) return;

      console.log(
        "SESSION REFRESH REQUEST -> FIXTURES"
      );

      refreshFixtures();
    }, [refreshSignal, refreshFixtures]);

    // realtime updates
    useEffect(() => {
        const channel = supabase
            .channel('fixtures-provider')

            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'fixtures'
            }, refreshFixtures)

            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'results'
            }, refreshFixtures)

            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'ties'
            }, refreshFixtures)

            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'gameweeks'
            }, refreshFixtures)

            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'stages'
            }, refreshFixtures)

            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, refreshFixtures]);

    const groupByKickoff = (fixtures) => {
        return fixtures.reduce((acc, f) => {
            const key = f.kickoff_at; 
            if (!acc[key]) acc[key] = [];
            acc[key].push(f);
            return acc;
        }, {});
    };

    const groupedByKickoff = useMemo(() => {
        return groupByKickoff(fixtures);
    }, [fixtures]);

    const snapshotFixtures = useMemo(() => {
        const groups = Object.values(groupedByKickoff);

        if (!groups.length) return [];

        const liveGroups = groups
            .filter(group =>
                group.some(f => f.fixture_status === "live_90" || f.fixture_status === "live_et" )
            )
            .sort((a, b) =>
                new Date(a[0].kickoff_at) -
                new Date(b[0].kickoff_at)
            );

        if (liveGroups.length) {
            return liveGroups[0];
        }

        const finishedGroups = groups
            .filter(group =>
                group.every(f => f.fixture_status === "finished")
            )
            .sort((a, b) =>
                new Date(b[0].kickoff_at) -
                new Date(a[0].kickoff_at)
            );

        if (finishedGroups.length) {
            return finishedGroups[0];
        }

        const upcomingGroups = groups
            .filter(group =>
                group.every(f => f.fixture_status === "upcoming")
            )
            .sort((a, b) =>
                new Date(a[0].kickoff_at) -
                new Date(b[0].kickoff_at)
            );

        return upcomingGroups[0] || [];
    }, [groupedByKickoff]);

    // console.log("RAW FIXTURES:", fixtures);
    return (
        <FixturesContext.Provider
            value={{
                fixtures,
                groupByKickoff,
                groupedByKickoff,
                snapshotFixtures,
                fixturesLoading: loadingState.loading,
                fixturesLoadingMessage: loadingState.message,
                refreshFixtures
            }}
        >
            {children}
        </FixturesContext.Provider>
    );
}