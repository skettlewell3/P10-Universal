import { useState, useEffect, useCallback, useMemo } from "react";
import { ClubsContext } from "../context/ClubsContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";

export function ClubsProvider({ children }) {

    const { supabase } = useDatabase();
    const { user } = useAuth();
    const { profile } = useProfile();

    const [clubs, setClubs] = useState([]);
    const [invites, setInvites] = useState([]);
    const [ownershipTransferRequests, setOwnershipTransferRequests] = useState([]);

    const [loadingState, setLoadingState] = useState({
        loading: true,
        message: "Loading Clubs..."
    });

    const fetchClubs = useCallback(async () => {

        if (!user?.id || !profile?.profile_id) {
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

    }, [supabase, user?.id, profile?.profile_id]);

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

    const fetchOwnershipTransferRequests = useCallback(async () => {
        if (!user?.id || !profile?.profile_id) {
            setOwnershipTransferRequests([]);
            return;
        }
        const { data, error } = await supabase.rpc(
            "get_my_club_ownership_transfer_requests"
        );
        if (error) {
            console.error(error);
            setOwnershipTransferRequests([]);
            return;
        }
        setOwnershipTransferRequests(data ?? []);
    }, [supabase, user?.id, profile?.profile_id]);

    const refreshClubs = useCallback(async () => {

        setLoadingState({
            loading: true,
            message: "Refreshing Clubs..."
        });

        await Promise.all([
            fetchClubs(),
            fetchInvites(),
            fetchOwnershipTransferRequests()
        ]);

        setLoadingState({
            loading: false,
            message: "Clubs loaded"
        });

    }, [fetchClubs, fetchInvites, fetchOwnershipTransferRequests]);

    useEffect(() => {
        refreshClubs();
    }, [refreshClubs]);

    const myMemberships = useMemo(() => {

        if (!profile) return [];

        return clubs.filter(
            club =>
                club.member_profile_id === profile.profile_id
        );

    }, [clubs, profile]);


    const myClubIds = useMemo(() => {
        return new Set(
            myMemberships.map(
                membership => membership.club_id
            )
        );
    }, [myMemberships]);


    const ownedClub = useMemo(() => {
        return myMemberships.find(
            club => club.club_role === "owner"
        ) ?? null;
    }, [myMemberships]);


    useEffect(() => {
        if (!user?.id || !profile?.profile_id) {
            return;
        }

        const channel = supabase
            .channel(`clubs-${profile.profile_id}`)

            // membership changes inside my clubs
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "club_memberships"
                },
                payload => {

                    const clubId =
                        payload.new?.club_id ??
                        payload.old?.club_id;


                    if (
                        clubId &&
                        myClubIds.has(clubId)
                    ) {
                        refreshClubs();
                    }

                }
            )

            // club profile changes inside my clubs
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "club_profiles"
                },
                payload => {

                    const clubId =
                        payload.new?.profile_id ??
                        payload.old?.profile_id;


                    if (
                        clubId &&
                        myClubIds.has(clubId)
                    ) {
                        refreshClubs();
                    }

                }
            )

            // invites belong directly to the user
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "club_invites",
                    filter: `recipient_profile_id=eq.${profile.profile_id}`
                },
                () => {
                    fetchInvites();
                }
            )

            // ownership transfer requests involving the current user
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "club_ownership_transfer_requests"
                },
                payload => {
                
                    const request =
                        payload.new ?? payload.old;
                
                    if (
                        request?.target_profile_id === profile.profile_id ||
                        request?.owner_profile_id === profile.profile_id
                    ) {
                        fetchOwnershipTransferRequests();
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };

    }, [
        supabase,
        user?.id,
        profile?.profile_id,
        myClubIds,
        refreshClubs,
        fetchInvites,
        fetchOwnershipTransferRequests
    ]);

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

    const changeMemberRole = async (
        clubId,
        memberProfileId,
        newRole
    ) => {
        const { error } = await supabase.rpc(
            "change_club_member_role",
            {
                p_club_id: clubId,
                p_member_profile_id: memberProfileId,
                p_new_role: newRole
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

    const leaveClub = async (clubId) => {
        const { error } = await supabase.rpc(
            "leave_club",
            {
                p_club_id: clubId
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

    const removeClubMember = async (
        clubId,
        memberProfileId
    ) => {

        const { error } = await supabase.rpc(
            "remove_club_member",
            {
                p_club_id: clubId,
                p_member_profile_id: memberProfileId
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

    const deleteClub = async (clubId) => {
        const { error } = await supabase.rpc(
            "delete_club",
            {
                p_club_id: clubId
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

    const requestClubOwnershipTransfer = async (
        clubId,
        targetProfileId
    ) => {
        const { error } = await supabase.rpc(
            "request_club_ownership_transfer",
            {
                p_club_id: clubId,
                p_target_profile_id: targetProfileId
            }
        );
        if (!error) {
            await fetchOwnershipTransferRequests();
        }
        return {
            success: !error,
            error
        };
    };

    const acceptClubOwnershipTransfer = async (requestId) => {
        const { error } = await supabase.rpc(
            "accept_club_ownership_transfer",
            {
                p_request_id: requestId
            }
        );
        if (!error) {            
            await refreshClubs()    
        }
        return {
            success: !error,
            error
        };
    };

    const declineClubOwnershipTransfer = async (requestId) => {
        const { error } = await supabase.rpc(
            "decline_club_ownership_transfer",
            {
                p_request_id: requestId
            }
        );
        if (!error) {
            await fetchOwnershipTransferRequests();
        }
        return {
            success: !error,
            error
        };
    };

    return (
        <ClubsContext.Provider
            value={{
                myMemberships,
                clubs,
                ownedClub,
                invites,
                loadingState,

                refreshClubs,
                fetchInvites,

                sendInvite,
                acceptInvite,
                declineInvite,

                changeMemberRole,
                leaveClub,
                deleteClub,
                removeClubMember,

                ownershipTransferRequests,
                fetchOwnershipTransferRequests,
                requestClubOwnershipTransfer,
                acceptClubOwnershipTransfer,
                declineClubOwnershipTransfer
            }}
        >
            {children}
        </ClubsContext.Provider>
    );
}