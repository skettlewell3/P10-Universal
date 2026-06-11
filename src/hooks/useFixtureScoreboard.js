import { useContext } from 'react';
import { FixtureScoreboardContext } from '../context/FixtureScoreboardContext';

export function useFixtureScoreboard() {
    const context = useContext(FixtureScoreboardContext);

    if (!context) {
        throw new Error(
            'useFixtureScoreboard must be used within FixtureScoreboardProvider'
        );
    }

    return context;
}