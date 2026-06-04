import ProfileDropdown from "./ProfileDropdown";

export default function ProfileCard({ overallRanking, user, overallScore, onLogout }) {
   

    return (
        <div id="profileCard">
            <ProfileDropdown user={user} onLogout={onLogout} />
            
            <div id="profileCardText">
                <div id="profileCardScore">⭐:{overallScore}</div>
                <div id="profileCardName">{user?.display_name}</div>
                <div id="profileCardRanking">#{overallRanking}</div>
            </div>
        </div>
    );
}