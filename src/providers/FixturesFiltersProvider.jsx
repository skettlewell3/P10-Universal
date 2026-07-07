import { useMemo, useState } from "react";
import { FixturesFiltersContext } from "../context/FixturesFiltersContext";
import { useFixtures } from "../hooks/useFixtures";
import { useTeams } from "../hooks/useTeams";
import { useStage } from "../hooks/useStage";

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
    const { availableTeams, teamsMap } = useTeams();
    const { fixtureStages } = useStage();

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

        // // Remove incomplete fixtures
        // filtered = filtered.filter(
        //     f =>
        //         f.home_team_id != null &&
        //         f.away_team_id != null
        // );

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
            const normalized = stageId === null ? null : Number(stageId);
            const activatingScope = prev.stageId == null && stageId != null;

            if (!activatingScope) {
                return {...prev, stageId: normalized};
            }
            
            return {
                ...prev,
                stageId: normalized,
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
            const normalized = teamId === null ? null : Number(teamId);
            const activatingScope = prev.teamId == null && teamId != null;

            if (!activatingScope) {
                return { ...prev, teamId: normalized };
            }

            return {
                ...prev,
                teamId: normalized,
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

    const constraintFixtures = useMemo(() => {
        let filtered = [...fixtures];

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

        if (filters.stageId != null) {
            filtered = filtered.filter(
                f => f.stage_id === filters.stageId
            );
        }

        if (filters.groupLetter) {
            filtered = filtered.filter(
                f => f.group_letter === filters.groupLetter
            );
        }

        return filtered;
    }, [fixtures, filters.status, filters.stageId, filters.groupLetter]);

    const filteredTeams = useMemo(() => {
        const teamIds = new Set();

        for (const f of constraintFixtures) {
            if (f.home_team_id) teamIds.add(f.home_team_id);
            if (f.away_team_id) teamIds.add(f.away_team_id);
        }

        return availableTeams.filter(team =>
            teamIds.has(team.value)
        );
    }, [constraintFixtures, availableTeams]);

    const uiConstraints = useMemo(() => {
        const teamSelected = filters.teamId != null;

        return {
            disableGroup: teamSelected,
            disableTeam: false,
            disableStage: false,    
        };
    }, [filters.teamId]);

    const activeFilters = useMemo(() => {
        const out = [];

        if (filters.stageId != null) {
            const stage = fixtureStages.find(s => s.value === filters.stageId);

            out.push({
                key: "stageId",
                label: "Stage",
                display: stage?.labelShort ?? stage?.label ?? filters.stageId,
            });
        }

        if (filters.groupLetter) {
            out.push({
                key: "groupLetter",
                label: "Group",
                display: `Group: ${filters.groupLetter}`,
            });
        }

        if (filters.teamId != null) {
            const team = teamsMap[filters.teamId];

            out.push({
                key: "teamId",
                label: "Team",
                display: team?.short_code ?? team?.team_name ?? filters.teamId,
            });
        }

        return out;
    }, [filters, fixtureStages, teamsMap]);

    const hasActiveFilters = activeFilters.length > 0;

    const value = {
        filteredFixtures,

        filters,

        filteredTeams,
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

    // console.log("FILTERED FIXTURES:", filteredFixtures);

    return (
        <FixturesFiltersContext.Provider value={value}>
            {children}
        </FixturesFiltersContext.Provider>
    );
}