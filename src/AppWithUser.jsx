import AppContainer from "./components/app/AppContainer";
import HeaderProfile from "./components/Header/HeaderProfile";
import AppRouter from "./components/app/AppRouter";
import GameDataProvider from "./providers/GameDataProvider";
import { useAuth } from "./hooks/useAuth";

export default function AppWithUser() {
    const { profile } = useAuth();

    return (
        <GameDataProvider>
            <AppContainer>
                <HeaderProfile 
                    profile={profile} 
                />

                <div className="appContent">                    
                    <AppRouter />
                </div>

                
            </AppContainer>
        </GameDataProvider>
    )
}