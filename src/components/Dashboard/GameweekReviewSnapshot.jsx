import { useLeaderboard } from "../../hooks/useLeaderboard";
import { useStage } from "../../hooks/useStage";

export default function GameweekReviewSnapshot() {
    const { leaderboardSnapshot } = useLeaderboard();
    const { stages, tickerStageId } = useStage();

    if (!leaderboardSnapshot) return null;

    const tickerStage = stages.find(
        stage => stage.stage_id === tickerStageId
    );

    const {
        rank,
        points_total,
        perfect_10s,
        correct_results,
        correct_home_goals,
        correct_away_goals,
        correct_goal_difference,
        correct_total_goals
    } = leaderboardSnapshot;

    return (
        <div className="gameweekReviewSnapshot">
            <div className="gameweekReviewPrimary">                
                <div className="gameweekReviewStat">
                    <span className="stageCode">{tickerStage.stage_code}</span>
                </div>

                <div className="gameweekReviewStat">
                    <span>#</span>
                    <strong>{rank}</strong>
                </div>

                <div className="gameweekReviewStat">
                    <span>Pts</span>
                    <strong>{points_total}</strong>
                </div>
            </div>

            <div className="gameweekReviewRow">
                <div className="gameweekReviewStat">
                    <span>P10s</span>
                    <strong>{perfect_10s}</strong>
                </div>

                <div className="gameweekReviewStat">
                    <span>R</span>
                    <strong>{correct_results}</strong>
                </div>

                <div className="gameweekReviewStat">
                    <span>GD</span>
                    <strong>{correct_goal_difference}</strong>
                </div>
            </div>

            <div className="gameweekReviewRow">
                <div className="gameweekReviewStat">
                    <span>H</span>
                    <strong>{correct_home_goals}</strong>
                </div>

                <div className="gameweekReviewStat">
                    <span>A</span>
                    <strong>{correct_away_goals}</strong>
                </div>

                <div className="gameweekReviewStat">
                    <span>G</span>
                    <strong>{correct_total_goals}</strong>
                </div>
            </div>
        </div>
    );
}