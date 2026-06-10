export const getCountdown = (target) => {
  const diff = target - Date.now();
  if (diff <= 0) return null;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return `${hours}h ${minutes}m`;
};

export const isValidPrediction = (draft) => {
  if (!draft) return false;
    
  const home = draft.home;
  const away = draft.away;
    
  return (
    home !== "" &&
    away !== "" &&
    !Number.isNaN(Number(home)) &&
    !Number.isNaN(Number(away))
  );
};

export const buildDraft = (existingDraft, prediction) => {
  return {
    home:
      existingDraft?.home ??
      prediction?.pred_home_goals?.toString() ??
      "",

    away:
      existingDraft?.away ??
      prediction?.pred_away_goals?.toString() ??
      "",
  };
}

export const isDirtyPrediction = (draft, prediction) => {
  if (!draft) return false;

  if (!prediction) {
    return isValidPrediction(draft);
  }

  return (
    Number(draft.home) !== prediction.pred_home_goals ||
    Number(draft.away) !== prediction.pred_away_goals
  );
};