import { useState, useEffect } from "react";
import { format } from "date-fns";
import { usePredictionStatus } from "../../../hooks/usePredictionStatus";

export default function PerFixtureCardHeader({ fixture }) {

  // rotates label ↔ countdown display
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFlip((f) => !f);
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const localKO = format(
    new Date(fixture.kickoff_at),
    "dd MMM HH:mm"
  );

  const statusMap = {
    upcoming: { label: "Upcoming", color: "amber" },
    live: { label: "Live", color: "green" },
    finished: { label: "Finished", color: "red" }
  };

  const statusMeta = statusMap[fixture.fixture_status];

  // all prediction window logic now lives in hook
  const prediction = usePredictionStatus(fixture);

  const showPrediction =
    prediction.mode !== "blank";

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
              <span className="dot" />
              <span className="label">
                {prediction.label}
              </span>
            </>
          )}

        </div>
      )}

    </div>
  );
}