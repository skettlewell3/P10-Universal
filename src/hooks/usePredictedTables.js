import { useContext } from 'react';
import { PredictedTablesContext } from '../context/PredictedTablesContext';

export function usePredictedTables() {
    const context = useContext(PredictedTablesContext);

    if (!context) {
        throw new Error(
            'usePredictedTables must be used within PredictedTablesProvider'
        );
    }

    return context;
}