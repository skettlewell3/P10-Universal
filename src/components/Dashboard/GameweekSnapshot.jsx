import { useEffect, useState } from "react";
import { differenceInSeconds, format } from "date-fns";

export default function GameweekSnapshot({
    activeGameweek,
    hasSubmitted,
    now,
}) {
    const [showCountdownScreen, setShowCountdownScreen] = useState(false);

    const closeAt = activeGameweek?.prediction_close_at
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

    if (!activeGameweek || !closeAt) {
        return null;
    }

    const deadlinePassed =
        secondsRemaining <= 0;

    const hours = Math.floor(
        secondsRemaining / 3600
    );

    const minutes = Math.floor(
        (secondsRemaining % 3600) / 60
    );

    const seconds =
        secondsRemaining % 60;

    const countdown = [
        hours,
        minutes,
        seconds,
    ]
        .map(value =>
            String(value).padStart(2, "0")
        )
        .join(":");

    const deadline = format(
        closeAt,
        "HH:mm dd/MM"
    );

    const displayCountdown =
        showCountdown &&
        showCountdownScreen;

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

                    {displayCountdown ? (
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