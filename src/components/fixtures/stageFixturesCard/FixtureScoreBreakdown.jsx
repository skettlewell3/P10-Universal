export default function FixtureScoreBreakdown({
    prediction
}) {
    if (!prediction) return null;

    const getPoints = (value, points) => {
        if (value === null || value === undefined) {
            return null;
        }

        return value ? points : 0;
    };

    const resultPoints = getPoints(
        prediction.correct_result,
        3
    );

    const homePoints = getPoints(
        prediction.correct_home_goals,
        2
    );

    const awayPoints = getPoints(
        prediction.correct_away_goals,
        2
    );

    const goalDifferencePoints = getPoints(
        prediction.correct_goal_difference,
        2
    );

    const totalGoalsPoints = getPoints(
        prediction.correct_total_goals,
        1
    );

    const totalPoints =
        prediction.points_total ?? null
    ;

    const isPerfect10 =
        prediction.perfect_10 === true ||
        prediction.points_total === 10
    ;

    const predictionScore = [
        prediction.pred_home_goals,
        prediction.pred_away_goals
    ].join("–");

    const renderPoints = (points) => (
        <div
            className={`fixtureBreakdownValue ${
                points > 0 ? "scored" : ""
            }`}
        >
            {points ?? "–"}
        </div>
    );

    return (
        <div className="fixtureScoreBreakdown">

            <div className="fixtureBreakdownHeader fixtureBreakdownLayout">

                <div
                    className="fixtureBreakdownCell predColumn"
                    title="Your prediction"
                >
                    Pred
                </div>

                <div
                    className="fixtureBreakdownCell"
                    title="Correct result"
                >
                    R
                </div>

                <div
                    className="fixtureBreakdownCell"
                    title="Correct home goals"
                >
                    H
                </div>

                <div
                    className="fixtureBreakdownCell"
                    title="Correct away goals"
                >
                    A
                </div>

                <div
                    className="fixtureBreakdownCell"
                    title="Correct goal difference"
                >
                    GD
                </div>

                <div
                    className="fixtureBreakdownCell"
                    title="Correct total goals"
                >
                    G
                </div>

                <div
                    className="fixtureBreakdownCell pointsColumn"
                    title="Total points"
                >
                    Pts
                </div>

            </div>

            <div
                className={`fixtureBreakdownRow fixtureBreakdownLayout ${
                    isPerfect10 ? "perfect10" : ""
                }`}
            >

                <div className="fixtureBreakdownCell fixtureBreakdownPrediction predColumn">
                    {predictionScore}
                </div>

                {renderPoints(resultPoints)}

                {renderPoints(homePoints)}

                {renderPoints(awayPoints)}

                {renderPoints(goalDifferencePoints)}

                {renderPoints(totalGoalsPoints)}

                <div
                    className={`fixtureBreakdownCell fixtureBreakdownTotal pointsColumn ${
                        totalPoints > 0 ? "scored" : ""
                    }`}
                >
                    {totalPoints ?? "–"}
                </div>

            </div>

        </div>
    );
}