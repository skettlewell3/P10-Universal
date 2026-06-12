import { useContext } from "react";
import { LeaderboardContext } from "../context/LeaderboardContext";

export function useLeaderboard() {
    const context = useContext(LeaderboardContext);

    if (!context) {
        throw new Error (
            'useLeaderboard must be used within LeaderboardProvider'
        )
    }

    return context;
}