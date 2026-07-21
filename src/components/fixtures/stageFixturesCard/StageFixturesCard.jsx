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

    const fixture = fixtures[0];

    const stageClass = fixture.gameweek_number
        ? `gwStage-${fixture.gameweek_number % 4}`
        : "specialStage"
    ;

    return (
        <div className={`fixtureCard groupedFixturesCard ${stageClass}`}>
            
            <StageFixtureCardHeader 
                fixtures={fixtures} 
                predictionWindowOpen={predictionWindowOpen}
            />

            {fixtures.map((fixture) => (            
                <StageFixtureFieldset 
                    key={fixture.fixture_id}
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