import { useState, useMemo } from "react";
import ContentBanner from "../components/app/ContentBanner";
import FixturesFilters from "../components/fixtures/FixturesFilters";
import PFCard from "../components/fixtures/perFixtureCards/PFCard";
import SubmitSlideUp from "../components/fixtures/SubmitSlideUp";
import { useFixtures } from "../hooks/useFixtures";
import { useFixturesFilters } from "../hooks/useFixturesFilters";
import { usePredictions } from "../hooks/usePredictions";
import { isValidPrediction, isDirtyPrediction } from "../utils/helpers";

export default function FixturesPage() {
    const { fixtures } = useFixtures();
    const { statusFilter } = useFixturesFilters();
    const { submitPredictions, predictionsLoading, predictionsMap } = usePredictions();

    const [predictionDrafts, setPredictionDrafts] = useState({});

    const filteredFixtures = useMemo(() => {
      return fixtures
        .filter(f => f.home_team_id != null && f.away_team_id != null)
        .filter(f => 
          statusFilter === "all" 
          ? true 
          : f.fixture_status === statusFilter
        )
        .sort((a, b) =>
          new Date(a.kickoff_at).getTime() - new Date(b.kickoff_at).getTime()
      );
    }, [fixtures, statusFilter]);


    const validDrafts = useMemo(() => {
      return Object.entries(predictionDrafts)
        .filter(([fixtureId, draft]) => {
          const prediction = predictionsMap[fixtureId];

          return (
            isValidPrediction(draft) &&
            isDirtyPrediction(draft, prediction)
          );
        });
    }, [predictionDrafts, predictionsMap]);

    // const hasValidDrafts = validDrafts.length > 0;
    const hasMultiple = validDrafts.length >= 2;

    console.log({
      predictionDrafts,
      validDrafts,
      count: validDrafts.length
    });


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
            <ContentBanner/>
            
            <FixturesFilters/>

            <div className="scrollArea fixturesList">
              {filteredFixtures.map(f => (
                    <PFCard
                        key={f.fixture_id}
                        fixture={f}
                        predictionDrafts={predictionDrafts}
                        setPredictionDrafts={setPredictionDrafts}
                        submitPredictions={submitPredictions}
                        predictionsLoading={predictionsLoading}
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
    )
}