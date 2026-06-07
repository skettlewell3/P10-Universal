import ContentBanner from "../components/app/ContentBanner";
import FixturesFilters from "../components/fixtures/FixturesFilters";
import PerFixtureCard from "../components/fixtures/perFixtureCards/PerFixtureCard";
import { useFixtures } from "../hooks/useFixtures";
import { useFixturesFilters } from "../hooks/useFixturesFilters";

export default function FixturesPage() {
    const { fixtures } = useFixtures();
    const { statusFilter } = useFixturesFilters();

    const filteredFixtures = fixtures.filter(f => 
            statusFilter === "all" ? true : f.fixture_status === statusFilter
        );

    return (
        <div className="pageShell">
            {/* Page Banner (e.g back button + page title) */}
            <ContentBanner/>
            
            <FixturesFilters/>

            <div className="scrollArea fixturesList">
              {filteredFixtures.map(f => (
                    <PerFixtureCard
                        key={f.fixture_id}
                        fixture={f}
                    />
                ))}

            </div>
            
        </div>
    )
}