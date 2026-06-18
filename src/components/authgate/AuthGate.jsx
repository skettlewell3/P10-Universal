import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Login from "./Login";

const PUBLIC_ROUTES = [
  "/login",
  "/forgot-password",
  "/reset-password"
];

export default function AuthGate({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    location.pathname.startsWith(route)
  );

  if (loading) return <div>AUTH LOADING</div>;

  if (!user && !isPublicRoute) {
    return <Login />;
  }

  console.log({
    loading,
    user
  });

  return children;
}