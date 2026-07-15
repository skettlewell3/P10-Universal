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

export const isWithinWindow = (now, openAt, closeAt) => {
  if (!openAt || !closeAt) return false;

  const open = new Date(openAt).getTime();
  const close = new Date(closeAt).getTime();

  if (Number.isNaN(open) || Number.isNaN(close)) return false;

  return now >= open && now < close;
};


export const getWindowStatus = (now, openAt, closeAt) => {
  if (!openAt || !closeAt) return "closed";

  const open = new Date(openAt).getTime();
  const close = new Date(closeAt).getTime();

  if (Number.isNaN(open) || Number.isNaN(close)) return "closed";

  if (now < open) return "locked";
  if (now >= open && now < close) return "open";
  return "closed";
};


// sorting by order_index. push nulls to last. 

// stages.sort((a, b) => {
//   if (a.order_index == null) return 1;
//   if (b.order_index == null) return -1;
//   return a.order_index - b.order_index;
// });


export const getTeamStyle = (primary, secondary, tertiary) => {
    const style = {
        backgroundColor: primary,
        color: secondary,
    };

    if (tertiary) {
        style.textShadow = `
            -0.5px -0.5px 0 ${tertiary},
             0.5px -0.5px 0 ${tertiary},
            -0.5px  0.5px 0 ${tertiary},
             0.5px  0.5px 0 ${tertiary}
        `;
    }

    return style;
}

export const formatClubRole = (role) => {
    return role
        .replace("_", " ")
        .replace(/\b\w/g, char => char.toUpperCase())
    ;
}