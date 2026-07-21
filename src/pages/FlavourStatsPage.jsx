import { useProfile } from "../hooks/useProfile";
import ContentBanner from "../components/app/ContentBanner";
import LeagueTableCard from "../components/tables/leagueTables/LeagueTableCard";
import { useFlavour } from "../hooks/useFlavour";


export default function FlavourStatsPage() {
    const { profile } = useProfile();
    const { isGameweekFormat } = useFlavour();

    return (
        <div className="pageShell">
                    
            <ContentBanner />

            <div className="scrollArea dashboardScroll">
                {isGameweekFormat && (
                    <LeagueTableCard 
                        profileId={profile?.profile_id}
                        defaultView="actual"
                    />
                )}
            </div>
        </div>
    )
};