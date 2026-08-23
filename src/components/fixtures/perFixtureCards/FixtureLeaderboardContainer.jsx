import { useEffect } from "react";
import { useFixtureScoreboard} from "../../../hooks/useFixtureScoreboard";

export default function FixtureLeaderboardContainer({ fixtureId }) {

    const { 
        fixtureLeaderboard, 
        loadingFixtureLeaderboard, 
        openFixtureLeaderboard
    } = useFixtureScoreboard();

    useEffect(() => {
        if (!fixtureId) return;
        openFixtureLeaderboard(fixtureId);
    }, [fixtureId, openFixtureLeaderboard])

    const data = fixtureLeaderboard[fixtureId] ?? [];
    const loading = loadingFixtureLeaderboard[fixtureId];

    return (
        <div className="fixtureLeaderboard">

            <div className="lbHeaderRow lbLayout">
                <div>#</div>
                <div className="displayName lb">Name</div>
                <div>Score</div>
                <div>Pts</div>
            </div>

            {loading && <div>Loading...</div>}

            {!loading && data.map(row => (
                <div key={row.profile_id} className="lbRow lbLayout">
                    <div>{row.rank}</div>
                    <div className="displayName lb">{row.display_name}</div>
                    <div>
                        <span>{row.pred_home_goals}</span>
                        <span>-</span>
                        <span>{row.pred_away_goals}</span>
                    </div>
                    <div>{row.points_total}</div>
                </div>
            ))}
        </div>
    );
}