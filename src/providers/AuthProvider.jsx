import { useEffect, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { AuthContext } from "../context/AuthContext";

export function AuthProvider({ children }) {
  const { supabase } = useDatabase();

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingState, setLoadingState] = useState({
    loading: true,
    message: "Auth Loading..."
  });

  useEffect(() => {
    console.log("INIT AUTH START");

    supabase.auth.getSession().then(({ data }) => {
      const sessionData = data.session;

      setSession(sessionData);
      setUser(sessionData?.user ?? null);

      setLoadingState({
        loading: true,
        message: "Fetching session..."
      });

      console.log("INIT AUTH FINISHED");
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {

        console.log("AUTH EVENT:", _event);

        setSession(session);
        setUser(session?.user ?? null);
      });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      loadingState,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}