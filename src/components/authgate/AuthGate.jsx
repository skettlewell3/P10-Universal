import { useAuth } from "../../hooks/useAuth";
import Login from "./Login";

export default function AuthGate({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>AUTH LOADING</div>;

  if (!user) {
    return <Login />;
  }

  console.log({
    loading,
    user
  });

  return children;
}