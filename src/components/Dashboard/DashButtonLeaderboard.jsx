import { useNavigate } from "react-router-dom";
import { LeaderboardLogo } from "./DashboardLogos";

export default function DashButtonLeaderboard({ label, to }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button
            className="dashboardButton"
            onClick={handleClick}
        >
            <div className="dashContent">

                <div className="dashButtonLabel">
                    <span>{label}</span>
                </div>

                <LeaderboardLogo />

            </div>
        </button>
    );
}