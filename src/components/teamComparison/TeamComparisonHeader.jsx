import FixtureCellHeader from "./FixtureCellHeader";
import { useTeams } from "../../hooks/useTeams";
import { getTeamStyle } from "../../utils/helpers";

export default function TeamComparisonHeader({ comparisonMode, teams }) {
    const { teamsMap } = useTeams();

    const { team1, team2 } = teams;

    const team1Data = teamsMap[team1];
    const team2Data = teamsMap[team2];

    const team1Style = getTeamStyle(
        team1Data?.color_1,
        team1Data?.color_2,
        team1Data?.color_3
    );

    const team2Style = getTeamStyle(
        team2Data?.color_1,
        team2Data?.color_2,
        team2Data?.color_3
    );

    const totalHeader = comparisonMode === "generic"
        ? "Pts"
        : "+/-";

    const metaHeader = comparisonMode === "generic"
        ? "(Pts)"
        : "+/-";

    return (
        <div className="teamComparisonHeader">
            <div className="comparisonHeaderTotal t1TotalHeader">
                {totalHeader}
            </div>

            <div
                className="t1Header"
                style={team1Style}
            >
                {team1Data?.short_code}
            </div>

            <FixtureCellHeader
                venue="H"
                metaHeader={metaHeader}
                className="t1HomeHeader"
            />

            <FixtureCellHeader
                venue="A"
                metaHeader={metaHeader}
                className="t1AwayHeader"
            />

            <div className="oppoHeader">
                Vs
            </div>

            <div
                className="t2Header"
                style={team2Style}
            >
                {team2Data?.short_code}
            </div>

            <FixtureCellHeader
                venue="H"
                metaHeader={metaHeader}
                className="t2HomeHeader"
            />

            <FixtureCellHeader
                venue="A"
                metaHeader={metaHeader}
                className="t2AwayHeader"
            />

            <div className="comparisonHeaderTotal t2TotalHeader">
                {totalHeader}
            </div>
        </div>
    );
}