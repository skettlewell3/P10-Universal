import GameDataReadyGate from "../components/app/GameDataReadyGate";
import { FixturesFiltersProvider } from "./FixturesFiltersProvider";
import { FixturesProvider } from "./FixturesProvider";
import { PredictionProvider } from "./PredictionProvider";

export default function GameDataProvider ({children}) {
    return (
        <FixturesProvider>
            <FixturesFiltersProvider>
                <PredictionProvider flavourId={1}>
                    <GameDataReadyGate>
                        {children}
                    </GameDataReadyGate>
                </PredictionProvider>
            </FixturesFiltersProvider>
        </FixturesProvider>
    )
}