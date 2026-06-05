import AppContainer from "./components/app/AppContainer";
import HeaderProfile from "./components/Header/HeaderProfile";

export default function AppWithUser({ profile, onLogOut }) {
    return (
        <AppContainer>
            <HeaderProfile 
                profile={profile} 
                onLogOut={onLogOut}
            />
            
        </AppContainer>
    )
}