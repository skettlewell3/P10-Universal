import { useEffect, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { AuthContext } from "../context/AuthContext";

export function AuthProvider({ children }) {
  const { supabase } = useDatabase();

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (authUserId) => {
      if (!authUserId) return;

      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("auth_id", authUserId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setProfile(data);
    };

    const initialiseAuth = async () => {
      try {

        console.log("INIT AUTH START");

        const { data, error } = await supabase.auth.getSession();

        console.log("GET SESSION RESULT:", data?.session?.user?.id, error);

        if (error) {
          console.error(error);
        }

        const sessionData = data.session;

        setSession(sessionData);
        setUser(sessionData?.user ?? null);

        if (sessionData?.user?.id) {
          await fetchProfile(sessionData.user.id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initialiseAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {

        console.log("AUTH EVENT:", _event, session?.user?.id);

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user?.id) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}