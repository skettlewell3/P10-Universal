import GameDataReadyGate from "../components/app/GameDataReadyGate";
import ClubLeaderboardProvider from "./ClubLeaderboardProvider";
import { FixtureScoreboardProvider } from "./FixtureScoreboardProvider";
import { FixturesFiltersProvider } from "./FixturesFiltersProvider";
import { FixturesProvider } from "./FixturesProvider";
import GameweeksProvider from "./GameweeksProvider";
import LeaderboardProvider from "./LeaderboardProvider";
import { PredictionProvider } from "./PredictionProvider";
import ProfileTickerProvider from "./ProfileTickerProvider";
import StageProvider from "./StageProvider";
import { TablesProvider } from "./TablesProvider";
import { TeamComparisonProvider } from "./TeamComparisonProvider";
import TeamsProvider from "./TeamsProvider";

export default function GameDataProvider ({children}) {
    return (
        <StageProvider>
            <GameweeksProvider>
                <ProfileTickerProvider>
                    <TeamsProvider>
                        <FixturesProvider>
                            <TablesProvider >
                                <FixturesFiltersProvider>
                                    <PredictionProvider>
                                        <LeaderboardProvider>
                                            <ClubLeaderboardProvider>
                                                <FixtureScoreboardProvider>
                                                    <TeamComparisonProvider>
                                                        <GameDataReadyGate>
                                                            {children}
                                                        </GameDataReadyGate>
                                                    </TeamComparisonProvider>
                                                </FixtureScoreboardProvider>
                                            </ClubLeaderboardProvider>
                                        </LeaderboardProvider>
                                    </PredictionProvider>
                                </FixturesFiltersProvider>
                            </TablesProvider>
                        </FixturesProvider>
                    </TeamsProvider>
                </ProfileTickerProvider>
            </GameweeksProvider>
        </StageProvider>
    )
}