import { useCallback, useEffect, useRef, useState } from "react";
import { StageContext } from "../context/StageContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";

export default function StageProvider({ children }) {
    const { supabase } = useDatabase();
    const { refreshSignal } = useAuth();

    const [stages, setStages] = useState([]);

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading stages..."
    });

    const flavourId = 1;

    const cacheRef = useRef({});
    const requestRef = useRef(0);

    const refreshStages = useCallback(async () => {
        if (!flavourId) return;

        const cacheKey = `${flavourId}`;

        // serve cache instantly
        if (cacheRef.current[cacheKey]) {
            setStages(cacheRef.current[cacheKey]);
            setLoadingState({ loading: false, message: "" });
            return;
        }

        const requestId = ++requestRef.current;

        setLoadingState({
            loading: true,
            message: "Fetching stages..."
        });

        try {
            const { data, error } = await supabase
                .from("flavour_stages")
                .select("*")
                .eq("flavour_id", flavourId)
                .order("order_index");

            if (error) throw error;

            if (requestId !== requestRef.current) return;

            const result = data ?? [];

            cacheRef.current[cacheKey] = result;
            setStages(result);

        } catch (error) {
            console.error("Failed to load stages:", error);
        } finally {
            if (requestId === requestRef.current) {
                setLoadingState({
                    loading: false,
                    message: ""
                });
            }
        }
    }, [supabase]);
    
    // initial load
    useEffect(() => {
        refreshStages();
    }, [refreshStages]);
    
    useEffect(() => {
        if (!refreshSignal) return;

        cacheRef.current = {};
        
        refreshStages();
    }, [refreshSignal, refreshStages]);



    const value = {
        stages,
        stagesLoading: loadingState.loading,
        stagesLoadingMessage: loadingState.message,
        refreshStages
    };

    return (
        <StageContext.Provider value={value}>
            {children}
        </StageContext.Provider>
    );
}