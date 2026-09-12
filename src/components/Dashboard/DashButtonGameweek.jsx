import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGameweeks } from "../../hooks/useGameweeks";
import { useFixtures } from "../../hooks/useFixtures";
import { usePredictions } from "../../hooks/usePredictions";
import { useLeaderboard } from "../../hooks/useLeaderboard";

import DashboardSnapshot from "./DashboardSnapshot";
import GameweekSnapshot from "./GameweekSnapshot";
import GameweekReviewSnapshot from "./GameweekReviewSnapshot";

export default function DashButtonGameweek({ label, to }) {
    const navigate = useNavigate();

    const { activeGameweek } = useGameweeks();
    const { fixtures } = useFixtures();
    const { predictionsMap } = usePredictions();
    const { leaderboardSnapshot } = useLeaderboard();

    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const activeGameweekFixtures = useMemo(() => {
        if (!activeGameweek) return [];

        return fixtures.filter(
            fixture =>
                fixture.gameweek_id === activeGameweek.gameweek_id
        );
    }, [fixtures, activeGameweek]);

    const hasAnyPredictions =
        activeGameweekFixtures.some(
            fixture =>
                Boolean(predictionsMap[fixture.fixture_id])
        );

    const hasSubmitted =
        activeGameweekFixtures.length > 0 &&
        activeGameweekFixtures.every(
            fixture =>
                Boolean(predictionsMap[fixture.fixture_id])
        );

    const predictionOpenAt = activeGameweek?.prediction_open_at
        ? new Date(activeGameweek.prediction_open_at)
        : null;

    const predictionCloseAt = activeGameweek?.prediction_close_at
        ? new Date(activeGameweek.prediction_close_at)
        : null;

    const predictionWindowOpen =
        predictionOpenAt &&
        predictionCloseAt &&
        now >= predictionOpenAt &&
        now < predictionCloseAt;

    const predictionWindowClosed =
        predictionCloseAt &&
        now >= predictionCloseAt;

    const screens = [];

    /*
     * Predictions are currently open:
     * show submission state + previous GW review.
     */
    if (predictionWindowOpen) {
        screens.push(
            <GameweekSnapshot
                key="current"
                activeGameweek={activeGameweek}
                hasSubmitted={hasSubmitted}
                now={now}
            />
        );

        if (leaderboardSnapshot) {
            screens.push(
                <GameweekReviewSnapshot key="review" />
            );
        }
    }

    /*
     * Deadline has passed.
     *
     * If the user predicted, the review is now the useful screen.
     * If they didn't predict at all, retain the "Not submitted" screen.
     */
    else if (predictionWindowClosed) {
        if (hasAnyPredictions && leaderboardSnapshot) {
            screens.push(
                <GameweekReviewSnapshot key="review" />
            );
        } else {
            screens.push(
                <GameweekSnapshot
                    key="current"
                    activeGameweek={activeGameweek}
                    hasSubmitted={false}
                    now={now}
                />
            );
        }
    }

    /*
     * Gameweek exists but its prediction window hasn't opened yet.
     * Keep showing the previous completed GW review.
     */
    else if (leaderboardSnapshot) {
        screens.push(
            <GameweekReviewSnapshot key="review" />
        );
    }

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button
            className="dashboardButton"
            onClick={handleClick}
        >
            <div className="dashContent">

                <div className="dashButtonLabel">
                    <span>{label}</span>
                </div>

                <DashboardSnapshot
                    screens={screens}
                    interval={5000}
                    loopFrom={0}
                />

            </div>
        </button>
    );
}