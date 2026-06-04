import AppContainer from "./components/app/AppContainer";
import HeaderProfile from "./components/Header/HeaderProfile";

export default function AppWithUser({ user, onLogOut }) {
    return (
        <AppContainer>
            <HeaderProfile 
                user={user} 
                onLogOut={onLogOut}
            />
        </AppContainer>
    )
}