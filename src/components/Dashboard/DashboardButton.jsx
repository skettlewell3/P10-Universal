import { useNavigate } from "react-router-dom";

export default function DashboardButton ({ label, to }) {
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
                <div className="dashButtonLabel leaderboard">
                    <span>{label}</span>
                </div>

                


            </div>
        </button>
    )
}