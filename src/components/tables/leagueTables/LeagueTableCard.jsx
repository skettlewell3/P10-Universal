import { useState, useEffect } from "react";
import { useActualTables } from "../../../hooks/useActualTables";
import { usePredictedTables } from "../../../hooks/usePredictedTables";
import LeagueTableTabs from "./LeagueTableTabs";
import LeagueTable from "./LeagueTable";
import LeagueTableComparison from "./LeagueTableComparison";

export default function LeagueTableCard({ profileId, defaultView }) {
    const [view, setView] = useState(defaultView);

    const { actualTable } = useActualTables();
    const { getPredictedTable, loadPredictedTable } = usePredictedTables();

    useEffect(() => {
        if (!profileId) return;

        loadPredictedTable(profileId, true);
    }, [profileId, loadPredictedTable]);

    const predictedTable = getPredictedTable(profileId);

    return (
        <section className="appCard leagueTableCard">
            <h2>League Tables</h2>
            <LeagueTableTabs 
                view={view}
                setView={setView}
            />

            {view === "actual" &&
                <LeagueTable data={actualTable}/>
            }

            {view === "predicted" &&
                <LeagueTable data={predictedTable}/>
            }

            {view === "comparison" &&
                <LeagueTableComparison
                    actual={actualTable}
                    predicted={predictedTable}
                />
            }

        </section>    
    )
}