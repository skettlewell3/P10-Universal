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

      const { data, error } = await supabase.rpc("get_user_profile", {
        p_auth_id: authId,
      });

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

  // 1. Fetch profile when user appears/changes
  useEffect(() => {
    if (!user?.id) return;

    fetchProfile(user.id);
  }, [user?.id, fetchProfile]);

  // 2. Clear profile when user logs out
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
        refetch: () => fetchProfile(user?.id),
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}