import { useActualTables } from "../../hooks/useActualTables";
import { useTeams } from "../../hooks/useTeams";
import { getTeamStyle } from "../../utils/helpers";

export default function MatchFixtureRow({
    fixture,
    predictionDrafts,
    setPredictionDrafts
}) {
    const { actualTableMap } = useActualTables();

    console.log("league Table:", actualTableMap);
    const { teamsMap } = useTeams();

    if (!fixture) return null;

    const {
        fixture_id,
        home_team_id,
        home_short_code,
        away_team_id,
        away_short_code,
        final_home_goals,
        final_away_goals,
        prediction_open
    } = fixture;

    const homeTeam = teamsMap[home_team_id];
    const awayTeam = teamsMap[away_team_id];

    const homePos = actualTableMap[`league-${home_team_id}`]?.pos;
    const awayPos = actualTableMap[`league-${away_team_id}`]?.pos;

    const homeStyle = getTeamStyle(
        homeTeam?.color_1,
        homeTeam?.color_2,
        homeTeam?.color_3
    );

    const awayStyle = getTeamStyle(
        awayTeam?.color_1,
        awayTeam?.color_2,
        awayTeam?.color_3
    );

    const homeValue = predictionDrafts?.[fixture_id]?.home ?? "";
    const awayValue = predictionDrafts?.[fixture_id]?.away ?? "";

    function toOrdinalSpan(n) {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        const suffix = s[(v - 20) % 10] || s[v] || s[0];

        return (
            <span>
                {n}<sup>{suffix}</sup>
            </span>
        );
    }

    const handleHomeChange = (e) => {
        setPredictionDrafts(prev => ({
            ...prev,
            [fixture_id]: {
                home: e.target.value,
                away: awayValue
            }
        }));
    };

    const handleAwayChange = (e) => {
        setPredictionDrafts(prev => ({
            ...prev,
            [fixture_id]: {
                home: homeValue,
                away: e.target.value
            }
        }));
    };

    return (
        <fieldset className="modalFieldset">
            <div
                className="posTeam"
                style={homeStyle}
                title={homeTeam?.team_name}
            >
                <div className="teamPos">
                    {homePos != null
                        ? toOrdinalSpan(homePos)
                        : ""}
                </div>

                <div className="posName">
                    {home_short_code}
                </div>
            </div>

            {prediction_open ? (
                <div className="homeScore">
                    <input
                        type="number"
                        name={`home_${fixture_id}`}
                        min="0"
                        max="10"
                        className="pred"
                        value={homeValue}
                        onChange={handleHomeChange}
                    />
                </div>
            ) : (
                <div className="homeScore">
                    {final_home_goals ?? ""}
                </div>
            )}

            <div className="v">v</div>

            {prediction_open ? (
                <div className="awayScore">
                    <input
                        type="number"
                        name={`away_${fixture_id}`}
                        min="0"
                        max="10"
                        className="pred"
                        value={awayValue}
                        onChange={handleAwayChange}
                    />
                </div>
            ) : (
                <div className="awayScore">
                    {final_away_goals ?? ""}
                </div>
            )}

            <div
                className="posTeam"
                style={awayStyle}
                title={awayTeam?.team_name}
            >
                <div className="posName">
                    {away_short_code}
                </div>

                <div className="teamPos">
                    {awayPos != null
                        ? toOrdinalSpan(awayPos)
                        : ""}
                </div>
            </div>
        </fieldset>
    );
}