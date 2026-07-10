import TeamBlock from "./TeamBlock";
import PerFixtureCardDetails from "./PerFixtureCardDetails";
import PFCardDeadline from "./PFCardDeadline";
import { isValidPrediction } from "../../../utils/helpers";
import FixtureLeaderboardToggle from "./FixtureLeaerboardToggle";
import ScorePanel from "./ScorePanel";

export default function PFCardBody({
    fixture, 
    predictionDrafts, 
    setPredictionDrafts, 
    predictionsMap,
    predictionsLoading,
    showLeaderboard,
    setShowLeaderboard,
    hasMulitple,
}) {   

    const isOpen = 
        fixture.predictions_open && 
        fixture.fixture_status === "upcoming"
    ;

    const postKickoff =
        fixture.fixture_status !== "upcoming" &&
        fixture.fixture_status !== "postponed"
    ;

    const existing = predictionsMap[fixture.fixture_id];
    const draft = predictionDrafts[fixture.fixture_id];

    const canSubmit = isValidPrediction(draft);

    const isDirty = (() => {
      if (!draft) return false;
      if (!existing) return true;

      return (
        Number(draft.home) !== existing.pred_home_goals ||
        Number(draft.away) !== existing.pred_away_goals
      );
    })();
    
    return (
        <div className="fixtureBody">

            <div className="fCardCol L">
                <div className="stageCell">
                    {fixture.stage_name}
                </div>
                <TeamBlock 
                    name={fixture.home_team_name} 
                    short={fixture.home_short_code}
                />               
                <PFCardDeadline 
                    fixture={fixture}                    
                />                 
                
            </div>

            <div className="fCardDetailsCol">
                <PerFixtureCardDetails
                    fixture={fixture}                    
                />

                <ScorePanel 
                    isOpen={isOpen}
                    postKickoff={postKickoff}
                    fixture={fixture}
                    prediction={predictionsMap[fixture.fixture_id]}
                    predictionDrafts={predictionDrafts}
                    setPredictionDrafts={setPredictionDrafts}
                />

            </div>
            

            <div className="fCardCol R">
                <div className="groupCell">
                    {fixture.group_letter > 0 ? `Group ${fixture.group_letter}` : ""}
                </div>
                <TeamBlock 
                    name={fixture.away_team_name} 
                    short={fixture.away_short_code}
                />
                <div className="submitCell">
                    {isOpen && (
                        <button 
                            type="submit" 
                            className={`pfSubmit ${canSubmit ? "canSubmit" : "noSubmit"}`}
                            disabled={!canSubmit || predictionsLoading || hasMulitple}
                        >
                            {existing ? (isDirty ? "Update" : "Saved") : "Submit"}
                        </button>
                    )}
                    {postKickoff && (
                        <FixtureLeaderboardToggle 
                            showLeaderboard={showLeaderboard}
                            setShowLeaderboard={setShowLeaderboard}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}