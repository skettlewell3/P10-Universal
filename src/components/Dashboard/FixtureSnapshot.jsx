import { format } from "date-fns";

export default function FixtureSnapshot({ fixture }) {
    if (!fixture) return null;

    const fixtureStatus = fixture.fixture_status;

    const isLive =
        fixtureStatus === "live_90" ||
        fixtureStatus === "live_et";

    const isFinished =
        fixtureStatus === "finished";

    const snapLabel =
        fixtureStatus === "live_90"
            ? "Live!"
            : fixtureStatus === "live_et"
                ? "Extra Time"
                : fixtureStatus === "finished"
                    ? "Final"
                    : fixtureStatus === "upcoming"
                        ? ""
                        : fixtureStatus;

    const snapKO = format(
        new Date(fixture.kickoff_at),
        "HH:mm"
    );

    const snapDate = format(
        new Date(fixture.kickoff_at),
        "dd/MM"
    );

    return (
        <div className="fixtureSnapshot">

            <div
                className={`snapLabel snapStatus-${fixtureStatus} ${
                    isLive ? "blink" : ""
                }`}
            >
                {snapLabel}
            </div>

            <div className="snapFixture">
                <div className="snapTeam home">
                    {fixture.home_short_code}
                </div>

                <div className="snapCentre">
                    {isLive || isFinished ? (
                        <div className="snapScore">
                            {fixture.final_home_goals}
                            {" - "}
                            {fixture.final_away_goals}
                        </div>
                    ) : (
                        <div className="snapVs">
                            V
                        </div>
                    )}
                </div>

                <div className="snapTeam away">
                    {fixture.away_short_code}
                </div>
            </div>

            {!isLive && !isFinished && (
                <div className="snapDetail">
                    <p>{snapDate}</p>
                    <p>{snapKO}</p>
                </div>
            )}

        </div>
    );
}