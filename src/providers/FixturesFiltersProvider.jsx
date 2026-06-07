import { FixturesFiltersContext } from "../context/FixturesFiltersContext";
import { useState } from "react";

export function FixturesFiltersProvider({ children }) {
    const [statusFilter, setStatusFilter] = useState("all");

    const value = {
        statusFilter,
        setStatusFilter
    };

    return (
        <FixturesFiltersContext.Provider value={value}>
            {children}
        </FixturesFiltersContext.Provider>
    );
}