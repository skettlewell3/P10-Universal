import { useEffect, useMemo } from "react";
import { useStage } from "../../hooks/useStage";

export default function LeaderboardFilters({ scopeId, 
    setScopeId, 
    scopeType, 
    setScopeType 
}) {
    const { stages, activeStageId } = useStage();

    const visibleStages = useMemo(
        () => stages.filter(s => s.is_live || s.is_finished),
        [stages]
    );

    const defaultStageId = activeStageId

    useEffect(() => {
        if (scopeType !== "stage") return;
        if (scopeId != null) return;
        if (!defaultStageId) return;

        setScopeId(defaultStageId);
    }, [scopeType, scopeId, defaultStageId, setScopeId]);

    const handleCampaign = () => {
        setScopeType("campaign");
        setScopeId(1);
    };

    const handleStage = () => {
        setScopeType("stage");
        setScopeId(null);
    };

    const handleChange = (e) => {
        setScopeId(Number(e.target.value))
    };    

    return (
        <div className="filters leaderboardFilters">
            <div className="scopeTypeFilter">
                <button 
                    className={scopeType === "campaign" ? "active" : ""}
                    onClick={handleCampaign}
                >
                    CAMPAIGN
                </button>

                <button 
                    className={scopeType === "stage" ? "active" : ""}
                    onClick={handleStage}
                >
                    ROUND
                </button>
            </div>

            <div className={`scopeIdFilter ${scopeType === "stage" ? "active" : ""}`}>
                {scopeType === "stage" && (
                    <select 
                        name="scopeIdFilter" 
                        id="scopeIdFilter" 
                        disabled={scopeType !== "stage"}  
                        value={scopeType === "stage" ? scopeId ?? "" : ""}
                        onChange={handleChange}               
                    >
                        {visibleStages.map(stage => {
                            return (
                                <option 
                                    key={stage.stage_id}
                                    value={stage.stage_id}
                                    className={stage.is_active ? "bold" : ""}
                                >
                                    {stage.stage_name}
                                </option>
                            )
                        })}                    
                    </select>
                )}
                
            </div>         
        </div>
    )
}