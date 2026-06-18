import { useEffect, useMemo } from "react";
import { useStage } from "../../hooks/useStage";

export default function LeaderboardFilters({ scopeId, 
    setScopeId, 
    scopeType, 
    setScopeType 
}) {
    const { stages } = useStage();

    const defaultStageId = useMemo(() => {
        if (!stages?.length) return null;

        const activeStages = stages.filter(s => s.is_active);

        if (activeStages.length === 1) {
            return activeStages[0].stage_id;
        }

        if (activeStages.length > 1) {
            return activeStages
                .sort((a, b) => a.order_index - b.order_index)[0].stage_id;
        }

        return stages
            .sort((a, b) => b.order_index - a.order_index)[0].stage_id;
    }, [stages]);

    useEffect(() =>  {
        if (scopeType === "stage" && scopeId == null && defaultStageId) {
            setScopeId(defaultStageId);
        }
    }, [scopeType, scopeId, defaultStageId, setScopeId])

    const handleCampaign = () => {
        setScopeType("campaign");
        setScopeId(1);
    };

    const handleStage = () => {
        setScopeType("stage");
        setScopeId(1);
    };

    const handleChange = (e) => {
        setScopeId(Number(e.target.value))
    };

    const visibleStages = stages.filter(s => s.is_active || s.is_finished)

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