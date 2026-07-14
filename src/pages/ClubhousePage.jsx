import { useParams } from "react-router-dom";
import { useClubs } from "../hooks/useClubs";
import ContentBanner from "../components/app/ContentBanner";
import SendClubInviteForm from "../components/clubs/SendClubInviteForm";

export default function ClubhousePage() {

    const { clubId } = useParams();

    const {
        clubs
    } = useClubs();


    const club = clubs.find(
        club => club.profile_id === clubId
    );


    return (
        <div className="pageShell">

            <ContentBanner title={club?.club_name ?? "Clubhouse"}/>

            <div className="scrollArea dashboardScroll">

                {club && (
                    <>
                        <SendClubInviteForm clubId={club.profile_id} />
                    </>
                )}

            </div>

        </div>
    );
}