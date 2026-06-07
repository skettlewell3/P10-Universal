export default function SplashScreen({ message }) {
    return (
        <div id="splashScreen">
            <div id="splashScreenContent">
                
                {/* animation / svg / lottie goes here */}
                <div id="splashScreenAnimation">
                    {/* placeholder for now */}
                    <div className="spinner" />
                </div>

                {/* message */}
                <div id="splashScreenMessage">
                    {message}
                </div>

            </div>
        </div>
    );
}