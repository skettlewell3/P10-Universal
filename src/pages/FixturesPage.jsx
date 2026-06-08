import { useState } from "react";
import ContentBanner from "../components/app/ContentBanner";
import FixturesFilters from "../components/fixtures/FixturesFilters";
import PFCard from "../components/fixtures/perFixtureCards/PFCard";
import { useFixtures } from "../hooks/useFixtures";
import { useFixturesFilters } from "../hooks/useFixturesFilters";
import { usePredictions } from "../hooks/usePredictions";

export default function FixturesPage() {
    const { fixtures } = useFixtures();
    const { statusFilter } = useFixturesFilters();
    const { submitPredictions } = usePredictions();

    const [predictionDrafts, setPredictionDrafts] = useState({});

    const filteredFixtures = fixtures.filter(f => 
        statusFilter === "all" ? true : f.fixture_status === statusFilter
    );

    const handleBulkSubmit = async () => {
        const payloads = Object.entries(predictionDrafts).map(
            ([fixture_id, draft]) => ({
                fixture_id: Number(fixture_id),
                pred_home_goals: Number(draft.home),
                pred_away_goals: Number(draft.away),
            })
        );

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
            {/* Page Banner (e.g back button + page title) */}
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
                    />
                ))}

            </div>

            {/* submit all slide up div - handleBulkSubmit  */}
            
        </div>
    )
}