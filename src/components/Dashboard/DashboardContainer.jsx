import DashboardButton from "./DashboardButton";
import DashButtonFixture from "./DashButtonFixture";

export default function DashboardContainer () {
    return (
        <div id="dashboardContainer">
            <DashButtonFixture label="Fixtures" to="/fixtures" />
            {/* <DashboardButton label="results" to="/results" disabled/> */}
            <DashboardButton label="Leaderboard" to="/leaderboards" />
            {/* <DashboardButton label="stats" to="/stats" disbaled /> */}

            <DashboardButton label="Gameweek" to="/gameweek" />
        </div>
    )
}