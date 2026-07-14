import { Routes, Route } from "react-router-dom";
import DashboardPage from "../../pages/DashboardPage";
import FixturesPage from "../../pages/FixturesPage";
import LeaderboardPage from "../../pages/LeaderboardPage.";
import GameweekPage from "../../pages/GameweekPage";
import UserProfilePage from "../../pages/UserProfilePage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/fixtures" element={<FixturesPage />} />
      <Route path="/leaderboards" element={<LeaderboardPage />} />
      <Route path="/gameweek" element={<GameweekPage />} />
      <Route path="/account" element={<UserProfilePage />} />
    </Routes>
  );
}