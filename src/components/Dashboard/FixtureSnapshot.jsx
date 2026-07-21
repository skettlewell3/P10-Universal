import { format } from "date-fns";
import { useFixtures } from "../../hooks/useFixtures"
import { useTeams } from "../../hooks/useTeams";


export default function FixtureSnapshot() {
    const { fixtures } = useFixtures();
    const { teamsMap } = useTeams();

    const snapshotFixture =
      fixtures
        .filter(
          f =>
            f.fixture_status === "live_90" ||
            f.fixture_status === "upcoming"
        )
        .sort((a, b) => {
          if (a.fixture_status === "live_90" && b.fixture_status !== "live_90") return -1;
          if (b.fixture_status === "live_90" && a.fixture_status !== "live_90") return 1;
      
          return (
            new Date(a.kickoff_at) - new Date(b.kickoff_at)
          ) || (
            a.fixture_id - b.fixture_id
          );
        })[0]

      ||

      fixtures
        .filter(f => f.fixture_status === "finished")
        .sort(
          (a, b) =>
            new Date(b.kickoff_at) -
            new Date(a.kickoff_at)
        )[0]
    ;

    if (!snapshotFixture) return null;

    const isLive =
          snapshotFixture.fixture_status === "live_90";

    const isFinished =
      snapshotFixture.fixture_status === "finished";

    const snapLabel =
      isLive
        ? "Live!"
        : isFinished
          ? "Final"
          : "Next:"
    ;

    const snapKO = format(
      new Date(snapshotFixture.kickoff_at),
      "HH:mm"
    );

    const snapDate = format(
      new Date(snapshotFixture.kickoff_at),
      "dd/MM"
    );

    
    const homeTeam = teamsMap[snapshotFixture.home_team_id];
    const awayTeam = teamsMap[snapshotFixture.away_team_id];

    const homeFlag = homeTeam?.flag_code;
    const awayFlag = awayTeam?.flag_code;

    return (
        <div className="fixtureSnapshot">
            <div className="snapshotCol team home">
              <div className="flagWrap">
                  <img
                    src={`https://flagcdn.com/w40/${homeFlag}.png`}
                    alt={`${snapshotFixture.home_short_code} flag`}
                    className="wcFlagSnap"
                  />
              </div>
              <div>
                {snapshotFixture.home_short_code}
              </div>
            </div>
            <div className="snapshotCol snapshotDetails">

              <div className={`snapLabel ${isLive ? "blink" : ""}`}>
                  {snapLabel}
              </div>
              {isLive || isFinished && (
                <div className="snapScore">
                  {snapshotFixture.final_home_goals}
                  {"-"}
                  {snapshotFixture.final_away_goals}
                </div>
              )}
              {!isLive || !isFinished && (
                <div className="snapScore vs">
                  V
                </div>
              )}
              { !isLive || !isFinished && (
                <div className="snapDetail">
                  <p>{snapKO}</p>
                  <p>{snapDate}</p>
                </div>
              )}

            </div>
            <div className="snapshotCol team away">
                <div className="flagWrapSnap">
                  <img
                    src={`https://flagcdn.com/w40/${awayFlag}.png`}
                    alt={`${snapshotFixture.away_short_code} flag`}
                    className="wcFlagSnap"
                  />
              </div>
              <div>
                {snapshotFixture.away_short_code}
              </div>
            </div>
        </div>
    )
}