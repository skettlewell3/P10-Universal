import { useContext } from "react";
import { FixturesFiltersContext } from "../context/FixturesFiltersContext";

export function useFixturesFilters() {
    const context = useContext(FixturesFiltersContext);

    if (!context) {
        throw new Error (
            'useFixturesFilters must be used within FixturesFiltersProvider'
        )
    }

    return context;
}