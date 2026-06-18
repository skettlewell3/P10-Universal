import FlavourDropdown from "./FlavourDropdown";
import ProfileCard from "./ProfileCard";
// import { useLeaderboardsUser } from "../../hooks/useLeaderboardsUser";


export default function HeaderProfile({ profile }) {
    // const { overallUserLeaderboard, loading } = useLeaderboardsUser();

    // const userStats = overallUserLeaderboard.find((row) => row.user_id === user?.user_id);

    // const overallRanking = loading ? "-" : userStats?.rank_position ?? "-";
    
    // const overallScore = loading ? "-" : userStats?.total_points ?? "-";

    const overallRanking = 1;
    const overallScore = 100;

    return (
        <header id="headerProfile">
            <ProfileCard 
                profile={profile}
                overallRanking={overallRanking}
                overallScore={overallScore} 
            />
            {/* <FlavourDropdown  /> */}
        </header>
    );
}