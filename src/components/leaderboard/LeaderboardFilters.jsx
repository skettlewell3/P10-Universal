export default function LeaderboardFilters({ scopeId, 
    setScopeId, 
    scopeType, 
    setScopeType 
}) {
    const handleCampaign = () => {
        setScopeType("campaign");
        setScopeId(1);
    };

    const handleStage = () => {
        setScopeType("stage");
        setScopeId(1);
    };

    return (
        <div className="filters leaderboardFilters">
            <div className="scopeTypeFilter">
                <button 
                    className={scopeType === "campaign" ? "active" : ""}
                    onClick={handleCampaign}
                >
                    Campaign
                </button>

                <button 
                    className={scopeType === "stage" ? "active" : ""}
                    onClick={handleStage}
                >
                    Round
                </button>
            </div>

        </div>
    )

}