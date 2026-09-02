import { useEffect, useState } from "react";
import { getCountdown } from "../utils/helpers";

const HOUR = 1000 * 60 * 60;

const getStagePredictionStatus = (predictionOpenAt, predictionCloseAt) => {
    const now = Date.now();

    if (!predictionOpenAt || !predictionCloseAt) {
        return { mode: "blank" };
    }

    const open = new Date(predictionOpenAt).getTime();
    const close = new Date(predictionCloseAt).getTime();

    const timeToOpen = open - now;
    const timeToClose = close - now;

    if (timeToOpen > 24 * HOUR) {
        return { mode: "blank" };
    }

    if (now < open) {
        return {
            mode: "preOpen",
            label: "OPEN SOON",
            color: "grey",
            countdownTo: open
        };
    }

    if (now < close) {
        const closingSoon = timeToClose < 12 * HOUR;

        return {
            mode: closingSoon ? "closingSoon" : "open",
            label: closingSoon ? "Closes soon" : "OPEN",
            color: closingSoon ? "amber" : "green",
            countdownTo: close
        };
    }

    return {
        mode: "closed",
        label: "CLOSED",
        color: "grey",
        countdownTo: null
    };
};

export const useStagePredictionStatus = (
    predictionOpenAt,
    predictionCloseAt
) => {
    const [, setTick] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setTick((t) => t + 1);
        }, 60000);

        return () => clearInterval(id);
    }, []);

    const status = getStagePredictionStatus(
        predictionOpenAt,
        predictionCloseAt
    );

    const countdown = status.countdownTo
        ? getCountdown(status.countdownTo)
        : null;

    return {
        ...status,
        countdown
    };
};