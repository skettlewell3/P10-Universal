import {
    useCallback,
    useEffect,
    useRef,
    useState,
    useMemo,
} from "react";

import { TeamsContext } from "../context/TeamsContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";
import { TEAM_GROUPS_MAP } from "../config";
import { useFlavour } from "../hooks/useFlavour";

export default function TeamsProvider({ children }) {
    const { supabase } = useDatabase();
    const { refreshSignal } = useAuth();
    const { flavourId } = useFlavour();

    const [teams, setTeams] = useState([]);

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading teams...",
    });

    const cacheRef = useRef({});
    const requestRef = useRef(0);

    const refreshTeams = useCallback(async () => {
        if (!flavourId) return;

        const cacheKey = `flavour_teams_${flavourId}`;

        // serve cache instantly if available
        if (cacheRef.current[cacheKey]) {
            setTeams(cacheRef.current[cacheKey]);
            setLoadingState({ loading: false, message: "" });
            return;
        }

        const requestId = ++requestRef.current;

        setLoadingState({
            loading: true,
            message: "Fetching teams...",
        });

        try {
            const { data, error } = await supabase
                .from("flavour_teams")
                .select("*")
                .eq("flavour_id", flavourId);

            if (error) throw error;

            if (requestId !== requestRef.current) return;

            const result = data ?? [];

            cacheRef.current[cacheKey] = result;
            setTeams(result);
        } catch (error) {
            console.error("Failed to load teams:", error);
        } finally {
            if (requestId === requestRef.current) {
                setLoadingState({
                    loading: false,
                    message: "",
                });
            }
        }
    }, [supabase, flavourId]);

    // initial load
    useEffect(() => {
        refreshTeams();
    }, [refreshTeams]);

    // refresh on auth-driven signal (same pattern as StageProvider)
    useEffect(() => {
        if (!refreshSignal) return;

        cacheRef.current = {};
        refreshTeams();
    }, [refreshSignal, refreshTeams]);

    // Temp join groups to teams
    const teamsWithGroups = useMemo(() => {
        return teams.map(team => ({
            ...team,
            group_letter: TEAM_GROUPS_MAP[team.team_id] ?? null,
        }));
    }, [teams]);

    /**
     * Active teams list (already flavour-scoped from DB)
     */
    const activeTeams = useMemo(() => teams, [teams]);


    /**
     * Dropdown-ready options (dumb UI consumption)
     */
    const availableTeams = useMemo(() => {
        return [...teamsWithGroups]
            .sort((a, b) =>
                a.team_name.localeCompare(b.team_name.toLowerCase())
            )
            .map(team => ({
            value: team.team_id,
            label: team.team_name,
            shortCode: team.short_code,
            groupLetter: team.group_letter
        }));
    }, [teamsWithGroups]);

    /**
     * Fast lookup map (for chips + rendering)
     */
    const teamsMap = useMemo(() => {
        const map = {};

        for (const team of teams) {
            map[team.team_id] = team;
        }

        return map;
    }, [teams]);

    const value = {
        teams,
        activeTeams,
        availableTeams,
        teamsMap,

        teamsLoading: loadingState.loading,
        teamsLoadingMessage: loadingState.message,

        refreshTeams,
    };

    return (
        <TeamsContext.Provider value={value}>
            {children}
        </TeamsContext.Provider>
    );
}