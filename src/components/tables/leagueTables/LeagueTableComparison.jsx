import LeagueTableComparisonRow from "./LeagueTableComparisonRow";

export default function LeagueTableComparison({
    actual,
    predicted
}) {

    return (
        <div className="leagueTableComparison">

            <div className="comparisonHeaders">
                <span>Predicted</span>
                <span>Actual</span>
            </div>

            <div className="comparisonColumns">

                <div className="comparisonColumn">
                    <div className="comparisonRowHeader">
                        <span>#</span>
                        <span>Team</span>
                        <span>MP</span>
                        <span>Pts</span>
                    </div>
                    {predicted.map(row => (
                        <LeagueTableComparisonRow
                            key={`predicted-${row.team_id}`}
                            row={row}
                        />
                    ))}
                </div>

                <div className="comparisonColumn">
                        <div className="comparisonRowHeader">
                            <span>#</span>
                            <span>Team</span>
                            <span>MP</span>
                            <span>Pts</span>
                        </div>
                    {actual.map(row => (
                        <LeagueTableComparisonRow
                            key={`actual-${row.team_id}`}
                            row={row}
                        />
                    ))}
                </div>

            </div>

        </div>
    );
}