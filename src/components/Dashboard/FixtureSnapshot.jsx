import { format } from "date-fns";
import { useFixtures } from "../../hooks/useFixtures"
import { COUNTRY_FLAG_MAP } from "../../config";

export default function FixtureSnapshot() {
    const { fixtures } = useFixtures();

    const snapshotFixture =
      fixtures
        .filter(
          f =>
            f.fixture_status === "live_90" ||
            f.fixture_status === "upcoming"
        )
        .sort((a, b) => {
          if (a.fixture_status === "live_90" && b.fixture_status !== "live_90") return -1;
          if (b.fixture_status === "live_90" && a.fixture_status !== "live_90") return 1  ;
      
          const koDiff =
            new Date(a.kickoff_at) - new Date(b.kickoff_at) ;
      
          return koDiff || (a.fixture_id - b.fixture_id);
        })[0]
    ;

    const isLive =
      snapshotFixture.fixture_status === "live_90";

    const snapLabel =
      isLive ? "Live!" : "Next:";

    const snapKO = format(
      new Date(snapshotFixture.kickoff_at),
      "HH:mm"
    );

    const snapDate = format(
      new Date(snapshotFixture.kickoff_at),
      "dd/MM"
    );

    const homeFlag = COUNTRY_FLAG_MAP[snapshotFixture.home_short_code];
    const awayFlag = COUNTRY_FLAG_MAP[snapshotFixture.away_short_code];

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

              <div className="snapLabel">
                  {snapLabel}
              </div>
              {isLive && (
                <div className="snapScore">
                  {snapshotFixture.ft_home_goals}
                  {" - "}
                  {snapshotFixture.ft_away_goals}
                </div>
              )}
              {!isLive && (
                <div className="snapScore vs">
                  V
                </div>
              )}
              { !isLive && (
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