import AppContainer from "./components/app/AppContainer";
import HeaderProfile from "./components/Header/HeaderProfile";
import AppRouter from "./components/app/AppRouter";
import GameDataProvider from "./providers/GameDataProvider";

export default function AppWithUser({ profile }) {
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