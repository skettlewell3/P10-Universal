import { useFixturesFilters } from "../../hooks/useFixturesFilters";
import FixtureFilterChip from "./FixtureFilterChip";
import FixtureFilterSelect from "./FixtureFilterSelect";

export default function FixturesFilters() {
    const { 
        availableGroups,
        uiConstraints,
        activeFilters,
        hasActiveFilters,
        
        statusFilter,
        stageFilter,
        groupFilter,
        teamFilter,
        predictionsFilter,

        setStatusFilter,
        setStageFilter,
        setGroupFilter,
        setTeamFilter,
        togglePredictionsFilter,

        sortPreset,
        setSortPreset,

        resetFilters
        
    } = useFixturesFilters();

    const fixtStatusOpts = [
        {
            label: "Upcoming",
            value: "upcoming" 
        },
        {
            label: "Live",
            value: "live" 
        }, 
        {
            label: "Finished",
            value: "finished" 
        }, 
        {
            label: "All",
            value: "all" 
        },  
    ];

    const handleResetClick = () => {
        resetFilters();
    }

    const groupOptions = availableGroups.map(group => ({
        value: group,
        label: `Group ${group}`,
    }))

    return (
        <div className="filters fixtureFilters">
            <div className="fixStatusFilter">
                {fixtStatusOpts.map(opt => (
                    <button
                        key={opt.value}
                        className={statusFilter === opt.value ? "active" : ""}
                        onClick={() => setStatusFilter(opt.value)}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            <div className="predictionOpenFilter">
                <button
                    className={predictionsFilter === true ? "active" : ""}
                    onClick={togglePredictionsFilter}
                >
                    {predictionsFilter === true ? "Predictions Open" : "All Matches"}
                </button>

            </div>

            <FixtureFilterSelect
                value={groupFilter}
                options={groupOptions}
                placeholder="All Groups"
                disabled={uiConstraints.disableGroup}
                onChange={setGroupFilter}
            />

            <div className="fixtureFiltersFooter">
                <div className="activeFilters">

                    {hasActiveFilters && (
                        <div className="activeFiltersRow">
                            {activeFilters.map(filter => (
                                <FixtureFilterChip
                                    key={`${filter.key}-${filter.id}`}
                                    label={filter.label}
                                    value={filter.id}
                                    onRemove={() => {
                                        if (filter.key === "stageId") setStageFilter(null);
                                        if (filter.key === "groupLetter") setGroupFilter(null);
                                        if (filter.key === "teamId") setTeamFilter(null);
                                    }}
                                />
                            ))}

                            <div>
                                <button onClick={handleResetClick}>
                                    Clear All
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="fixtureSorting">
                        <button 
                            className={sortPreset === "asc" ? "active" : ""}
                            value="asc"
                            onClick={() => setSortPreset("asc")}
                        >
                            🕒↑
                        </button>
                        <button
                            className={sortPreset === "desc" ? "active" : ""}
                            value="desc"
                            onClick={() => setSortPreset("desc")}
                        >
                            🕒↓
                        </button>

                    </div>
                </div>

                <div className="filterExpandToggle" disabled>
                    expand
                </div>

            </div>
        </div>
    )
}