import { FixturesFiltersContext } from "../context/FixturesFiltersContext";
import { useFixtures } from "../hooks/useFixtures";
import { useMemo, useState } from "react";

function getDefaultSortForStatus(status) {
    switch (status) {
        case "finished":
            return {
                field: "kickoff_at",
                direction: "desc",
            };

        case "upcoming":
        case "live":
        case "all":
        default:
            return {
                field: "kickoff_at",
                direction: "asc",
            };
    }
}

function resolveSort(filtersStatus, sortPreset) {
    const base = getDefaultSortForStatus(filtersStatus);

    switch (sortPreset) {
        case "desc":
            return {
                field: "kickoff_at",
                direction: "desc",
            };

        case "asc":
            return {
                field: "kickoff_at",
                direction: "asc",
            };

        case "default":
        default:
            return base;
    }
}

export function FixturesFiltersProvider({ children }) {
    const { fixtures } = useFixtures();

    const [filters, setFilters] = useState({
        status: "upcoming",
        stageId: null,
        groupLetter: null,
        teamId: null,
        predictionsOpenOnly: false,
    });

    // const isStageScoped = filters.stageId != null;
    // const isTeamScoped = filters.teamId != null;
    // const isGroupScoped = filters.groupLetter != null;

    const [sortPreset, setSortPreset] = useState("default");

    const sort = useMemo(() => {
        return resolveSort(filters.status, sortPreset);
    }, [filters.status, sortPreset]);

    const filteredFixtures = useMemo(() => {
        let filtered = [...fixtures];

        // Remove incomplete fixtures
        filtered = filtered.filter(
            f =>
                f.home_team_id != null &&
                f.away_team_id != null
        );

        // Status
        if (filters.status !== "all") {
            if (filters.status === "live") {
                filtered = filtered.filter(
                    f =>
                        f.fixture_status === "live_90" ||
                        f.fixture_status === "live_et"
                );
            } else {
                filtered = filtered.filter(
                    f => f.fixture_status === filters.status
                );
            }
        }

        // Stage
        if (filters.stageId != null) {
            filtered = filtered.filter(
                f => f.stage_id === filters.stageId
            );
        }

        // Group
        if (filters.groupLetter) {
            filtered = filtered.filter(
                f => f.group_letter === filters.groupLetter
            );
        }

        // Team
        if (filters.teamId != null) {
            filtered = filtered.filter(
                f =>
                    f.home_team_id === filters.teamId ||
                    f.away_team_id === filters.teamId
            );
        }

        // Predictions
        if (filters.predictionsOpenOnly === true) {
            filtered = filtered.filter(
                f => f.predictions_open
            );
        }

        // Sorting
        const { field, direction } = sort;

        filtered.sort((a, b) => {
            let aValue;
            let bValue;

            switch (field) {
                case "kickoff_at":
                default:
                    aValue = new Date(a.kickoff_at).getTime();
                    bValue = new Date(b.kickoff_at).getTime();
                    break;
            }

            return direction === "asc"
                ? aValue - bValue
                : bValue - aValue;
        });

        return filtered;
    }, [fixtures, filters, sort]);

    const setStatusFilter = (status) => {
        setFilters(prev => ({
            ...prev,
            status,
        }));

        setSortPreset("default");
    };

    const setStageFilter = (stageId) => {
        setFilters(prev => {
            const activatingScope = prev.stageId == null && stageId != null;

            if (!activatingScope) {
                return {...prev, stageId};
            }
            
            return {
                ...prev,
                stageId,

                status: prev.status === "upcoming" ? "all" : prev.status,
            };
        });
    };

    const setGroupFilter = (groupLetter) => {
        setFilters(prev => {
            const activatingScope = prev.groupLetter == null && groupLetter != null;

            if (!activatingScope) {
                return { ...prev, groupLetter };
            }

            return {
                ...prev,
                groupLetter,
                status: prev.status === "upcoming" ? "all" : prev.status,
            };
        });
    };

    const setTeamFilter = (teamId) => {
        setFilters(prev => {
            const activatingScope = prev.teamId == null && teamId != null;

            if (!activatingScope) {
                return { ...prev, teamId };
            }

            return {
                ...prev,
                teamId,
                status: prev.status === "upcoming" ? "all" : prev.status,
            };
        });
    };

    const togglePredictionsFilter = () => {
        setFilters(prev => ({
            ...prev,
            predictionsOpenOnly: !prev.predictionsOpenOnly,
        }));
    };

    const resetFilters = () => {
        setFilters({
            status: "upcoming",
            stageId: null,
            groupLetter: null,
            teamId: null,
            predictionsOpenOnly: false,
        });

        setSortPreset("default");
    };

    const availableGroups = useMemo(() => {
        return [...new Set(
            fixtures
                .map(f => f.group_letter)
                .filter(Boolean)
        )].sort();
    }, [fixtures]);

    const uiConstraints = useMemo(() => {
        const teamSelected = filters.teamId != null;
        const groupSelected = filters.groupLetter != null;

        const filteredTeams = groupSelected
            ? fixtures
                  .filter(f => f.group_letter === filters.groupLetter)
                  .flatMap(f => [f.home_team_id, f.away_team_id])
                  .filter(Boolean)
            : null;

        return {
            disableGroup: teamSelected,
            disableTeam: false,
            filteredTeams,
        };
    }, [filters, fixtures]);

    const activeFilters = useMemo(() => {
        const out = [];

        if (filters.stageId != null) {
            out.push({
                key: "stageId",
                id: filters.stageId,
                label: "Stage",
            });
        }

        if (filters.groupLetter) {
            out.push({
                key: "groupLetter",
                id: filters.groupLetter,
                label: "Group",
            });
        }

        if (filters.teamId != null) {
            out.push({
                key: "teamId",
                id: filters.teamId,
                label: "Team",
            });
        }

        return out;
    }, [filters]);

    const hasActiveFilters = activeFilters.length > 0;

    const value = {
        filteredFixtures,

        filters,

        availableGroups,
        uiConstraints,
        activeFilters,
        hasActiveFilters,

        statusFilter: filters.status,
        stageFilter: filters.stageId,
        groupFilter: filters.groupLetter,
        teamFilter: filters.teamId,
        predictionsFilter: filters.predictionsOpenOnly,

        sortPreset,

        setStatusFilter,
        setStageFilter,
        setGroupFilter,
        setTeamFilter,
        togglePredictionsFilter,

        setSortPreset,

        resetFilters,
    };

    return (
        <FixturesFiltersContext.Provider value={value}>
            {children}
        </FixturesFiltersContext.Provider>
    );
}