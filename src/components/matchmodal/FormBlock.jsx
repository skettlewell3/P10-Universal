import { format } from "date-fns";
import { getTeamStyle } from "../../utils/helpers";
import { useTeams } from "../../hooks/useTeams";

export default function FormBlock({
    side,
    fixture,
    teamName,
    scale
}) {
    const { teamsMap } = useTeams();

    if (!fixture) return null;

    const isHome = fixture.home_team_name === teamName;

    const opponentId = isHome
        ? fixture.away_team_id
        : fixture.home_team_id;

    const opponent = isHome
        ? fixture.away_short_code
        : fixture.home_short_code;

    const opponentTeam = teamsMap[opponentId];

    const opponentStyle = getTeamStyle(
        opponentTeam?.color_1,
        opponentTeam?.color_2,
        opponentTeam?.color_3
    );

    const venue = isHome ? "H" : "A";

    const goalsFor = isHome
        ? fixture.final_home_goals
        : fixture.final_away_goals;

    const goalsAgainst = isHome
        ? fixture.final_away_goals
        : fixture.final_home_goals;

    let result = "";

    if (goalsFor != null && goalsAgainst != null) {
        if (goalsFor > goalsAgainst) {
            result = "W";
        } else if (goalsFor === goalsAgainst) {
            result = "D";
        } else {
            result = "L";
        }
    }

    const date = format(
        new Date(fixture.kickoff_at),
        "dd/MM"
    );

    const ko = fixture.ko;

    return (
        <div className={`formBlock ${side}`}>

            <div className="dateColFG">
                <div>{date}</div>
                <div>{ko}</div>
            </div>

            <div className="venueFG">
                {venue}
            </div>

            <div
                className="oppoFG"
                style={opponentStyle}
            >
                {opponent}
            </div>

            <div
                className="resultColFG"
                style={{ fontSize: `${scale}em` }}
            >
                <span>{goalsFor}</span>
                <span>-</span>
                <span>{goalsAgainst}</span>
            </div>

            <div className="resultColFG">
                <div
                    className={`resultIconFG ${result}`}
                    style={{ fontSize: `${scale}em` }}
                >
                    {result}
                </div>
            </div>

        </div>
    );
}