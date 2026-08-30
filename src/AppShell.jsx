import { useEffect } from "react";
import { useFlavour } from "./hooks/useFlavour";
import AppContainer from "./components/app/AppContainer";
import AppRouter from "./components/app/AppRouter";
import GameDataProvider from "./providers/GameDataProvider";
import ShellHeader from "./components/Header/ShellHeader";

export default function AppWithUser() {
    const { resolvedFlavour } = useFlavour();

    useEffect(() => {
        document.title = `Perfect10: ${resolvedFlavour?.flavour_name ?? "Loading..."}`;
    }, [resolvedFlavour]);

    return (
        <AppContainer>
            <GameDataProvider>

                <ShellHeader/>

                <div className="appContent">                                        
                    <AppRouter />
                </div>    

            </GameDataProvider>                
        </AppContainer>
    )
}