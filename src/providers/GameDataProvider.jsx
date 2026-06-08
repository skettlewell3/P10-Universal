import { FixturesFiltersProvider } from "./FixturesFiltersProvider";
import { FixturesProvider } from "./FixturesProvider";
import { PredictionProvider } from "./PredictionProvider";

export default function GameDataProvider ({children}) {
    return (
        <FixturesProvider>
            <FixturesFiltersProvider>
                <PredictionProvider>
                    {children}
                </PredictionProvider>
            </FixturesFiltersProvider>
        </FixturesProvider>
    )
}