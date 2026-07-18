import { useProfile } from "../hooks/useProfile";
import ContentBanner from "../components/app/ContentBanner";
import LeagueTableCard from "../components/tables/leagueTables/LeagueTableCard";

export default function FlavourStatsPage() {
    const { profile } = useProfile();

    return (
        <div className="pageShell">
                    
            <ContentBanner />

            <div className="scrollArea dashboardScroll">
                <LeagueTableCard 
                    profileId={profile?.profile_id}
                    defaultView="actual"
                />
            </div>
        </div>
    )
};