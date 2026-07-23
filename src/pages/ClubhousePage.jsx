import { useParams } from "react-router-dom";
import { useClubs } from "../hooks/useClubs";
import ContentBanner from "../components/app/ContentBanner";
import SendClubInviteForm from "../components/clubs/SendClubInviteForm";
import ClubMembersList from "../components/clubs/ClubMembersList";
import LeagueTableCard from "../components/tables/leagueTables/LeagueTableCard";
import { useFlavour } from "../hooks/useFlavour";

export default function ClubhousePage() {

    const { clubId } = useParams();
    const { isGameweekFormat } = useFlavour();

    const {
        myMemberships,
        clubs
    } = useClubs();


    const club = myMemberships.find(
        club => club.club_id === clubId
    );

    const canManageClub =
        ["owner", "captain"].includes(club?.club_role)
    ;
    const isOwner = club?.club_role === "owner";

    const clubMates = clubs.filter(
        clubMates => clubMates.club_id === clubId 
    );

    return (
        <div className="pageShell">

            <ContentBanner title={club?.club_name ?? "Clubhouse"}/>

            <div className="scrollArea dashboardScroll">

                {club && (
                    <ClubMembersList 
                        clubId={club.club_id}
                        clubMates={clubMates} 
                        canManageClub={canManageClub}
                        canManageRoles={isOwner}
                    />
                )}

                {isGameweekFormat && (
                    <LeagueTableCard
                        profileId={clubId}
                        defaultView="predicted"
                    />
                )}

            </div>
        </div>
    );
}