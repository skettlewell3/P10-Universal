import SplashScreen from "./SplashScreen";
import useFixtures from "../../hooks/useFixtures";
// import useLeaderboards from "../../hooks/useLeaderboards";
// import usePredictions from "../../hooks/usePredictions";

export default function GameDataReadyGate({ children }) {
    const {
        fixturesLoading,
        fixturesLoadingMessage
    } = useFixtures();

    // const {
    //     leaderboardsLoading,
    //     leaderboardsLoadingMessage
    // } = useLeaderboards();

    // const {
    //     predictionsLoading,
    //     predictionsLoadingMessage
    // } = usePredictions();

    const loadingStates = [
        {
            active: fixturesLoading,
            message: fixturesLoadingMessage
        },

        // {
        //     active: leaderboardsLoading,
        //     message: leaderboardsLoadingMessage
        // },

        // {
        //     active: predictionsLoading,
        //     message: predictionsLoadingMessage
        // }
    ];

    const active = loadingStates.find(s => s.active);

    if (active) {
        return <SplashScreen message={active.message} />;
    }

    return children;
}