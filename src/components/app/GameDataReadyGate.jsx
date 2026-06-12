import SplashScreen from "./SplashScreen";
import { useFixtures } from "../../hooks/useFixtures";
import { usePredictions } from "../../hooks/usePredictions";
import { useLeaderboard }from "../../hooks/useLeaderboard";
// import usePredictions from "../../hooks/usePredictions";

export default function GameDataReadyGate({ children }) {
    const {
        fixturesLoading,
        fixturesLoadingMessage
    } = useFixtures();

    const {
        leaderboardLoading,
        leaderboardLoadingMessage
    } = useLeaderboard();

    const {
        predictionsLoading,
        predictionsLoadingMessage
    } = usePredictions();

    const loadingStates = [
        {
            active: fixturesLoading,
            message: fixturesLoadingMessage
        },

        {
            active: leaderboardLoading,
            message: leaderboardLoadingMessage
        },

        {
            active: predictionsLoading,
            message: predictionsLoadingMessage
        }
    ];

    const active = loadingStates.find(s => s.active);

    if (active) {
        return <SplashScreen message={active.message} />;
    }

    return children;
}