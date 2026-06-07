import DashboardContainer from "../components/Dashboard/DashboardContainer"

export default function DashboardPage() {
    return (
        <div className="pageShell">
            <div className="dashboardHeader">
                WELCOME
            </div>
            <div className="scrollArea">
                <DashboardContainer/>
            </div>
        </div>

    )
}