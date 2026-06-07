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
            <span>{label}</span>
        </button>
    )
}