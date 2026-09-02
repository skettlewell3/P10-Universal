import { useState } from "react";
import { usePredictions } from "../../../hooks/usePredictions";
import { isValidPrediction } from "../../../utils/helpers";
import GWPFCardHeader from "./GWPFCardHeader";
import GWPFCardBody from "./GWPFCardBody";
import FixtureLeaderboardContainer from "./FixtureLeaderboardContainer";


export default function GWPFCard({ 
    fixture,
    predictionDrafts,
    setPredictionDrafts,
    submitPredictions, 
    predictionsLoading,
    hasMultiple,
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

    const stageClass = fixture.gameweek_number
        ? `gwStage-${fixture.gameweek_number % 4}`
        : "specialStage"
    ;

    return (
        <form className={`fixtureCard ${stageClass}`} onSubmit={handleSubmit}>
            <GWPFCardHeader 
                fixture={fixture}
            />

            <GWPFCardBody 
                fixture={fixture}
                predictionDrafts={predictionDrafts}
                setPredictionDrafts={setPredictionDrafts}
                predictionsMap={predictionsMap}
                predictionsLoading={predictionsLoading}
                showLeaderboard={showLeaderboard}
                setShowLeaderboard={setShowLeaderboard}
                hasMulitple={hasMultiple}
            />

            { showLeaderboard && (
                <FixtureLeaderboardContainer 
                    fixtureId={fixture.fixture_id}
                />
            )}
            
        </form>
    )
}