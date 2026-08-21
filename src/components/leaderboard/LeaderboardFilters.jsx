import { useEffect, useMemo } from "react";
import { useStage } from "../../hooks/useStage";

export default function LeaderboardFilters({
    scopeType,
    setScopeType,
    scopeId,
    setScopeId,
    population,
    setPopulation
}) {
    const { stages, tickerStageId } = useStage();

    const visibleStages = useMemo(
        () => stages.filter(
            stage =>
                stage.is_live ||
                stage.is_finished
        ),
        [stages]
    );

    const defaultStageId = tickerStageId;

    useEffect(() => {
        if (scopeType !== "stage") return;
        if (scopeId != null) return;
        if (!defaultStageId) return;

        setScopeId(defaultStageId);
    }, [
        scopeType,
        scopeId,
        defaultStageId,
        setScopeId
    ]);

    const handleCampaign = () => {
        setScopeType("campaign");
    };

    const handleStage = () => {
        setScopeType("stage");
        setScopeId(null);
    };

    const handleChange = (e) => {
        setScopeId(Number(e.target.value));
    };

    const populationOpts = [
        {
            label: "Global",
            value: "global"
        },
        {
            label: "Users",
            value: "users"
        },
        {
            label: "Clubs",
            value: "clubs"
        },
        {
            label: "Bots",
            value: "bots"
        }
    ];

    return (
        <div className="filters leaderboardFilters">

            <div className="filterFixedRow">
                <div className="fixStatusFilter">
                    {populationOpts.map(opt => (
                        <button
                            key={opt.value}
                            className={
                                population === opt.value
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setPopulation(opt.value)
                            }
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filterRow">

                <div className="scopeTypeFilter">

                    <button
                        className={
                            scopeType === "campaign"
                                ? "active"
                                : ""
                        }
                        onClick={handleCampaign}
                    >
                        CAMPAIGN
                    </button>

                    <button
                        className={
                            scopeType === "stage"
                                ? "active"
                                : ""
                        }
                        onClick={handleStage}
                    >
                        ROUND
                    </button>

                </div>

                <div
                    className={`scopeIdFilter ${
                        scopeType === "stage"
                            ? "active"
                            : ""
                    }`}
                >
                    {scopeType === "stage" && (
                        <select
                            name="scopeIdFilter"
                            id="scopeIdFilter"
                            disabled={scopeType !== "stage"}
                            value={
                                scopeType === "stage"
                                    ? scopeId ?? ""
                                    : ""
                            }
                            onChange={handleChange}
                        >
                            {visibleStages.map(stage => (
                                <option
                                    key={stage.stage_id}
                                    value={stage.stage_id}
                                    className={
                                        stage.is_active
                                            ? "bold"
                                            : ""
                                    }
                                >
                                    {stage.stage_name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

            </div>

        </div>
    );
}