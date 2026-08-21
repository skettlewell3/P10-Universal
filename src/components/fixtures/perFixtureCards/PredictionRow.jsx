import { buildDraft } from "../../../utils/helpers";

export default function PredictionRow({
    fixtureStarted,
    canPredict,
    fixture, 
    prediction, 
    predictionDrafts,
    setPredictionDrafts,
    singleSubmitAllowed
}) {  
    
    const draft = predictionDrafts[fixture.fixture_id];

    const homeValue =
      draft?.home ??
      prediction?.pred_home_goals ?? ""
    ;

    const awayValue =
      draft?.away ??
      prediction?.pred_away_goals ?? ""
    ;
      
    const newEntry =
      !!draft &&
        (
          draft.home != prediction?.pred_home_goals ||
          draft.away != prediction?.pred_away_goals
        )
    ;

    const inputColor = newEntry ? "#0000ff" : "#000000";

    // const leftContent = ;
    // const rightContent = ;
    
    // {`${isOpen} ?? "predictionRow expand" : "predictionRow"`}
    
    return (
        <div className="predictionRow">
            {canPredict && (
                <input
                    type="number"                        
                    className="predInput home"
                    name={fixture.home_team_name}
                    style={{color: inputColor}}
                    min="0"
                    max="10"
                    disabled={!singleSubmitAllowed}
                    value={homeValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPredictionDrafts(prev => ({
                        ...prev,
                        [fixture.fixture_id]: {
                          ...buildDraft(
                            prev[fixture.fixture_id],
                            prediction
                          ),
                          home: val,
                        },
                      }));
                    }}
                />
            )}
            
            {!canPredict && fixtureStarted && (
                <div className="predDiv home">
                    {prediction?.pred_home_goals}
                </div>           
            )}

            {!fixtureStarted ? (
                <div className="vs">
                    V
                </div>
            ) : (
                <div className=" vs vsPred">
                    <span className="label">You:</span>
                    V
                </div>
            )}
            

            {canPredict && (                    
                <input                        
                    type="number"
                    className="predInput away"
                    name={fixture.away_team_name}
                    style={{color: inputColor}}
                    min="0"
                    max="10"
                    disabled={!singleSubmitAllowed}
                    value={awayValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      setPredictionDrafts(prev => ({
                        ...prev,                            
                        [fixture.fixture_id]: {
                          ...buildDraft(
                            prev[fixture.fixture_id],
                            prediction
                          ),
                          away: val,
                        },
                      }));
                    }}
                />                    
            )}  

            {!canPredict && fixtureStarted && (
                <div className="predDiv away">
                    {prediction?.pred_away_goals}
                </div>           
            )}
        </div>
    )}