import { useAuth } from "../../hooks/useAuth";
import Login from "./Login";
import AppWithUser from "../../AppWithUser";

export default function AuthGate() {
  const { user, profile, loading } = useAuth();

  if (loading) return <div>AUTH LOADING</div>;

  if (!user) {
    return <Login />;
  }

  if (!profile) {
    return <div>PROFILE LOADING</div>; // or a loader like "loading profile..."
  }

  return <AppWithUser profile={profile} />;
}