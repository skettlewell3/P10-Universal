import { useEffect, useState } from "react";
import { differenceInSeconds, format } from "date-fns";
import { useGameweeks } from "../../hooks/useGameweeks";
import { useFixtures } from "../../hooks/useFixtures";
import { usePredictions } from "../../hooks/usePredictions";

export default function GameweekSnapshot() {
    const { activeGameweek } = useGameweeks();
    const { fixtures } = useFixtures();
    const { predictionsMap } = usePredictions();

    const [now, setNow] = useState(new Date());
    const [showCountdownScreen, setShowCountdownScreen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const closeAt = activeGameweek
        ? new Date(activeGameweek.prediction_close_at)
        : null;

    const secondsRemaining = closeAt
        ? Math.max(
            0,
            differenceInSeconds(closeAt, now)
        )
        : 0;

    const showCountdown =
        secondsRemaining > 0 &&
        secondsRemaining < 86400;

    useEffect(() => {
        if (!showCountdown) return;

        const timer = setInterval(() => {
            setShowCountdownScreen(current => !current);
        }, 5000);

        return () => clearInterval(timer);
    }, [showCountdown]);

    if (!activeGameweek) return null;

    const activeGameweekFixtures = fixtures.filter(
        fixture =>
            fixture.gameweek_id === activeGameweek.gameweek_id
    );

    const hasSubmitted =
        activeGameweekFixtures.length > 0 &&
        activeGameweekFixtures.every(
            fixture =>
                Boolean(predictionsMap[fixture.fixture_id])
        );

    const deadlinePassed = secondsRemaining <= 0;

    const hours = Math.floor(
        secondsRemaining / 3600
    );

    const minutes = Math.floor(
        (secondsRemaining % 3600) / 60
    );

    const seconds = secondsRemaining % 60;

    const countdown = [
        hours,
        minutes,
        seconds
    ]
        .map(value => String(value).padStart(2, "0"))
        .join(":");

    const deadline = format(
        closeAt,
        "HH:mm dd/MM"
    );

    return (
        <div className="gameweekSnapshot">

            <div className="gameweekSnapshotTitle">
                GW {activeGameweek.gameweek_number}
            </div>

            <div className="gameweekPredictionStatus">
                {hasSubmitted ? (
                    <>
                        <span>Submitted</span>
                        <span className="predictionStatusIcon success">
                            ✓
                        </span>
                    </>
                ) : (
                    <>
                        <span>Not submitted</span>
                        <span className="predictionStatusIcon failure">
                            ✗
                        </span>
                    </>
                )}
            </div>

            {!deadlinePassed && (
                <div className="gameweekDeadline">

                    {showCountdown && showCountdownScreen ? (
                        <>
                            <div className="gameweekDeadlineLabel">
                                Closes in:
                            </div>

                            <div className="gameweekDeadlineValue">
                                {countdown}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="gameweekDeadlineLabel">
                                Closes at:
                            </div>

                            <div className="gameweekDeadlineValue small">
                                {deadline}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}