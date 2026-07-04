import { useMemo, useState } from "react";
import ContentBanner from "../components/app/ContentBanner"
import { useFixtures } from "../hooks/useFixtures";
import { usePredictions } from "../hooks/usePredictions"
import { useStage } from "../hooks/useStage";
import StageFixturesCard from "../components/fixtures/stageFixturesCard/StageFixturesCard";
import SubmitSlideUp from "../components/fixtures/SubmitSlideUp";
import { isValidPrediction, isDirtyPrediction } from "../utils/helpers";

export default function ActiveStagePage() {
    const { activeStageId } = useStage();
    const { fixtures, groupByKickoff } = useFixtures();
    const { submitPredictions, predictionsLoading, predictionsMap } = usePredictions();
    const [ predictionDrafts, setPredictionDrafts] = useState({});

    const stageFixtures = useMemo(() => {
        if (!activeStageId) return [];

        return [...fixtures]
            .filter(f => f.stage_id === activeStageId)
            .sort(
                (a, b) =>
                    new Date(a.kickoff_at) -
                    new Date(b.kickoff_at)
            );
    }, [fixtures, activeStageId]);

    const fixtureCount = stageFixtures.length;
    const earliestFixture = stageFixtures[0];

    const groupedFixtures = useMemo(() => {
        return groupByKickoff(stageFixtures);
    }, [stageFixtures, groupByKickoff]);

    const predictionWindowOpen = earliestFixture?.predictions_open;

    const hasExistingSet = useMemo(() => {
        if (!stageFixtures.length) return false;

        return stageFixtures.every(
            fixture => predictionsMap[fixture.fixture_id]
        );
    }, [stageFixtures, predictionsMap]);
    
    
    const validDrafts = useMemo(() => {
        return Object.entries(predictionDrafts).filter(([fixtureId, draft]) => {
            const prediction = predictionsMap[fixtureId];
            
            return (
                isValidPrediction(draft) &&
                isDirtyPrediction(draft, prediction)
            );
        });
    }, [predictionDrafts, predictionsMap]);
    const hasCompleteDraftSet = validDrafts.length === fixtureCount;
    
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
                    {Object.entries(groupedFixtures).map(([key, fixtures]) => (
                        <StageFixturesCard
                            fixtures={fixtures}
                            predictionDrafts={predictionDrafts}
                            setPredictionDrafts={setPredictionDrafts}
                            predictionWindowOpen={predictionWindowOpen}
                        />
                    ))}
                </form>

                {/* <div className="test">
                    {Object.entries(groupedFixtures).map(([kickoff, fixtures]) => (
                        <pre key={kickoff}>
                            {kickoff}
                            {fixtures.length}
                        </pre>
                    ))}
                </div> */}


            </div>
            
            {canSubmit && (
                <SubmitSlideUp
                validDrafts={validDrafts}
                handleBulkSubmit={handleBulkSubmit}
                predictionsLoading={predictionsLoading}
                />
            )}
        </div>
    )
};
    //todo: top 10 leaderboard / leaderboard snapshot