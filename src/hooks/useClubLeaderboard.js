import { useContext } from 'react';
import { ClubLeaderboardContext } from '../context/ClubLeaderboardContext';

export function useClubLeaderboard() {
    const context = useContext(ClubLeaderboardContext);

    if (!context) {
        throw new Error(
            'useClubLeaderboard must be used within ClubLeaderboardProvider'
        );
    }

    return context;
}