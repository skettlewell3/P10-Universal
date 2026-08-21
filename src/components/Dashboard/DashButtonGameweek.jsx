import { useNavigate } from "react-router-dom";
import GameweekSnapshot from "./GameweekSnapshot";

export default function DashButtonGameweek({ label, to }) {
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

                <GameweekSnapshot />

            </div>
        </button>
    );
}