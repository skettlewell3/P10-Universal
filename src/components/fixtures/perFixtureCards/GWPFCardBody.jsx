import GWTeamBlock from "./GWTeamBlock";
import PerFixtureCardDetails from "./PerFixtureCardDetails";
import ScorePanel from "./ScorePanel";
import PFCardDeadline from "./PFCardDeadline";
import FixtureLeaderboardToggle from "./FixtureLeaerboardToggle";
import { isValidPrediction, getTeamStyle } from "../../../utils/helpers";
import { useTeams } from "../../../hooks/useTeams";

export default function GWPFCardBody({
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

    const singleSubmitAllowed = fixture.gameweek_id === null;

    const canSubmit = isValidPrediction(draft) && singleSubmitAllowed;

    const isDirty = (() => {
      if (!draft) return false;
      if (!existing) return true;

      return (
        Number(draft.home) !== existing.pred_home_goals ||
        Number(draft.away) !== existing.pred_away_goals
      );
    })();

    const { teamsMap } = useTeams();

    const homeTeam = teamsMap[fixture.home_team_id];
    const awayTeam = teamsMap[fixture.away_team_id];
    
    const homeTeamStyle = getTeamStyle(
        homeTeam?.color_1,
        homeTeam?.color_2,
        homeTeam?.color_3
    );
    
    const awayTeamStyle = getTeamStyle(
        awayTeam?.color_1,
        awayTeam?.color_2,
        awayTeam?.color_3
    );

    return (
        <div className="fixtureBody">

            <div className="fCardCol L">
                <div className="stageCell">
                    {fixture.stage_name}
                </div>
                <GWTeamBlock 
                    name={fixture.home_team_name} 
                    style={homeTeamStyle}
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
                    singleSubmitAllowed={singleSubmitAllowed}
                />
            </div>
            

            <div className="fCardCol R">
                <div className="groupCell">
                    {fixture.group_letter > 0 ? `Group ${fixture.group_letter}` : ""}
                </div>
                <GWTeamBlock 
                    name={fixture.away_team_name} 
                    style={awayTeamStyle}

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