import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useFlavour } from "../../hooks/useFlavour";

import Login from "./Login";
import Maintenance from "./Maintenance";

import { APP_CONFIG } from "../../config";

const PUBLIC_ROUTES = [
    "/login",
    "/forgot-password",
    "/reset-password",
    "/confirm-email"
];

export default function AuthGate({ children }) {
    const { user, loading: authLoading } = useAuth();

    const {
        flavours,
        selectedFlavourId,
        setSelectedFlavour,
        loading: flavourLoading
    } = useFlavour();

    const location = useLocation();

    const isPublicRoute = PUBLIC_ROUTES.some(route =>
        location.pathname.startsWith(route)
    );

    useEffect(() => {
        if (authLoading) return;
        if (flavourLoading) return;
        if (!user) return;
        if (selectedFlavourId != null) return;

        const storedId = localStorage.getItem(
            "selectedFlavourId"
        );

        const storedFlavour = storedId
            ? flavours.find(
                f => f.flavour_id === Number(storedId)
            )
            : null;

        const defaultFlavour =
            flavours.find(f => f.is_default);

        const resolved =
            storedFlavour ??
            defaultFlavour;

        if (resolved) {
            setSelectedFlavour(resolved.flavour_id);
        }
    }, [
        authLoading,
        flavourLoading,
        user,
        selectedFlavourId,
        flavours,
        setSelectedFlavour
    ]);

    if (authLoading) {
        return <div>AUTH LOADING</div>;
    }

    if (flavourLoading) {
        return <div>FLAVOUR LOADING</div>;
    }

    if (APP_CONFIG.maintenanceMode) {
        return <Maintenance />;
    }

    if (!user && !isPublicRoute) {
        return <Login />;
    }

    if (user && selectedFlavourId == null) {
        return <div>SELECTING FLAVOUR</div>;
    }

    return children;
}