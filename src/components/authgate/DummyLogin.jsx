export default function DummyLogIn({ onLogIn }) {
    const handleLogInClick = () => {
        onLogIn();
    }

    return (
        <div id="logInContainer">
            <img src="/assets/logos/FullLogo_Transparent_NoBuffer.png" alt="logo" />
            
            <input
                placeholder="Enter your name"
            />
            <input
                placeholder="Enter your PIN"
            />
            <button onClick={handleLogInClick}>Log in</button>
        </div>
    )
}