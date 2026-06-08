import { useContext } from 'react';
import { PredictionsContext } from '../context/PredictionsContext';

export function usePredictions() {
    const context = useContext(PredictionsContext);

    if (!context) {
        throw new Error(
            'usePredictions must be used within PredictionsProvider'
        );
    }

    return context;
}