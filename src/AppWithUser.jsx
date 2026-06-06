import AppContainer from "./components/app/AppContainer";
import DashboardContainer from "./components/Dashboard/DashboardContainer";
import HeaderProfile from "./components/Header/HeaderProfile";
import AppRouter from "./components/app/AppRouter";

export default function AppWithUser({ profile, onLogOut }) {
    return (
        <AppContainer>
            <HeaderProfile 
                profile={profile} 
                onLogOut={onLogOut}
            />
            {/* <DashboardContainer /> */}

            <AppRouter />
            
        </AppContainer>
    )
}