import PerFixtureCardDetails from "./PerFixtureCardDetails";
import PerFixtureCardFieldset from "./PerFixtureCardFieldset";
import PerFixtureCardHeader from "./PerFixtureCardHeader";
import TeamBlock from "./TeamBlock";
import { usePredictions } from "../../../hooks/usePredictions";
import PFCardBody from "./PFCardBody";


export default function PFCard({ 
    fixture,
    predictionDrafts,
    setPredictionDrafts,
    submitPredictions
}) {
    const { predictionsMap } = usePredictions();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const draft = predictionDrafts[fixture.fixture_id];
        if (!draft) return;

        const payload = {
            fixture_id: fixture.fixture_id,
            pred_home_goals: Number(draft.home),
            pred_away_goals: Number(draft.away),
        };

        try {
            await submitPredictions([payload]);

            setPredictionDrafts(prev => {
                const next = { ...prev };
                delete next[fixture.fixture_id];
                return next;
            });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="fixtureCard perFixtureCard" onSubmit={handleSubmit}>
            <PerFixtureCardHeader 
                fixture={fixture}
            />

            <PFCardBody 
                fixture={fixture}
                predictionDrafts={predictionDrafts}
                setPredictionDrafts={setPredictionDrafts}
                predictionsMap={predictionsMap}
            />

            {/* <div className="fixtureBody">
                <div className="teamCol homeCol" >
                    <TeamBlock 
                        name={fixture.home_team_name} 
                        short={fixture.home_short_code}
                    />
                </div>

                <div className="detailsCol">
                    <PerFixtureCardDetails
                        fixture={fixture}
                    />
                    
                    <PerFixtureCardFieldset 
                        fixture={fixture}
                        predictionDrafts={predictionDrafts}
                        setPredictionDrafts={setPredictionDrafts}
                        prediction={predictionsMap[fixture.fixture_id]}
                    />
                </div>

                <div className="teamCol awayCol" >
                    <TeamBlock 
                        name={fixture.away_team_name} 
                        short={fixture.away_short_code}
                    />
                </div>
            </div>             */}
        
            {/* Footer - deadline open/close date. */}
            
        </form>
    )
}