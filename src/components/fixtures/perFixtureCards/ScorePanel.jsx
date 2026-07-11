import { useState, useEffect } from "react";
import PredictionRow from "./PredictionRow";
import ScoreRow from "./ScoreRow";
import ResolutionRow from "./ResolutionRow";

export default function ScorePanel({
    fixture,
    prediction,
    predictionDrafts,
    setPredictionDrafts,
    postKickoff
}) {

    const predictionAvailable =
        fixture?.predictions_open &&
        fixture.fixture_status === "upcoming"
    ;

    const fixtureStarted =
        fixture.fixture_status === "live_90" ||
        fixture.fixture_status === "live_et" ||
        fixture.fixture_status === "finished"
    ;

    const hasFT = 
        fixture.fixture_status === "live_et" || 
        fixture.fixture_status === "finsihed"
    ;

    const hasExtraTime =
        fixture.fixture_status === "live_et" ||
        fixture.resolution_type === "extra_time" ||
        fixture.resolution_type === "penalties"
    ;

    const [displayIndex, setDisplayIndex] = useState(0);


    const scoreDisplays = [
        {
            home: fixture.ft_home_goals,
            away: fixture.ft_away_goals,
            label: fixture.fixture_status === "live_90" ? "" : "FT:"
        },
        {
            home: fixture.final_home_goals,
            away: fixture.final_away_goals,
            label: fixture.fixture_status === "live_et" ? "" : "AET:"
        }
    ];
    

    const predictionDisplays = [
        <PredictionRow 
            canPredict={predictionAvailable}
            fixtureStarted={fixtureStarted}
            fixture={fixture}
            prediction={prediction}
            predictionDrafts={predictionDrafts}
            setPredictionDrafts={setPredictionDrafts}
        />,
        <ResolutionRow fixture={fixture}/>
    ]    

    const scoreDisplay = scoreDisplays[displayIndex];

    const PredictionDisplay = predictionDisplays[displayIndex];

    useEffect(() => {
        if (!hasExtraTime)  return;

        const interval = setInterval(() => {
            setDisplayIndex(prev => prev === 0 ? 1 : 0);
        }, 4000);

        return () => clearInterval(interval);

    }, [hasExtraTime]);

    return (
        <div className="scorePanel">
            {postKickoff && (
                <ScoreRow 
                    fixture={fixture} 
                    display={scoreDisplay}
                    hasFT={hasFT}                
                />
            )}

            {PredictionDisplay }

        </div>
    )
}