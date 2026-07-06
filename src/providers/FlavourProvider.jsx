import { useEffect, useMemo, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { FlavourContext } from "../context/FlavourContext";

export function FlavourProvider({ children }) {
    const { supabase } = useDatabase();

    const [flavours, setFlavours] = useState([]);
    const [selectedFlavourId, setSelectedFlavourId] = useState(null);

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading flavours..."
    });

    const [error, setError] = useState(null);

    async function loadFlavours() {
        try {
            setLoadingState({
                loading: true,
                message: "Fetching flavours..."
            });

            const { data, error } = await supabase.rpc(
                "get_flavours"
            );

            if (error) throw error;

            const result = data ?? [];
            setFlavours(result);

            const stored = localStorage.getItem("selectedFlavourId");

            const defaultFlavour = result.find(
                f => f.is_default
            );

            const resolvedId =
                stored
                    ? Number(stored)
                    : defaultFlavour?.flavour_id;

            setSelectedFlavourId(resolvedId);

            if (resolvedId) {
                localStorage.setItem(
                    "selectedFlavourId",
                    resolvedId
                );
            }

            setLoadingState({
                loading: false,
                message: "Flavour loaded"
            });

        } catch (err) {
            console.error(err);
            setError(err);

            setLoadingState({
                loading: false,
                message: "Failed to load flavours"
            });
        }
    }

    useEffect(() => {
        loadFlavours();
    }, []);

    const setSelectedFlavour = (id) => {
        if (id === selectedFlavourId) return ;

        setSelectedFlavourId(id);
        localStorage.setItem("selectedFlavourId", id);
    };

    /**
     * THIS is the only truth the rest of the app should use
     */
    const resolvedFlavour = useMemo(() => {
        return flavours.find(
            f => f.flavour_id === selectedFlavourId
        ) ?? null;
    }, [flavours, selectedFlavourId]);

    const value = {
        flavours,

        selectedFlavourId,
        setSelectedFlavour,

        resolvedFlavour,

        loadingState,
        error,

        // convenience access (no duplication of logic elsewhere)
        flavourId: resolvedFlavour?.flavour_id ?? null,
        competitionId: resolvedFlavour?.competition_id ?? null,
        competitionCode: resolvedFlavour?.competition_code ?? null,
        formatId: resolvedFlavour?.format_id ?? null,
        formatCode: resolvedFlavour?.format_code ?? null,

        isGameweekFormat: resolvedFlavour?.format_code === "GWK",
        isPerFixtureFormat: resolvedFlavour?.format_code === "PFX",
    };

    return (
        <FlavourContext.Provider value={value}>
            {children}
        </FlavourContext.Provider>
    );
}