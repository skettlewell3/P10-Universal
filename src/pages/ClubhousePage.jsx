import { useParams } from "react-router-dom";
import { useClubs } from "../hooks/useClubs";
import ContentBanner from "../components/app/ContentBanner";
import SendClubInviteForm from "../components/clubs/SendClubInviteForm";
import ClubMembersList from "../components/clubs/ClubMembersList";

export default function ClubhousePage() {

    const { clubId } = useParams();

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

    const clubMates = clubs.filter(
        clubMates => clubMates.club_id === clubId 
    );

    return (
        <div className="pageShell">

            <ContentBanner title={club?.club_name ?? "Clubhouse"}/>

            <div className="scrollArea dashboardScroll">

                {canManageClub && (
                    <>
                        <SendClubInviteForm clubId={club.club_id} />
                    </>
                )}

                {club && (
                    <ClubMembersList clubMates={clubMates} />
                )}
            </div>
        </div>
    );
}