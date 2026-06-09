import { format } from "date-fns";
import { useFixtures } from "../../hooks/useFixtures"

export default function FixtureSnapshot() {
    const { fixtures } = useFixtures();

    const snapshotFixture =
      fixtures
        .filter(
          f =>
            f.fixture_status === "live" ||
            f.fixture_status === "upcoming"
        )
        .sort((a, b) => {
          if (a.fixture_status === "live" && b.fixture_status !== "live") return -1;
          if (b.fixture_status === "live" && a.fixture_status !== "live") return 1  ;
      
          const koDiff =
            new Date(a.kickoff_at) - new Date(b.kickoff_at) ;
      
          return koDiff || (a.fixture_id - b.fixture_id);
        })[0]
    ;

    const isLive =
      snapshotFixture.fixture_status === "live";

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

    return (
        <div className="fixtureSnapshot">
            <div className="snapshotCol Team Home">
                {snapshotFixture.home_short_code}
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

                <div className="snapDetail">
                    <p>{snapKO}</p>
                    <p>{snapDate}</p>
                </div>

            </div>
            <div className="snapshotCol Team Away">
                {snapshotFixture.away_short_code}
            </div>
        </div>
    )
}