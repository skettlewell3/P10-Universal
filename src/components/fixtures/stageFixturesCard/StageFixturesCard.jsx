import { usePredictions } from "../../../hooks/usePredictions";
import StageFixtureCardHeader from "../stageFixturesCard/StageCardHeader";
import StageFixtureFieldset from "./StageFixtureFieldset";


export default function StageFixturesCard({
    fixtures,
    predictionDrafts,
    setPredictionDrafts, 
    predictionWindowOpen
}) {

    const { predictionsMap } = usePredictions();



    return (
        <div className="fixtureCard groupedFixturesCard">
            
            <StageFixtureCardHeader 
                fixtures={fixtures} 
                predictionWindowOpen={predictionWindowOpen}
            />

            {fixtures.map((fixture) => (            
                <StageFixtureFieldset 
                    fixture={fixture}
                    prediction={predictionsMap[fixture.fixture_id]}
                    predictionDrafts={predictionDrafts}
                    setPredictionDrafts={setPredictionDrafts}
                    predictionWindowOpen={predictionWindowOpen}
                />                
            ))}
        </div>
    )
}