import TeamBlock from "./TeamBlock";
import PerFixtureCardDetails from "./PerFixtureCardDetails";
import PFCFieldset from "./PFCFieldset";
import PFCardDeadline from "./PFCardDeadline";

export default function PFCardBody({
    fixture, 
    predictionDrafts, 
    setPredictionDrafts, 
    predictionsMap,
}) {   

    const isOpen = fixture.predictions_open && fixture.fixture_status === "upcoming";

    
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

                <PFCFieldset 
                    isOpen={isOpen}
                    fixture={fixture}
                    prediction={predictionsMap[fixture.fixture_id]}
                    predictionDrafts={predictionDrafts}
                    setPredictionDrafts={setPredictionDrafts}
                />
            </div>
            

            <div className="fCardCol R">
                <div className="groupCell">
                    {fixture.group_letter}
                </div>
                <TeamBlock 
                    name={fixture.away_team_name} 
                    short={fixture.away_short_code}
                />
                <div className="submitCell">
                    {isOpen && (
                    <button type="submit" className="pfSubmit">
                        Submit
                    </button>
                )}
                </div>
            </div>
        </div>
    )
}