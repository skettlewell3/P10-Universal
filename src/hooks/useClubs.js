import { useContext } from 'react';
import { ClubsContext } from '../context/ClubsContext';

export function useClubs() {
    const context = useContext(ClubsContext);

    if (!context) {
        throw new Error(
            'useClubs must be used within ClubsProvider'
        );
    }

    return context;
}