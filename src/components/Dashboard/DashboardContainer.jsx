import { useFlavour } from "../../hooks/useFlavour";
import DashboardButton from "./DashboardButton";
import DashButtonFixture from "./DashButtonFixture";

export default function DashboardContainer () {
    const { isGameweekFormat, isPerFixtureFormat  } = useFlavour();
    return (
        <div id="dashboardContainer">
            <DashButtonFixture label="Fixtures" to="/fixtures" />
            <DashboardButton label="Leaderboard" to="/leaderboards" />
            {/* <DashboardButton label="stats" to="/stats" disbaled /> */}

            { isGameweekFormat && (
                <DashboardButton label="Gameweek" to="/gameweek" />
            )}

            <DashboardButton label="Clubs" to="/clubs" />
            
            { isGameweekFormat && (
                <DashboardButton label="Stats" to="/stats" />
            )}
        </div>
    )
}