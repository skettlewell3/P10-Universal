import { useContext } from 'react';
import { TeamComparisonContext } from '../context/TeamComparisonContext';

export function useTeamComparison() {
    const context = useContext(TeamComparisonContext);

    if (!context) {
        throw new Error(
            'useTeamComparison must be used within TeamComparisonProvider'
        );
    }

    return context;
}