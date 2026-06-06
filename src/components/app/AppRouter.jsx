import { Routes, Route } from "react-router-dom";
import DashboardContainer from "../Dashboard/DashboardContainer";
import FixturesPage from "../../pages/FixturesPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardContainer />} />
      <Route path="/fixtures" element={<FixturesPage />} />
      {/* <Route path="/leaderboards" element={<LeaderboardsPage />} /> */}
    </Routes>
  );
}