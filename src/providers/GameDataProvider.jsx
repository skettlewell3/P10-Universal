import GameDataReadyGate from "../components/app/GameDataReadyGate";
import { FixtureScoreboardProvider } from "./FixtureScoreboardProvider";
import { FixturesFiltersProvider } from "./FixturesFiltersProvider";
import { FixturesProvider } from "./FixturesProvider";
import { PredictionProvider } from "./PredictionProvider";

export default function GameDataProvider ({children}) {
    return (
        <FixturesProvider>
            <FixturesFiltersProvider>
                <PredictionProvider flavourId={1}>
                    <FixtureScoreboardProvider>
                        <GameDataReadyGate>
                            {children}
                        </GameDataReadyGate>
                    </FixtureScoreboardProvider>
                </PredictionProvider>
            </FixturesFiltersProvider>
        </FixturesProvider>
    )
}