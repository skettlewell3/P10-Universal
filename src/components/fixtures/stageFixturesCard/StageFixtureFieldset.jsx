import { getTeamStyle } from "../../../utils/helpers";

export default function StageFixtureFieldset({ 
    fixture,
    prediction,
    predictionDrafts,
    setPredictionDrafts,
    predictionWindowOpen
}) {

    const homeTeamStyle = getTeamStyle(
    fixture.home_color_1,
    fixture.home_color_2,
    fixture.home_color_3
);

const awayTeamStyle = getTeamStyle(
    fixture.away_color_1,
    fixture.away_color_2,
    fixture.away_color_3
);

    let mode = "blank";

if (fixture.fixture_status === "live_90" || fixture.fixture_status === "live_90" ||fixture.fixture_status === "finished" ) {
    mode = "result";
}
else if (predictionWindowOpen && fixture.fixture_status === "upcoming") {
    mode = "input";
}
else if (prediction) {
    mode = "prediction";
}

    const draft = predictionDrafts[fixture.fixture_id];

    const homeValue =
        draft?.home ??
        prediction?.pred_home_goals ??
        "";
    
    const awayValue =
        draft?.away ??
        prediction?.pred_away_goals ??
        "";

    return (
        <div className="fixtureFieldsetWrapper">
            <fieldset className="stageFixtureRow">

                <div
                  className="matchModalButton"
                //   onClick={(e) => {
                //     e.stopPropagation();
                //     openMatchModal(fixture);
                //   }}
                >
                  ⓘ
                </div>

                <div 
                    className="team home"
                    style={homeTeamStyle}
                >
                    {fixture.home_short_code}
                </div>

                <div className="scoreCell">

                    {mode === "input" ? (
                        <div className="homePred">
                            <input
                                type="number"
                                className="predInput"
                                value={homeValue}
                                min="0"
                                max="10"
                                onChange={(e) => {
                                    const val = e.target.value;
                                
                                    setPredictionDrafts(prev => ({
                                        ...prev,
                                        [fixture.fixture_id]: {
                                            home: val,
                                            away: awayValue,
                                        },
                                    }));
                                }}
                            />
                        </div>
                    ) : mode === "result" ? (
                        <div className="homeScore">{fixture.final_home_goals}</div>
                    ) : mode === "prediction" ? (
                        <div className="homePred">{prediction.pred_home_goals}</div>
                    ) : (
                        <div />
                    )}

                </div>

                <div className="vs">v</div>

                <div className="scoreCell">

                    {mode === "input" ? (
                        <div className="awayPred">
                            <input
                                type="number"
                                className="predInput"
                                value={awayValue}
                                min="0"
                                max="10"
                                onChange={(e) => {
                                    const val = e.target.value;
                                
                                    setPredictionDrafts(prev => ({
                                        ...prev,
                                        [fixture.fixture_id]: {
                                            home: homeValue,
                                            away: val,
                                        },
                                    }));
                                }}
                            />
                        </div>
                    ) : mode === "result" ? (
                        <div className="awayScore">{fixture.final_away_goals}</div>
                    ) : mode === "prediction" ? (
                        <div className="awayPredLoc">{prediction.pred_away_goals}</div>
                    ) : (
                        <div />
                    )}

                </div>

                <div                
                    className="team away"
                    style={awayTeamStyle}
                
                >
                    {fixture.away_short_code}
                </div>

                <div>
                    exp
                </div>

            </fieldset>
        </div>
    )
}