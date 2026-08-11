import { useTeams } from "../../hooks/useTeams";
import { getTeamStyle } from "../../utils/helpers";
import FixtureCell from "./FixtureCell";

export default function TeamComparisonRow({ rowData, viewMode }) {
    const { teamsMap } = useTeams();

    const {
        opponent_id,
        opponent_short,

        t1_home_gf,
        t1_home_ga,
        t1_home_pts,
        t1_home_swing,

        t1_away_gf,
        t1_away_ga,
        t1_away_pts,
        t1_away_swing,

        t2_home_gf,
        t2_home_ga,
        t2_home_pts,
        t2_home_swing,

        t2_away_gf,
        t2_away_ga,
        t2_away_pts,
        t2_away_swing,

        t1_total_points,
        t1_total_swing,
        t2_total_points,
        t2_total_swing,
        
    } = rowData;

    const opponent = teamsMap[opponent_id];

    const opponentStyle = getTeamStyle(
        opponent?.color_1,
        opponent?.color_2,
        opponent?.color_3
    );

    const t1_homeMeta =
        viewMode === "generic"
            ? t1_home_pts
            : t1_home_swing;

    const t1_awayMeta =
        viewMode === "generic"
            ? t1_away_pts
            : t1_away_swing;

    const t2_homeMeta =
        viewMode === "generic"
            ? t2_home_pts
            : t2_home_swing;

    const t2_awayMeta =
        viewMode === "generic"
            ? t2_away_pts
            : t2_away_swing;

    const t1_total = 
        viewMode === "generic"
            ? t1_total_points
            : t1_total_swing
    ;
    
    const t2_total = 
        viewMode === "generic"
            ? t2_total_points
            : t2_total_swing
    ;   

    // const t1Style = {
    //     backgroundColor:
    //         t1_total > t2_total
    //             ? "rgb(32, 100, 60)"
    //             : t1_total < t2_total
    //                 ? "#e70f0f"
    //                 : "#dbbc0f",
    // };

    // const t2Style = {
    //     backgroundColor:
    //         t2_total > t1_total
    //             ? "rgb(32, 100, 60)"
    //             : t2_total < t1_total
    //                 ? "#e70f0f"
    //                 : "#dbbc0f",
    // };

    const t1Style = {
    backgroundColor:
        t1_total == null || t2_total == null
            ? "transparent"
            : t1_total > t2_total
                ? "rgb(32, 100, 60)"
                : t1_total < t2_total
                    ? "#e70f0f"
                    : "#dbbc0f",
};

const t2Style = {
    backgroundColor:
        t1_total == null || t2_total == null
            ? "transparent"
            : t2_total > t1_total
                ? "rgb(32, 100, 60)"
                : t2_total < t1_total
                    ? "#e70f0f"
                    : "#dbbc0f",
};

    return (
        <div className="teamComparisonRow">

            <div
                className="comparisonRowTotal t1"
                style={t1Style}
            >
                {t1_total}
            </div>

            <FixtureCell
                hGoals={t1_home_gf}
                aGoals={t1_home_ga}
                metaData={t1_homeMeta}
                className="t1Home"
            />

            <FixtureCell
                hGoals={t1_away_gf}
                aGoals={t1_away_ga}
                metaData={t1_awayMeta}
                className="t1Away"
            />

            <div
                className="comparisonRowOppo"
                style={opponentStyle}
            >
                {opponent_short}
            </div>

            <FixtureCell
                hGoals={t2_home_gf}
                aGoals={t2_home_ga}
                metaData={t2_homeMeta}
                className="t2Home"
            />

            <FixtureCell
                hGoals={t2_away_gf}
                aGoals={t2_away_ga}
                metaData={t2_awayMeta}
                className="t2Away"
            />

            <div
                className="comparisonRowTotal"
                style={t2Style}
            >
                {t2_total}
            </div>

        </div>
    );
}