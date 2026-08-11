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

export function getTeamFormFixtures({
    fixtures,
    teamName,
    anchorFixtureId,
    pastCount = 5,
    futureCount = 2
}) {
    const teamFixtures = fixtures
        .filter(f =>
            f.home_team_name === teamName ||
            f.away_team_name === teamName
        )
        .sort(
            (a, b) =>
                new Date(a.kickoff_at) -
                new Date(b.kickoff_at)
        );

    const anchorIndex = teamFixtures.findIndex(
        f => f.fixture_id === anchorFixtureId
    );

    if (anchorIndex === -1) {
        return {
            past: [],
            future: [],
            all: []
        };
    }

    const past = teamFixtures
        .slice(0, anchorIndex)
        .slice(-pastCount)
        .reverse();

    const future = teamFixtures
        .slice(anchorIndex + 1, anchorIndex + 1 + futureCount);

    return {
        past,
        future,
        all: [...past, ...future]
    };
}

// Team Comparison Tool

export function summariseGenericComparison(data) {
  const safe = v => v ?? 0;

  const summary = data.reduce((acc, row) => {

    const addResult = (obj, pts) => {
      if (pts === 3) obj.w++;
      else if (pts === 1) obj.d++;
      else if (pts === 0) obj.l++;
    };

    if (row.t1_home_gf != null) {
      acc.t1.home.played++;
      acc.t1.home.gf += safe(row.t1_home_gf);
      acc.t1.home.ga += safe(row.t1_home_ga);
      acc.t1.home.pts += safe(row.t1_home_pts);
      addResult(acc.t1.home, row.t1_home_pts);
    }

    if (row.t1_away_gf != null) {
      acc.t1.away.played++;
      acc.t1.away.gf += safe(row.t1_away_gf);
      acc.t1.away.ga += safe(row.t1_away_ga);
      acc.t1.away.pts += safe(row.t1_away_pts);
      addResult(acc.t1.away, row.t1_away_pts);
    }

    if (row.t2_home_gf != null) {
      acc.t2.home.played++;
      acc.t2.home.gf += safe(row.t2_home_gf);
      acc.t2.home.ga += safe(row.t2_home_ga);
      acc.t2.home.pts += safe(row.t2_home_pts);
      addResult(acc.t2.home, row.t2_home_pts);
    }

    if (row.t2_away_gf != null) {
      acc.t2.away.played++;
      acc.t2.away.gf += safe(row.t2_away_gf);
      acc.t2.away.ga += safe(row.t2_away_ga);
      acc.t2.away.pts += safe(row.t2_away_pts);
      addResult(acc.t2.away, row.t2_away_pts);
    }

    return acc;

  }, {
    t1: { home:{gf:0,ga:0,pts:0,played:0,w:0,d:0,l:0}, away:{gf:0,ga:0,pts:0,played:0,w:0,d:0,l:0} },
    t2: { home:{gf:0,ga:0,pts:0,played:0,w:0,d:0,l:0}, away:{gf:0,ga:0,pts:0,played:0,w:0,d:0,l:0} }
  });

  ["t1","t2"].forEach(team => {
    summary[team].total = {
      gf: summary[team].home.gf + summary[team].away.gf,
      ga: summary[team].home.ga + summary[team].away.ga,
      pts: summary[team].home.pts + summary[team].away.pts,
      played: summary[team].home.played + summary[team].away.played,
      w: summary[team].home.w + summary[team].away.w,
      d: summary[team].home.d + summary[team].away.d,
      l: summary[team].home.l + summary[team].away.l
    };
  });

  return summary;
}

export function summariseDirectComparison(data) {

  const summary = {
    t1: { home:{gf:0,ga:0,swing:0,played:0,w:0,d:0,l:0}, away:{gf:0,ga:0,swing:0,played:0,w:0,d:0,l:0}, total:{} },
    t2: { home:{gf:0,ga:0,swing:0,played:0,w:0,d:0,l:0}, away:{gf:0,ga:0,swing:0,played:0,w:0,d:0,l:0}, total:{} }
  };

  const addResult = (obj, pts) => {
    if (pts === 3) obj.w++;
    else if (pts === 1) obj.d++;
    else if (pts === 0) obj.l++;
  };

  data.forEach(row => {

    if (row.t1_home_swing != null) {

      summary.t1.home.gf += row.t1_home_gf ?? 0;
      summary.t1.home.ga += row.t1_home_ga ?? 0;
      summary.t1.home.swing += row.t1_home_swing ?? 0;
      summary.t1.home.played++;
      addResult(summary.t1.home, row.t1_home_pts);

      summary.t2.home.gf += row.t2_home_gf ?? 0;
      summary.t2.home.ga += row.t2_home_ga ?? 0;
      summary.t2.home.swing += row.t2_home_swing ?? 0;
      summary.t2.home.played++;
      addResult(summary.t2.home, row.t2_home_pts);
    }

    if (row.t1_away_swing != null) {

      summary.t1.away.gf += row.t1_away_gf ?? 0;
      summary.t1.away.ga += row.t1_away_ga ?? 0;
      summary.t1.away.swing += row.t1_away_swing ?? 0;
      summary.t1.away.played++;
      addResult(summary.t1.away, row.t1_away_pts);

      summary.t2.away.gf += row.t2_away_gf ?? 0;
      summary.t2.away.ga += row.t2_away_ga ?? 0;
      summary.t2.away.swing += row.t2_away_swing ?? 0;
      summary.t2.away.played++;
      addResult(summary.t2.away, row.t2_away_pts);
    }
  });

  ["t1","t2"].forEach(team => {
    summary[team].total = {
      gf: summary[team].home.gf + summary[team].away.gf,
      ga: summary[team].home.ga + summary[team].away.ga,
      swing: summary[team].home.swing + summary[team].away.swing,
      played: summary[team].home.played + summary[team].away.played,
      w: summary[team].home.w + summary[team].away.w,
      d: summary[team].home.d + summary[team].away.d,
      l: summary[team].home.l + summary[team].away.l
    };
  });

  return summary;
}

// End of Team Comparison Tool