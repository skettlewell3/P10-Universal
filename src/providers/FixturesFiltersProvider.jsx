import { FixturesFiltersContext } from "../context/FixturesFiltersContext";
import { useState } from "react";

export function FixturesFiltersProvider({ children }) {
    const [statusFilter, setStatusFilter] = useState("upcoming");

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