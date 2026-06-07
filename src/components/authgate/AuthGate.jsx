import { useAuth } from "../../hooks/useAuth";
import Login from "./Login";
import AppWithUser from "../../AppWithUser";

export default function AuthGate() {
  const { user, profile, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Login />;
  }

  if (!profile) {
    return null; // or a loader like "loading profile..."
  }

  return <AppWithUser profile={profile} />;
}