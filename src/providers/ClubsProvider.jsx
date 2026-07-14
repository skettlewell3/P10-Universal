import { useState, useEffect, useCallback } from "react";
import { ClubsContext } from "../context/ClubsContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";

export function ClubsProvider({ children }) {

    const { supabase } = useDatabase();
    const { user } = useAuth();

    const [clubs, setClubs] = useState([]);
    const [invites, setInvites] = useState([]);

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading Clubs..."
    });


    const fetchClubs = useCallback(async () => {

        if (!user?.id) {
            setClubs([]);
            return;
        }

        const { data, error } = await supabase.rpc(
            "get_user_clubs"
        );

        if (error) {
            console.error(error);
            setClubs([]);
            return;
        }

        setClubs(data ?? []);

    }, [supabase, user?.id]);


    const fetchInvites = useCallback(async () => {

        if (!user?.id) {
            setInvites([]);
            return;
        }

        const { data, error } = await supabase.rpc(
            "get_my_club_invites"
        );

        if (error) {
            console.error(error);
            setInvites([]);
            return;
        }

        setInvites(data ?? []);

    }, [supabase, user?.id]);


    const refreshClubs = useCallback(async () => {

        setLoadingState({
            loading: true,
            message: "Refreshing Clubs..."
        });

        await Promise.all([
            fetchClubs(),
            fetchInvites()
        ]);

        setLoadingState({
            loading: false,
            message: "Clubs loaded"
        });

    }, [fetchClubs, fetchInvites]);


    useEffect(() => {

        refreshClubs();

    }, [refreshClubs]);


    const sendInvite = async (clubId, username) => {

        const { data, error } = await supabase.rpc(
            "send_club_invite",
            {
                p_club_id: clubId,
                p_username: username
            }
        );

        return {
            success: !error,
            data,
            error
        };
    };


    const acceptInvite = async (inviteId) => {

        const { error } = await supabase.rpc(
            "accept_club_invite",
            {
                p_invite_id: inviteId
            }
        );

        if (!error) {
            await refreshClubs();
        }

        return {
            success: !error,
            error
        };
    };


    const declineInvite = async (inviteId) => {

        const { error } = await supabase.rpc(
            "decline_club_invite",
            {
                p_invite_id: inviteId
            }
        );

        if (!error) {
            await fetchInvites();
        }

        return {
            success: !error,
            error
        };
    };


    const ownedClub = clubs.find(
        club => club.club_role === "owner"
    ) ?? null;


    return (
        <ClubsContext.Provider
            value={{
                clubs,
                ownedClub,
                invites,
                loadingState,

                refreshClubs,
                fetchInvites,

                sendInvite,
                acceptInvite,
                declineInvite
            }}
        >
            {children}
        </ClubsContext.Provider>
    );
}