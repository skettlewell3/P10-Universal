import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Login from "./Login";
import Maintenance from "./Maintenance";

import { APP_CONFIG } from "../../config";

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

    if (APP_CONFIG.maintenanceMode) {
        return <Maintenance />;
    }

    if (!user && !isPublicRoute) {
        return <Login />;
    }

    return children;
}