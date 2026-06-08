export default function PerFixtureCardFieldset({ 
    fixture,
    prediction,
    predictionDrafts,
    setPredictionDrafts
}) {
    const isFinished = fixture.fixture_status === "finished";
    const isOpen = fixture.predictions_open && fixture.fixture_status === "upcoming";

    const draft = predictionDrafts[fixture.fixture_id];

    const homeValue =
      draft?.home ??
      prediction?.pred_home_goals ?? ""
    ;

    const awayValue =
      draft?.away ??
      prediction?.pred_away_goals ?? ""
    ;

    return (
        <div className="fixtureFieldset">
            
            <div className="scoreRow">

                {/* HOME INPUT / RESULT */}
                {isOpen ? (
                    <input
                        type="number"
                        className="predInput homePred"
                        name={fixture.home_team_name}
                        min="0"
                        max="10"
                        // disabled={loading}
                        value={homeValue}
                        onChange={(e) => {
                            const val = e.target.value;

                            setPredictionDrafts(prev => ({
                                ...prev,
                                [fixture.fixture_id]: {
                                    ...prev[fixture.fixture_id],
                                    home: val
                                }
                            }))
                        }}
                    />
                ) : (
                    <div className="homeScore">{fixture.final_home_goals}</div>
                )}
                

                <div className="vs">v</div>

                {/* AWAY INPUT / RESULT */}
                {isOpen ? (                    
                    <input
                        type="number"
                        className="predInput awayPred"
                        name={fixture.away_team_name}
                        min="0"
                        max="10"
                        // disabled={loading}
                        value={awayValue}
                        onChange={(e) => {
                          const val = e.target.value;
                        
                          setPredictionDrafts(prev => ({
                            ...prev,
                            [fixture.fixture_id]: {
                              ...prev[fixture.fixture_id],
                              away: val
                            }
                          }));
                        }}
                    />                    
                ) : (
                    <div className="awayScore">{fixture.final_away_goals}</div>
                )}

            </div>

            <div className="actionRow">

                {isOpen && (
                    <button type="submit">
                        Submit
                    </button>
                )}

                {isFinished && (
                    <div className="resultSummary">
                        {fixture.ft_home_goals} - {fixture.ft_away_goals}
                    </div>
                )}

                {/* {!isOpen && !isFinished && (
                    <div className="lockedState">
                        Closed
                    </div>
                )} */}

            </div>

        </div>
    );
}