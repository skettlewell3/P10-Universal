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

    useEffect(() => {
        let cancelled = false;

        async function loadFlavours() {
            try {
                const { data, error } = await supabase.rpc(
                    "get_flavours"
                );

                if (error) throw error;

                if (cancelled) return;

                setFlavours(data ?? []);

                setLoadingState({
                    loading: false,
                    message: "Flavours loaded"
                });

            } catch (err) {
                if (cancelled) return;

                console.error(err);
                setError(err);

                setLoadingState({
                    loading: false,
                    message: "Failed to load flavours"
                });
            }
        }

        loadFlavours();

        return () => {
            cancelled = true;
        };
    }, [supabase]);

    const setSelectedFlavour = (id) => {
        setSelectedFlavourId(id);

        if (id != null) {
            localStorage.setItem(
                "selectedFlavourId",
                String(id)
            );
        } else {
            localStorage.removeItem("selectedFlavourId");
        }
    };

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

        loading: loadingState.loading,
        loadingMessage: loadingState.message,
        error,

        flavourId: resolvedFlavour?.flavour_id ?? null,
        flavourCode: resolvedFlavour?.flavour_code ?? null,

        competitionId: resolvedFlavour?.competition_id ?? null,
        competitionCode: resolvedFlavour?.competition_code ?? null,

        formatId: resolvedFlavour?.format_id ?? null,
        formatCode: resolvedFlavour?.format_code ?? null,

        activeCampaignId:
            resolvedFlavour?.active_campaign_id ?? null,

        activeCampaignLabel:
            resolvedFlavour?.active_campaign_label ?? null,

        isGameweekFormat:
            resolvedFlavour?.format_code === "GWK",

        isPerFixtureFormat:
            resolvedFlavour?.format_code === "PFX",
    };

    return (
        <FlavourContext.Provider value={value}>
            {children}
        </FlavourContext.Provider>
    );
}