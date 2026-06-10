import AppContainer from "./components/app/AppContainer";
import HeaderProfile from "./components/Header/HeaderProfile";
import AppRouter from "./components/app/AppRouter";
import GameDataProvider from "./providers/GameDataProvider";
import { useProfile } from "./hooks/useProfile";

export default function AppWithUser() {
    const { profile } = useProfile();

    return (
        <AppContainer>
            <HeaderProfile 
                profile={profile} 
            />

            <GameDataProvider>

                <div className="appContent">                                        
                    <AppRouter />
                </div>

                

            </GameDataProvider>
                
        </AppContainer>
    )
}