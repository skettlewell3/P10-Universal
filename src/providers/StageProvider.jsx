import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { StageContext } from "../context/StageContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";
import { useFlavour } from "../hooks/useFlavour";

export default function StageProvider({ children }) {
    const { supabase } = useDatabase();
    const { refreshSignal } = useAuth();
    const { flavourId } = useFlavour();

    const [stages, setStages] = useState([]);

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading stages..."
    });

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

            console.log("stages:", result)

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
    }, [supabase, flavourId]);
    
    // initial load
    useEffect(() => {
        refreshStages();
    }, [refreshStages]);
    
    useEffect(() => {
        if (!refreshSignal) return;

        cacheRef.current = {};
        
        refreshStages();
    }, [refreshSignal, refreshStages]);

    const activeStage = useMemo(
        () => stages.find(stage => stage.is_active) ?? null,
        [stages]
    );

    const activeStageId = activeStage?.stage_id ?? null;

    const leaderboardStages = useMemo(
        () =>
            stages.filter(
                stage => 
                    stage.is_active ||
                    stage.is_finished
            )
            .map(stage => ({
                value: stage.stage_id,
                label: stage.stage_name,
                labelShort: stage.stage_code,
            })),
        [stages]
    );

    const fixtureStages = useMemo(
        () =>
            stages.map(stage => ({
                value: stage.stage_id,
                label: stage.stage_name,
                labelShort: stage.stage_code,
            })),
        [stages]
    );

    useEffect(() => {
        const channel = supabase
            .channel(`flavour-stages-${flavourId}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "flavour_stages",
                    filter: `flavour_id=eq.${flavourId}`,
                },
                () => {
                    cacheRef.current = {};
                    refreshStages();
                }
            )
            .subscribe();
        
        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, flavourId, refreshStages]);

    const value = {
        stages,
        stagesLoading: loadingState.loading,
        stagesLoadingMessage: loadingState.message,
        activeStage,
        activeStageId,
        fixtureStages,
        leaderboardStages,

        refreshStages
    };

    

    return (
        <StageContext.Provider value={value}>
            {children}
        </StageContext.Provider>
    );
}