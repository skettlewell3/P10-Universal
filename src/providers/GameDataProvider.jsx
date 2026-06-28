import GameDataReadyGate from "../components/app/GameDataReadyGate";
import { FixtureScoreboardProvider } from "./FixtureScoreboardProvider";
import { FixturesFiltersProvider } from "./FixturesFiltersProvider";
import { FixturesProvider } from "./FixturesProvider";
import LeaderboardProvider from "./LeaderboardProvider";
import { PredictionProvider } from "./PredictionProvider";
import StageProvider from "./StageProvider";
import TeamsProvider from "./TeamsProvider";

export default function GameDataProvider ({children}) {
    return (
        <StageProvider>
            <TeamsProvider>
                <FixturesProvider>
                    <FixturesFiltersProvider>
                        <PredictionProvider flavourId={1}>
                            <LeaderboardProvider>
                                <FixtureScoreboardProvider>
                                    <GameDataReadyGate>
                                        {children}
                                    </GameDataReadyGate>
                                </FixtureScoreboardProvider>
                            </LeaderboardProvider>
                        </PredictionProvider>
                    </FixturesFiltersProvider>
                </FixturesProvider>
            </TeamsProvider>
        </StageProvider>
    )
}