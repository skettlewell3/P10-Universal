import { Routes, Route } from "react-router-dom";
import DashboardPage from "../../pages/DashboardPage";
import FixturesPage from "../../pages/FixturesPage";
import LeaderboardPage from "../../pages/LeaderboardPage.";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/fixtures" element={<FixturesPage />} />
      <Route path="/leaderboards" element={<LeaderboardPage />} />
    </Routes>
  );
}