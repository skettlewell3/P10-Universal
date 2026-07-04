import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GameweeksContext } from "../context/GameweeksContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";
import { useFlavour } from "../hooks/useFlavour";

export default function GameweeksProvider({ children }) {
    const { supabase } = useDatabase();
    const { refreshSignal } = useAuth();
    const { flavourId } = useFlavour();

    const [gameweeks, setGameweeks] = useState([]);

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading gameweeks..."
    });

    const cacheRef = useRef({});
    const requestRef = useRef(0);

    const refreshGameweeks = useCallback(async () => {
        if (!flavourId) return;

        const cacheKey = `${flavourId}`;

        if (cacheRef.current[cacheKey]) {
            setGameweeks(cacheRef.current[cacheKey]);
            setLoadingState({ loading: false, message: "" });
            return;
        }

        const requestId = ++requestRef.current;

        setLoadingState({
            loading: true,
            message: "Fetching gameweeks..."
        });

        try {
            const { data, error } = await supabase
                .from("flavour_gameweeks")
                .select("*")
                .eq("flavour_id", flavourId)
                .order("gameweek_number");

            if (error) throw error;

            if (requestId !== requestRef.current) return;

            const result = data ?? [];

            cacheRef.current[cacheKey] = result;
            setGameweeks(result);

        } catch (error) {
            console.error("Failed to load gameweeks:", error);
        } finally {
            if (requestId === requestRef.current) {
                setLoadingState({
                    loading: false,
                    message: ""
                });
            }
        }
    }, [supabase, flavourId]);

    useEffect(() => {
        refreshGameweeks();
    }, [refreshGameweeks]);

    useEffect(() => {
        if (!refreshSignal) return;

        cacheRef.current = {};
        refreshGameweeks();
    }, [refreshSignal, refreshGameweeks]);

    useEffect(() => {
        if (!flavourId) return;

        const channel = supabase
            .channel(`flavour-gameweeks-${flavourId}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "gameweeks"
                },
                () => {
                    cacheRef.current = {};
                    refreshGameweeks();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, flavourId, refreshGameweeks]);

    /* -----------------------------
        DERIVED STATE
    ------------------------------*/

    const activeGameweek = useMemo(
        () => gameweeks.find(gw => gw.gameweek_status === "live") ?? null,
        [gameweeks]
    );

    const activeGameweekId = activeGameweek?.gameweek_id ?? null;

    const nextGameweek = useMemo(() => {
        const idx = gameweeks.findIndex(gw => gw.gameweek_status === "live");
        return idx >= 0 ? gameweeks[idx + 1] ?? null : null;
    }, [gameweeks]);

    const selectableGameweeks = useMemo(() => {
        return gameweeks.map(gw => ({
            value: gw.gameweek_id,
            label: `GW${gw.gameweek_number}`,
            status: gw.gameweek_status
        }));
    }, [gameweeks]);

    return (
        <GameweeksContext.Provider
            value={{
                gameweeks,
                gameweeksLoading: loadingState.loading,
                gameweeksLoadingMessage: loadingState.message,

                activeGameweek,
                activeGameweekId,
                nextGameweek,

                selectableGameweeks,

                refreshGameweeks
            }}
        >
            {children}
        </GameweeksContext.Provider>
    );
}