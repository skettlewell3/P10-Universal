import { useContext } from 'react';
import { FixturesContext } from '../context/FixturesContext';

export function useFixtures() {
    const context = useContext(FixturesContext);

    if (!context) {
        throw new Error(
            'useFixtures must be used within FixturesProvider'
        );
    }

    return context;
}