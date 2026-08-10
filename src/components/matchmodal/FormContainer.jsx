import { getTeamFormFixtures } from "../../utils/helpers";
import FormRow from "./FormRow";

export default function FormContainer({
    fixtures,
    currentFixture
}) {
    const team1Form = getTeamFormFixtures({
        fixtures,
        teamName: currentFixture.home_team_name,
        anchorFixtureId: currentFixture.fixture_id
    });

    const team2Form = getTeamFormFixtures({
        fixtures,
        teamName: currentFixture.away_team_name,
        anchorFixtureId: currentFixture.fixture_id
    });

    const formMaxRows = Math.max(
        team1Form.past.length,
        team2Form.past.length
    );

    const upcomingMaxRows = Math.max(
        team1Form.future.length,
        team2Form.future.length
    );

    const sizeMap = [1.1, 1.05, 1, 0.95, 0.9];

    return (
        <div className="formContainer">

            {Array.from({ length: upcomingMaxRows }).map((_, i) => (
                <FormRow
                    key={`future-${i}`}
                    fixture1={team1Form.future[i] || null}
                    fixture2={team2Form.future[i] || null}
                    team1Name={currentFixture.home_team_name}
                    team2Name={currentFixture.away_team_name}
                    scale={1}
                />
            ))}

            {Array.from({ length: formMaxRows }).map((_, i) => (
                <FormRow
                    key={`past-${i}`}
                    fixture1={team1Form.past[i] || null}
                    fixture2={team2Form.past[i] || null}
                    team1Name={currentFixture.home_team_name}
                    team2Name={currentFixture.away_team_name}
                    scale={sizeMap[i] || 0.9}
                />
            ))}

        </div>
    );
}