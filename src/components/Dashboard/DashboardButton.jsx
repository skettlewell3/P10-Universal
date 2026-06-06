export default function DashboardButton ({ label }) {
    console.log("dashboard")
    return (
        <button className="dashboardButton">
            hi <span>{label}</span>
        </button>
    )
}