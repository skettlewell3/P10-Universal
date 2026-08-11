import { useMemo, useState } from "react";
import { useFixtures } from "../hooks/useFixtures";
import { useGameweeks } from "../hooks/useGameweeks";
import { usePredictions } from "../hooks/usePredictions";
import { isDirtyPrediction, isValidPrediction } from "../utils/helpers";
import ContentBanner from "../components/app/ContentBanner";
import StageFixturesCard from "../components/fixtures/stageFixturesCard/StageFixturesCard";
import SubmitSlideUp from "../components/fixtures/SubmitSlideUp";
import MatchModal from "../components/matchmodal/MatchModal";

export default function GameweekPage() {
    const { activeGameweekId } = useGameweeks();
    const { fixtures, groupByKickoff } = useFixtures();
    const { submitPredictions, predictionsLoading, predictionsMap } = usePredictions();
    const [ predictionDrafts, setPredictionDrafts ] = useState({});
    const [modalFixture, setModalFixture] = useState(null);

    const gameweekFixtures = useMemo(() => {
        if (!activeGameweekId) return [];

        return [...fixtures]
            .filter(f => f.gameweek_id === activeGameweekId)
            .sort (
                (a, b) => 
                    new Date(a.kickoff_at) -
                    new Date(b.kickoff_at)
            );
    }, [fixtures, activeGameweekId]);

    const fixtureCount = gameweekFixtures.length;
    const earliestFixture = gameweekFixtures[0];

    const groupedFixtures = useMemo(() => {
        return groupByKickoff(gameweekFixtures);
    }, [gameweekFixtures, groupByKickoff]);

    const predictionWindowOpen = earliestFixture?.predictions_open;

    const hasExistingSet = useMemo(() => {
        if (!gameweekFixtures.length) return false;

        return gameweekFixtures.every(
            fixture => predictionsMap[fixture.fixture_id]
        );
    }, [gameweekFixtures, predictionsMap]);

    const validDrafts = useMemo(() => {
        return Object.entries(predictionDrafts).filter(([fixtureId, draft]) => {
            const prediction = predictionsMap[fixtureId];

            return (
                isValidPrediction(draft) &&
                isDirtyPrediction(draft, prediction)
            );
        });
    }, [predictionDrafts, predictionsMap]);

    const hasCompleteDraftSet = validDrafts.length > 0 && validDrafts.length === fixtureCount;

    const isUpdating = hasExistingSet && validDrafts.length > 0;

    const canSubmit = hasCompleteDraftSet || isUpdating;

    const handleBulkSubmit = async () => {
        const payloads = validDrafts.map(([fixture_id, draft]) => ({
            fixture_id: Number(fixture_id),
            pred_home_goals: Number(draft.home),
            pred_away_goals: Number(draft.away),
        }));

        if (!payloads.length) return;

        try {
            await submitPredictions(payloads);
            setPredictionDrafts({});
        } catch (error) {
            console.error(error);
        }
    };

    return (
            <div className="pageShell">
                        
                <ContentBanner />
    
                <div className="scrollArea activeStageScroll">
                    <form id="predictionForm">
                        {Object.entries(groupedFixtures).map(([groupKey, fixtures]) => (
                            <StageFixturesCard
                                key={groupKey}
                                fixtures={fixtures}
                                predictionDrafts={predictionDrafts}
                                setPredictionDrafts={setPredictionDrafts}
                                predictionWindowOpen={predictionWindowOpen}
                                openMatchModal={setModalFixture}
                            />
                        ))}
                    </form>   
                </div>

                {modalFixture && (
                    <MatchModal
                        fixture={modalFixture}
                        fixtures={fixtures}
                        navigationFixtures={gameweekFixtures}
                        predictionDrafts={predictionDrafts}
                        setPredictionDrafts={setPredictionDrafts}
                        onClose={() => setModalFixture(null)}
                    />
                )}
                
                {canSubmit && (
                    <SubmitSlideUp
                    validDrafts={validDrafts}
                    handleBulkSubmit={handleBulkSubmit}
                    predictionsLoading={predictionsLoading}
                    />
                )}
            </div>
        )
}