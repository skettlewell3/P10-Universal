import ProfileDropdown from "./ProfileDropdown";


export default function ProfileIdentity() {
    return (
        <div className="profileIdentity">
            <ProfileDropdown />
            <div>
                <div className="profileName">
                    Sam K
                </div>

                <div className="profilePoints">
                    ⭐ 100 PTS
                </div>
            </div>

        </div>
    )
}