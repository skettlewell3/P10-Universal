import { useNavigate } from "react-router-dom";
import DashboardSnapshot from "./DashboardSnapshot";
import GameweekSnapshot from "./GameweekSnapshot";
import GameweekReviewSnapshot from "./GameweekReviewSnapshot";

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

                <DashboardSnapshot
                    screens={[
                        <GameweekSnapshot key="current" />,
                        <GameweekReviewSnapshot key="review" />
                    ]}
                    interval={5000}
                    loopFrom={0}
                />

            </div>
        </button>
    );
}