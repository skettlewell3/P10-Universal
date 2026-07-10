import { buildDraft } from "../../../utils/helpers";

export default function PFCFieldset({ 
    fixture,
    prediction,
    predictionDrafts,
    setPredictionDrafts,
    isOpen
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
      );

    const inputColor = newEntry ? "#0000ff" : "#000000";

    return (
      <div className="scorePanel">

        {!isOpen && (
          <div className="scoreRow">

              {/* HOME INPUT / RESULT */}
              {isOpen ? (
                  <input
                      type="number"
                      className="predInput homePred"
                      name={fixture.home_team_name}
                      style={{color: inputColor}}
                      min="0"
                      max="10"
                      // disabled={loading}
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
              ) : (
                  <div className="homeScore">{fixture.final_home_goals}</div>
              )}

              <div className="vs">V</div>
              {/* AWAY INPUT / RESULT */}
              {isOpen ? (                    
                  <input
                      type="number"
                      className="predInput awayPred"
                      name={fixture.away_team_name}
                      style={{color: inputColor}}
                      min="0"
                      max="10"
                      // disabled={loading}
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
              ) : (
                  <div className="awayScore">{fixture.final_away_goals}</div>
              )}    

          </div>
        )}

        <div className="predictionRow"> 
          prediction
        </div>
        

      </div>


    )
}