export default function FixtureLeaderboardToggle({
    showLeaderboard,
    setShowLeaderboard
}) {
    const handleClick = () => {
        setShowLeaderboard(prev => !prev);
    };

    return (
        <p
            className="leaderboardToggle"
            onClick={handleClick}
        >
            {showLeaderboard ? "Close leaderboard" : "Open leaderboard"}
        </p>
    );
}