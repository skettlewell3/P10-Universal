import { useState, useMemo } from "react";
import ContentBanner from "../components/app/ContentBanner";
import FixturesFilters from "../components/fixtures/FixturesFilters";
import PFCard from "../components/fixtures/perFixtureCards/PFCard";
import SubmitSlideUp from "../components/fixtures/SubmitSlideUp";
import { useFixturesFilters } from "../hooks/useFixturesFilters";
import { usePredictions } from "../hooks/usePredictions";
import { isValidPrediction, isDirtyPrediction } from "../utils/helpers";

export default function FixturesPage() {
    const { filteredFixtures } = useFixturesFilters();
    const { submitPredictions, predictionsLoading, predictionsMap } = usePredictions();

    const [predictionDrafts, setPredictionDrafts] = useState({});

    const validDrafts = useMemo(() => {
        return Object.entries(predictionDrafts).filter(([fixtureId, draft]) => {
            const prediction = predictionsMap[fixtureId];

            return (
                isValidPrediction(draft) &&
                isDirtyPrediction(draft, prediction)
            );
        });
    }, [predictionDrafts, predictionsMap]);

    const hasMultiple = validDrafts.length >= 2;

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

            <FixturesFilters />

            <div className="scrollArea fixturesList">
                {filteredFixtures.map(f => (
                    <PFCard
                        key={f.fixture_id}
                        fixture={f}
                        predictionDrafts={predictionDrafts}
                        setPredictionDrafts={setPredictionDrafts}
                        submitPredictions={submitPredictions}
                        predictionsLoading={predictionsLoading}
                        hasMultiple={hasMultiple}
                    />
                ))}
            </div>

            {hasMultiple && (
                <SubmitSlideUp
                    validDrafts={validDrafts}
                    handleBulkSubmit={handleBulkSubmit}
                    predictionsLoading={predictionsLoading}
                />
            )}
        </div>
    );
}