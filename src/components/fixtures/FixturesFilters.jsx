import { useState } from "react";
import { useFixturesFilters } from "../../hooks/useFixturesFilters";
import FixtureFilterChip from "./FixtureFilterChip";
import FixtureFilterSelect from "./FixtureFilterSelect";
import { useStage } from "../../hooks/useStage";

export default function FixturesFilters() {
    const [expandFilters, setExpandFilters] = useState(false);

    const { 
        availableGroups,
        filteredTeams,
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

    const {  fixtureStages } = useStage();

    const handleResetClick = () => {
        resetFilters();
    }

    const groupOptions = availableGroups.map(group => ({
        value: group,
        label: `Group ${group}`,
    }));

    const handleExpandToggle = () => (
        setExpandFilters(prev => !prev)
    );

    return (
        <div className="filters fixtureFilters">

            <div className="filterFixedRow">

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
            </div>

            {expandFilters && (
                <div className="filterRow">

                    <FixtureFilterSelect
                        value={stageFilter}
                        options={fixtureStages}
                        placeholder="All Stages"
                        disabled={uiConstraints.disableStage}
                        onChange={setStageFilter}
                        active={stageFilter != null}
                    />

                    <FixtureFilterSelect
                        value={groupFilter}
                        options={groupOptions}
                        placeholder="All Groups"
                        disabled={uiConstraints.disableGroup}
                        onChange={setGroupFilter}
                        active={groupFilter != null}

                    />

                </div>                
            )}

            {expandFilters && (
                <div className="filterRow">

                    <FixtureFilterSelect 
                        value={teamFilter}
                        options={filteredTeams}
                        placeholder="All Teams"
                        disabled={uiConstraints.disableTeam}
                        onChange={setTeamFilter}
                        active={teamFilter != null}
                    />

                    <div className={`predictionFilterContainer ${predictionsFilter ? "active" : ""}`}>
                        <button
                            className={`predictionsOpenFilter ${predictionsFilter === true ? "active" : ""}`}
                            onClick={togglePredictionsFilter}
                        >
                            {predictionsFilter === true ? "Predictions Open" : "All Matches"}
                        </button>
                    </div>
                    
                </div>       
                
            )}


            <div className="fixtureFiltersFooter">
                <div className="activeFilters">

                    {hasActiveFilters && (
                        <div className="activeFiltersRow">
                            <div className="clearFilterChips">
                                <button onClick={handleResetClick}>
                                    Clear All
                                </button>
                            </div>

                            {activeFilters.map(filter => (
                                <FixtureFilterChip
                                    key={`${filter.key}-${filter.id}`}
                                    label={filter.label}
                                    value={filter.id}
                                    display={filter.display}
                                    onRemove={() => {
                                        if (filter.key === "stageId") setStageFilter(null);
                                        if (filter.key === "groupLetter") setGroupFilter(null);
                                        if (filter.key === "teamId") setTeamFilter(null);
                                    }}
                                />
                            ))}                            
                        </div>
                    )}

                    <div className="fixtureSorting">
                        <button 
                            className={`sortButton ${sortPreset === "asc" ? "active" : ""}`} 
                            value="asc"
                            onClick={() => setSortPreset("asc")}
                        >
                            <img src="/assets/svg/sortBtoT.svg" alt="sort asc" />
                        </button>
                        <button
                            className= {`sortButton ${sortPreset === "desc" ? "active" : ""}`} 
                            value="desc"
                            onClick={() => setSortPreset("desc")}
                        >
                            <img src="/assets/svg/sortTtoB.svg" alt="sort asc" />
                        </button>

                    </div>
                </div>

                <div 
                    className="filterExpandToggle" 
                    onClick={handleExpandToggle}
                
                >
                    {expandFilters ? "collapse" : "expand"}
                </div>

            </div>
        </div>
    )
}