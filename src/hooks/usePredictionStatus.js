import { useEffect, useState } from "react";
import { getCountdown } from "../utils/helpers";

const HOUR = 1000 * 60 * 60;

const getPredictionStatus = (fixture) => {
  const now = Date.now();

  const open = new Date(fixture.prediction_open_at).getTime();
  const close = new Date(fixture.prediction_close_at).getTime();

  const timeToOpen = open - now;
  const timeToClose = close - now;

  if (fixture.fixture_status === "finished") {
    return { mode: "blank" };
  }

  if (!fixture.prediction_open && fixture.fixture_status === "live_90") {
    return {
      mode: "closed",
      label: "CLOSED",
      color: "grey",
      countdownTo: null
    };
  }

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

  if (now >= open && now < close) {
    const closingSoon = timeToClose < 12 * HOUR;

    return {
      mode: closingSoon ? "closingSoon" : "open",
      label: closingSoon ? "Closes soon" : "OPEN",
      color: closingSoon ? "amber" : "green",
      countdownTo: close
    };
  }

  return { mode: "blank" };
};

export const usePredictionStatus = (fixture) => {
  const [tick, setTick] = useState(0);

  // only needed because time changes UI
  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
    }, 60000); // 1 min tick (NOT every second)

    return () => clearInterval(id);
  }, []);

  const status = getPredictionStatus(fixture);

  const countdown =
    status.countdownTo
      ? getCountdown(status.countdownTo)
      : null;

  return {
    ...status,
    countdown
  };
};