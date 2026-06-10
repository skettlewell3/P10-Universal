import { useAuth } from "../../hooks/useAuth";
import { useProfile } from "../../hooks/useProfile";

import SplashScreen from "./SplashScreen";

export default function AppLoadingGate({ children }) {
  const { loading: authLoading } = useAuth();
  const { loading: profileLoading } = useProfile();

  const states = [
    authLoading && {
      message: "Checking session..."
    },

    profileLoading && {
      message: "Loading profile..."
    },
   
  ].filter(Boolean);

  if (states.length > 0) {
    return <SplashScreen message={states[0].message} />;
  }

  return children;
}