import { useFlavour } from "../../hooks/useFlavour";
import DashboardButton from "./DashboardButton";
import DashButtonClubs from "./DashButtonClubs";
import DashButtonFixture from "./DashButtonFixture";
import DashButtonGameweek from "./DashButtonGameweek";
import DashButtonLeaderboard from "./DashButtonLeaderboard";

export default function DashboardContainer() {
    const { isGameweekFormat } = useFlavour();

    return (
        <div id="dashboardContainer">

            <DashButtonFixture
                label="Fixtures"
                to="/fixtures"
            />

            <DashButtonLeaderboard
                label="Leaderboard"
                to="/leaderboards"
            />

            {isGameweekFormat && (
                <DashButtonGameweek
                    label="Gameweek"
                    to="/gameweek"
                />
            )}

            <DashButtonClubs
                label="Clubs"
                to="/clubs"
            />

            {isGameweekFormat && (
                <DashboardButton
                    label="Stats"
                    to="/stats"
                />
            )}

        </div>
    );
}