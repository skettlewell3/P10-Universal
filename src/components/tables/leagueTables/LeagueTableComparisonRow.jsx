export default function LeagueComparisonRow({ row }) {

    return (
        <div className="leagueComparisonRow">

            <span>
                {row.pos}
            </span>

            <span>
                {row.short_code ?? row.team_name}
            </span>

            <span>
                {row.played}
            </span>

            <span>
                {row.points}
            </span>

        </div>
    );
}