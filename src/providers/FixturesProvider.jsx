import { useEffect, useState, useCallback } from 'react';
import { FixtureContext } from '../context/FixtureContext';
import { useDatabase } from '../hooks/useDatabase';

export function FixturesProvider({ children }) {
    const { supabase } = useDatabase();

    const [fixtures, setFixtures] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshFixtures = useCallback(async () => {
        const { data, error } = await supabase.rpc(
            'get_fixture_provider',
            {
                p_flavour_id: 1
            }
        );

        if (error) {
            console.error('Failed to load fixtures:', error);
            return;
        }

        setFixtures(data || []);
        setLoading(false);
    }, [supabase]);

    useEffect(() => {
        console.log("Fixtures effect fired")
        refreshFixtures();
    }, [refreshFixtures]);

    useEffect(() => {
        const channel = supabase
            .channel('fixtures-provider')

            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'fixtures'
                },
                () => refreshFixtures()
            )

            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'results'
                },
                () => refreshFixtures()
            )

            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'ties'
                },
                () => refreshFixtures()
            )

            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'gameweeks'
                },
                () => refreshFixtures()
            )

            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'stages'
                },
                () => refreshFixtures()
            )

            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, refreshFixtures]);

    return (
        <FixtureContext.Provider
            value={{
                fixtures,
                loading
            }}
        >
            {children}
        </FixtureContext.Provider>
    );
}