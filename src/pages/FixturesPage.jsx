import ContentBanner from "../components/app/ContentBanner";
import FixturesFilters from "../components/fixtures/FixturesFilters";
import { useFixtures } from "../hooks/useFixtures";

export default function FixturesPage() {
    const [fixtures] = useFixtures();

    const filteredFixtures = fixtures;

    return (
        <div className="pageShell">
            {/* Page Banner (e.g back button + page title) */}
            <ContentBanner/>
            
            <FixturesFilters/>

            <div className="scrollArea">
                {/* fixturesList */}    

            </div>
            
        </div>
    )
}