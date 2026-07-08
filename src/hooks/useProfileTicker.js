import { useContext } from 'react';
import { ProfileTickerContext } from '../context/ProfileTickerContext';

export function useProfileTicker() {
    const context = useContext(ProfileTickerContext);

    if (!context) {
        throw new Error(
            'useProfileTicker must be used within ProfileTickerProvider'
        );
    }

    return context;
}