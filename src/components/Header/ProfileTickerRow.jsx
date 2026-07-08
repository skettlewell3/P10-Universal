import { useMemo } from "react";
import { useProfileTicker } from "../../hooks/useProfileTicker";
import { useFlavour } from "../../hooks/useFlavour";
import { useStage } from "../../hooks/useStage";

export default function ProfileTickerRow() {

    const {
        globalPoints,
        globalRank,

        flavourPoints,
        flavourRank,

        campaignPoints,
        campaignRank,

        stagePoints,
        stageRank,

        tickerLoading
    } = useProfileTicker();

    const { flavourCode, activeCampaignLabel } = useFlavour();

    const { tickerStageLabel } = useStage();

    const tickerItems = useMemo(
        () => [
            {
                label: "🌍",
                rank: globalRank,
                points: globalPoints
            },
            {
                label: flavourCode ?? "-",
                rank: flavourRank,
                points: flavourPoints
            },
            {
                label: activeCampaignLabel ?? "-",
                rank: campaignRank,
                points: campaignPoints
            },
            {
                label: tickerStageLabel ?? "-",
                rank: stageRank,
                points: stagePoints
            }
        ],
        [
            globalRank,
            globalPoints,

            flavourCode,
            flavourRank,
            flavourPoints,

            activeCampaignLabel,
            campaignRank,
            campaignPoints,

            tickerStageLabel,
            stageRank,
            stagePoints
        ]
    )


    if (tickerLoading) {
        return (
            <div className="profileTickerRow">
                Loading...
            </div>
        );
    }


    return (
        <div className="profileTickerRow">
            <div className="tickerTrack">
                {tickerItems.map((item) => (
                    <div 
                        key={item.label}
                        className="tickerStat"
                    >
                        <span>{item.label}</span>
                        <small>#{item.rank ?? "-"}</small>
                        <strong>{item.points ?? 0} PTS</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}