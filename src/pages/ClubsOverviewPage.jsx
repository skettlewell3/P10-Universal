import ContentBanner from "../components/app/ContentBanner";
import ClubInvitesCard from "../components/clubs/ClubInvitesCard";
import ClubOwnershipTransferCard from "../components/clubs/ClubOwnershipTransferCard";
import UserClubList from "../components/clubs/UserClubList";

export default function ClubsOverviewPage() {

    return (
        <div className="pageShell">

            <ContentBanner />

            <div className="scrollArea dashboardScroll">
                <ClubInvitesCard />

                <UserClubList />

                <ClubOwnershipTransferCard/>
            </div>

        </div>
    );
}