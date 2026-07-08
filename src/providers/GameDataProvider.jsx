import GameDataReadyGate from "../components/app/GameDataReadyGate";
import { FixtureScoreboardProvider } from "./FixtureScoreboardProvider";
import { FixturesFiltersProvider } from "./FixturesFiltersProvider";
import { FixturesProvider } from "./FixturesProvider";
import GameweeksProvider from "./GameweeksProvider";
import LeaderboardProvider from "./LeaderboardProvider";
import { PredictionProvider } from "./PredictionProvider";
import ProfileTickerProvider from "./ProfileTickerProvider";
import StageProvider from "./StageProvider";
import TeamsProvider from "./TeamsProvider";

export default function GameDataProvider ({children}) {
    return (
        <StageProvider>
            <GameweeksProvider>
                <ProfileTickerProvider>
                    <TeamsProvider>
                        <FixturesProvider>
                            <FixturesFiltersProvider>
                                <PredictionProvider>
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
                </ProfileTickerProvider>
            </GameweeksProvider>
        </StageProvider>
    )
}