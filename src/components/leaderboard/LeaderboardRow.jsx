export default function LeaderboardRow({row}) {
    return (
        <div className={`leaderboardRow leaderboardLayout ${row.profile_type}`}>

            <div className="rank">{row.rank}</div>
            <div className={`displayName leaderboard ${
                row.display_name.length > 15 ? "longName" : ""
            }`}>
                {row.display_name}
            </div>
            <div className=" ">{row.predicted}</div>
            <div className="focus double">

                <div className="">{row.points_total}</div>
                <div className="">{row.perfect_10s}</div>

            </div>
            <div className=" ">{row.correct_results}</div>
            <div className=" ">{row.correct_home_goals}</div>
            <div className=" ">{row.correct_away_goals}</div>
            <div className=" ">{row.correct_goal_difference}</div>
            <div className="">{row.correct_total_goals}</div>

        </div>
    )
}