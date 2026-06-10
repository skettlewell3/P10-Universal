import { useAuth } from "../../hooks/useAuth";
import Login from "./Login";

export default function AuthGate({ children }) {
  const { user, profile, loading } = useAuth();

  if (loading) return <div>AUTH LOADING</div>;

  if (!user) {
    return <Login />;
  }

  if (!profile) {
    return <div>PROFILE LOADING</div>;
  }

  console.log({
    loading,
    user,
    profile
  });

  return children;
}