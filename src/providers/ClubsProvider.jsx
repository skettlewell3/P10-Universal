import { useState, useEffect, useCallback } from "react";
import { ClubsContext } from "../context/ClubsContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";

export function ClubsProvider({ children }) {

    const { supabase } = useDatabase();
    const { user } = useAuth();
    
    const [clubs, setClubs] = useState([]);

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading Clubs..."
    });

    const fetchClubs = useCallback(
        async () => {

            if (!user?.id) {
                setClubs([]);

                setLoadingState({
                    loading: false,
                    message: "No user"
                });

                return;
            }

            setLoadingState({
                loading: true,
                message: "Fetching Clubs..."
            });

            const { data, error } = await supabase.rpc(
                "get_user_clubs"
            );

            if (error) {

                console.error(error);

                setClubs([]);

                setLoadingState({
                    loading: false,
                    message: "Failed to load clubs"
                });

                return;
            }

            setClubs(data ?? []);

            setLoadingState({
                loading: false,
                message: "Clubs loaded"
            });
        },
        [supabase, user?.id]
    );

    useEffect(() => {
        fetchClubs();
    }, [fetchClubs]);

    const ownedClub = clubs.find(
        club => club.club_role === "owner"
    ) ?? null;

    return (
        <ClubsContext.Provider
            value={{
                clubs,
                ownedClub,
                loadingState,
                refreshClubs: fetchClubs
            }}
        >
            {children}
        </ClubsContext.Provider>
    );
}