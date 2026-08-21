import { useNavigate } from "react-router-dom";
import { ClubsLogo } from "./DashboardLogos";

export default function DashButtonClubs({ label, to }) {
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

                <ClubsLogo />

            </div>
        </button>
    );
}