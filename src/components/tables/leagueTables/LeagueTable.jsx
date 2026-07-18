import LeagueTableRow from "./LeagueTableRow";

export default function LeagueTable({ data }) {

    return (
        <div className="leagueTableScroll">
            <table className="leagueTable">
                <colgroup>
                    <col className="posCol" />
                    <col className="teamCol" />
                    <col className="statCol" />
                    <col className="statCol" />
                    <col className="statCol" />
                    <col className="statCol" />
                    <col className="statCol" />
                    <col className="statCol" />
                    <col className="statCol" />
                    <col className="statCol" />
                </colgroup>
                
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>MP</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>Pts</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(row => (
                        <LeagueTableRow
                            key={`${row.group_letter ?? "league"}-${row.team_id}`}
                            row={row}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}