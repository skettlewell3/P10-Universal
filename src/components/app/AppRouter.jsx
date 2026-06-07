import { Routes, Route } from "react-router-dom";
import DashboardPage from "../../pages/DashboardPage";
import FixturesPage from "../../pages/FixturesPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/fixtures" element={<FixturesPage />} />
      {/* <Route path="/leaderboards" element={<LeaderboardsPage />} /> */}
    </Routes>
  );
}