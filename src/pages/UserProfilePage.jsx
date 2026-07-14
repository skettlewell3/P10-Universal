import ContentBanner from "../components/app/ContentBanner";
import ProfileAccountCard from "../components/profile/ProfileAccountCard";
import ProfileClubCard from "../components/profile/ProfileClubCard";

export default function UserProfilePage() {
    return (
        <div className="pageShell">

            <ContentBanner />

            <div className="scrollArea dashboardScroll">

                <ProfileAccountCard />

                <ProfileClubCard />

            </div>

        </div>
    );
}