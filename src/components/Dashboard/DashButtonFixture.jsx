import { useNavigate } from "react-router-dom";
import { useFlavour } from "../../hooks/useFlavour";
import FixtureSnapshot from "./FixtureSnapshot";

export default function DashButtonFixture ({ label, to }) {
    const navigate = useNavigate();
    const { isPerFixtureFormat } = useFlavour();

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
                
                {isPerFixtureFormat && (
                    <FixtureSnapshot />
                )}


            </div>
        </button>
    )
}