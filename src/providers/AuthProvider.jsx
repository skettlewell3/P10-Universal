import { useEffect, useState, useRef } from "react";
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

  const lastActivityRef = useRef(0);
  const lastRefreshRef = useRef(0);

  const [refreshSignal, setRefreshSignal] = useState(0);

  useEffect(() => {
    console.log("INIT AUTH START");

    supabase.auth.getSession().then(({ data }) => {
      setLoadingState({
        loading: true,
        message: "Fetching session..."
      });

      const sessionData = data.session;

      setSession(sessionData);
      setUser(sessionData?.user ?? null);

      setLoadingState({
        loading: false,
        message: "Session fetched"
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

  useEffect(() => {
    const updateActivity = () => {
      lastActivityRef.current = Date.now();
      lastRefreshRef.current = Date.now();
    };

    const events = [
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "click"
    ];

    events.forEach(event =>
      window.addEventListener(event, updateActivity)
    );

    return () => {
      events.forEach(event =>
        window.removeEventListener(event, updateActivity)
      );
    };
  }, []);

  useEffect(() => {
    const STALE_AFTER = 5 * 60 * 1000;

    const handleResume = () => {
      if (document.visibilityState !== "visible") return;

      const now = Date.now();

      const stale =
        now - lastRefreshRef.current > STALE_AFTER;

      if (stale) {
        console.log("APP RESUMED -> REQUEST REFRESH");

        lastRefreshRef.current = now;

        setRefreshSignal(now);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleResume
    );

    window.addEventListener(
      "focus",
      handleResume
    );

    window.addEventListener(
      "online",
      handleResume
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleResume
      );

      window.removeEventListener(
        "focus",
        handleResume
      );

      window.removeEventListener(
        "online",
        handleResume
      );
    };
  }, []);

  useEffect(() => {
    const MAX_IDLE =
      72 * 60 * 60 * 1000;

    const interval = setInterval(async () => {
      const idleTime =
        Date.now() - lastActivityRef.current;

      if (idleTime > MAX_IDLE) {
        console.log("SESSION EXPIRED");

        await supabase.auth.signOut();
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [supabase]);

  return (
    <AuthContext.Provider value={{
      session,
      user,
      loadingState,
      signOut,

      refreshSignal
    }}>
      {children}
    </AuthContext.Provider>
  );
}