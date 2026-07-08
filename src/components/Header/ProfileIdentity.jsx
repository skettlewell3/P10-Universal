import { useProfile } from "../../hooks/useProfile"
import { useProfileTicker } from "../../hooks/useProfileTicker";

export default function ProfileIdentity() {

    const { profile } = useProfile(); 
    const { globalPoints } = useProfileTicker();

    return (
        <div className="profileIdentity">
            
            <div className="profileName">
                {profile.display_name}
            </div>

            <div className="profilePoints">
                ⭐'s: {globalPoints ?? "-"} 
            </div>
    
        </div>
    )
}