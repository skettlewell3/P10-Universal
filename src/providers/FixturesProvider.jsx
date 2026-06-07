import { useEffect, useState, useCallback } from 'react';
import { FixturesContext } from '../context/FixturesContext';
import { useDatabase } from '../hooks/useDatabase';

export function FixturesProvider({ children }) {
    const { supabase } = useDatabase();

    const [fixtures, setFixtures] = useState([]);

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading fixtures..."
    });

    const refreshFixtures = useCallback(async () => {
        // single atomic "start loading" state update
        setLoadingState({
            loading: true,
            message: "Fetching fixtures..."
        });

        try {
            const { data, error } = await supabase.rpc(
                'get_fixture_provider',
                {
                    p_flavour_id: 1
                }
            );

            if (error) throw error;

            // single atomic success update
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
    }, [supabase]);

    // initial load (safe, no dependency chain issues)
    useEffect(() => {
        refreshFixtures();
        console.log("Fixtures initial load fired");
    }, [refreshFixtures]);

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

    // console.log(fixtures)
    return (
        <FixturesContext.Provider
            value={{
                fixtures,
                fixturesLoading: loadingState.loading,
                fixturesLoadingMessage: loadingState.message,
                refreshFixtures
            }}
        >
            {children}
        </FixturesContext.Provider>
    );
}