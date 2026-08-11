import { useActualTables } from "../../hooks/useActualTables";
import LeagueTable from "../tables/leagueTables/LeagueTable";

export default function MMTableSnapshot({ team1Id, team2Id }) {
    const { actualTable, actualTablesLoading } = useActualTables();

    if (actualTablesLoading) return null;

    const dataSet= actualTable.filter(
        row => row.team_id === team1Id || row.team_id === team2Id
    )

    const sorted = [...dataSet].sort((a, b) => a.pos - b.pos);

    return (
        <div className="statsSection">
            <div className="statsSectionTitle">
                Form
            </div>

            <LeagueTable data={sorted} />
        </div>
    )
}