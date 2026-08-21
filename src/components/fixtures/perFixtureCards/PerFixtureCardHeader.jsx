import { useState, useEffect } from "react";
import { format } from "date-fns";
import { usePredictionStatus } from "../../../hooks/usePredictionStatus";
import { useFlavour } from "../../../hooks/useFlavour";
import { useGameweeks } from "../../../hooks/useGameweeks";

export default function PerFixtureCardHeader({ fixture }) {

  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFlip((f) => !f);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const { isGameweekFormat, isPerFixtureFormat } = useFlavour();
  const { activeGameweek } = useGameweeks();

  const localKO = format(
    new Date(fixture.kickoff_at),
    "dd MMM HH:mm"
  );

  const statusMap = {
    upcoming: { label: "Upcoming", color: "amber" },
    live_90: { label: "Live", color: "blue" },
    finished: { label: "Finished", color: "grey" }
  };

  const statusMeta = statusMap[fixture.fixture_status];

  // All prediction window timing still comes from the hook.
  const prediction = usePredictionStatus(fixture);

  /*
   * PFX:
   * Prediction status is controlled entirely by the fixture's
   * own prediction window.
   *
   * GWK:
   * Only the currently active gameweek may display prediction
   * status. A future gameweek must remain hidden even if its
   * calculated prediction_open_at has been reached.
   */
  const gameweekIsActive =
    isGameweekFormat &&
    activeGameweek &&
    fixture.gameweek_number === activeGameweek.gameweek_number;

  const showPrediction =
    prediction.mode !== "blank" &&
    (
      isPerFixtureFormat ||
      gameweekIsActive
    );

  return (
    <div className="fixtureCardHeader perFixtureCardHeader">

      {/* FIXTURE STATUS */}
      {statusMeta && (
        <div className={`fixtureStatus ${statusMeta.color}`}>
          <span className="dot" />
          {statusMeta.label}
        </div>
      )}

      {/* KICKOFF */}
      <div className="fcHeaderCenter">
        <div className="day">{localKO}</div>
      </div>

      {/* PREDICTION STATUS */}
      {showPrediction && (
        <div className={`perPredictionStatus ${prediction.color}`}>

          {flip && prediction.countdown ? (
            <span className="countdown">
              {prediction.countdown}
            </span>
          ) : (
            <>
              <span className="label">
                {prediction.label}
              </span>
              <span className="dot" />
            </>
          )}

        </div>
      )}

    </div>
  );
}