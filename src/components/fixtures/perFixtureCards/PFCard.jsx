import { useState } from "react";
import PerFixtureCardHeader from "./PerFixtureCardHeader";
import { usePredictions } from "../../../hooks/usePredictions";
import PFCardBody from "./PFCardBody";
import { isValidPrediction } from "../../../utils/helpers";
import FixtureLeaderboardContainer from "./FixtureLeaderboardContainer";


export default function PFCard({ 
    fixture,
    predictionDrafts,
    setPredictionDrafts,
    submitPredictions, 
    predictionsLoading
}) {

    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const { predictionsMap } = usePredictions();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const draft = predictionDrafts[fixture.fixture_id];
        if (!isValidPrediction(draft)) return;

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
                predictionsLoading={predictionsLoading}
                showLeaderboard={showLeaderboard}
                setShowLeaderboard={setShowLeaderboard}
            />

            { showLeaderboard && (
                <FixtureLeaderboardContainer 
                    fixtureId={fixture.fixture_id}
                />
            )

            }
            
        </form>
    )
}