import DashboardButton from "./DashboardButton"

export default function DashboardContainer () {
    return (
        <div id="dashboardContainer">
            <DashboardButton label="fixtures" to="/fixtures" />
            {/* <DashboardButton label="results" to="/results" disabled/> */}
            {/* <DashboardButton label="leaderboards" to="/leaderboards" disabled /> */}
            {/* <DashboardButton label="stats" to="/stats" disbaled />             */}
        </div>
    )
}