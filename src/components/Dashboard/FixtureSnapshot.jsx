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
            ? "LIVE"
            : fixtureStatus === "live_et"
                ? "EXTRA TIME"
                : fixtureStatus === "finished"
                    ? "RESULT"
                    : fixtureStatus === "upcoming"
                        ? "FIXTURE"
                        : fixtureStatus;

    const snapDate = format(
        new Date(fixture.kickoff_at),
        "EEE dd MMM"
    );

    const snapKO = format(
        new Date(fixture.kickoff_at),
        "HH:mm"
    );

    const homeScore =
        isLive || isFinished
            ? fixture.final_home_goals
            : "-";

    const awayScore =
        isLive || isFinished
            ? fixture.final_away_goals
            : "-";

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

                <div className="snapTeamRow">
                    <div className="snapTeamName">
                        {fixture.home_team_name}
                    </div>

                    <div className="snapScore">
                        {homeScore}
                    </div>
                </div>

                <div className="snapTeamRow">
                    <div className="snapTeamName">
                        {fixture.away_team_name}
                    </div>

                    <div className="snapScore">
                        {awayScore}
                    </div>
                </div>

            </div>

            <div className="snapDetail">
                <p>{fixture.venue_name}</p>
                <p>
                    {snapDate}
                    {" · "}
                    {snapKO}
                </p>
            </div>

        </div>
    );
}