import ProfileDropdown from "./ProfileDropdown";

export default function ProfileCard({ overallRanking, profile, overallScore, onLogout }) {

    return (
        <div id="profileCard">
            <ProfileDropdown profile={profile} onLogout={onLogout} />
            
            <div id="profileCardText">
                <div id="profileCardScore">⭐:{overallScore}</div>
                <div id="profileCardName">{profile?.display_name}</div>
                <div id="profileCardRanking">#{overallRanking}</div>
            </div>
        </div>
    );
}