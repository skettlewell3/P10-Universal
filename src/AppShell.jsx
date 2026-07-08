import { useEffect } from "react";
// import { useProfile } from "./hooks/useProfile";
import { useFlavour } from "./hooks/useFlavour";
import AppContainer from "./components/app/AppContainer";
// import HeaderProfile from "./components/Header/HeaderProfile";
import AppRouter from "./components/app/AppRouter";
import GameDataProvider from "./providers/GameDataProvider";
import ShellHeader from "./components/Header/ShellHeader";

export default function AppWithUser() {
    // const { profile } = useProfile();

    const { resolvedFlavour } = useFlavour();

    useEffect(() => {
        document.title = `Perfect10: ${resolvedFlavour?.flavour_name ?? "Loading..."}`;
    }, [resolvedFlavour]);

    return (
        <AppContainer>
            <GameDataProvider>

                {/* <HeaderProfile 
                    profile={profile} 
                /> */}

                <ShellHeader 
                    // profile={profile}
                />

                <div className="appContent">                                        
                    <AppRouter />
                </div>    

            </GameDataProvider>                
        </AppContainer>
    )
}