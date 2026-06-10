import { useNavigate } from "react-router-dom";
import FixtureSnapshot from "./FixtureSnapshot";

export default function DashButtonFixture ({ label, to }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button 
            className="dashboardButton"
            onClick={handleClick}
        >
            <div className="dashFixtures">
                <div className="dashButtonLabel">
                    <span>{label}</span>
                </div>

                <FixtureSnapshot />


            </div>
        </button>
    )
}