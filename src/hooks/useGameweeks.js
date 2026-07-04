import { useContext } from 'react';
import { GameweeksContext } from '../context/GameweeksContext';

export function useGameweeks() {
    const context = useContext(GameweeksContext);

    if (!context) {
        throw new Error(
            'useGameweeks must be used within GameweeksProvider'
        );
    }

    return context;
}