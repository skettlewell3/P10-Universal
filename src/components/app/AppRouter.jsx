import { Routes, Route } from "react-router-dom";
import DashboardPage from "../../pages/DashboardPage";
import FixturesPage from "../../pages/FixturesPage";
import LeaderboardPage from "../../pages/LeaderboardPage.";
import GameweekPage from "../../pages/GameweekPage";
import UserProfilePage from "../../pages/UserProfilePage";
import ClubsOverviewPage from "../../pages/ClubsOverview";
import ClubhousePage from "../../pages/ClubhousePage";
import FlavourStatsPage from "../../pages/FlavourStatsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/fixtures" element={<FixturesPage />} />
      <Route path="/leaderboards" element={<LeaderboardPage />} />
      <Route path="/gameweek" element={<GameweekPage />} />
      <Route path="/account" element={<UserProfilePage />} />
      <Route path="/clubs" element={<ClubsOverviewPage />} />
      <Route path="/clubhouse/:clubId" element={<ClubhousePage />} />
      <Route path="/stats" element={<FlavourStatsPage />} />
    </Routes>
  );
}