import { useState, useEffect, useCallback } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { useDatabase } from "../hooks/useDatabase";
import { useAuth } from "../hooks/useAuth";

export function ProfileProvider({ children }) {
  const { supabase } = useDatabase();
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);

  const [loadingState, setLoadingState] = useState({
    loading: true,
    message: "Loading Profile"
  });

  const fetchProfile = useCallback(
    async (authId) => {
      if (!authId) return;

      setLoadingState({
        loading: true,
        message: "Fetching Profile..."
      });

      const { data, error } = await supabase.rpc(
        "get_user_profile",
        {
          p_auth_id: authId,
        }
      );

      if (error) {
        console.error(error);

        setProfile(null);

        setLoadingState({
          loading: false,
          message: "Failed to load Profile"
        });
        return;
      }

      setProfile(data?.[0] ?? null);

      setLoadingState({
        loading: false,
        message: "Profile found..."
      });

    },
    [supabase]
  );

  const updateDisplayName = useCallback(
    async (displayName) => {

      const { data, error } = await supabase.rpc(
        "update_user_display_name",
        {
          p_display_name: displayName
        }
      );

      console.log("UPDATE USER PROFILE:", {
          data,
          error
      });

      if (error) {
        console.error(error);
        return {
          success: false,
          error
        };
      }

      await fetchProfile(user.id);

      return {
        success: true
      };

    },
    [supabase, fetchProfile, user]
  );

  const createClub = useCallback(
    async ({
      clubName,
      clubCode = null,
      clubColour = null
    }) => {

      const { data, error } = await supabase.rpc(
        "create_club_profile",
        {
          p_club_name: clubName,
          p_club_code: clubCode,
          p_club_colour: clubColour
        }
      );

      if (error) {
        console.error(error);

        return {
          success: false,
          error
        };
      }

      await fetchProfile(user.id);

      return {
        success: true,
        clubId: data
      };
    },
    [supabase, fetchProfile, user]
  );

  useEffect(() => {
    if (!user?.id) return;
    fetchProfile(user.id);
  }, [user?.id, fetchProfile]);

  useEffect(() => {
    if (user?.id) return;
    setProfile(null);
    setLoadingState({
      loading: false,
      message: "Thanks for Playing!"
    });
  }, [user?.id]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loadingState,

        updateDisplayName,
        createClub,

        refetch: () => fetchProfile(user?.id),
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}