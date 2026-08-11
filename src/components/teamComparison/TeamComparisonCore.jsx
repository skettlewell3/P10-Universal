import { useState } from "react";
import TeamComparisonRow from "./TeamComparisonRow";
import TeamComparisonToggle from "./TeamComparisonToggle";
import TeamComparisonHeader from "./TeamComparisonHeader";
import TeamComparisonSummary from "./TeamComparisonSummary";

export default function TeamComparisonCore({ data, teams }) {
    const [comparisonMode, setComparisonMode] = useState("generic");

    if (!data || !data.length) {
        return <p>No data available</p>;
    }

    return (
        <div className="teamComparisonCore">
            <TeamComparisonToggle
                comparisonMode={comparisonMode}
                setComparisonMode={setComparisonMode}
            />

            <div className="comparisonGrid">

                <TeamComparisonSummary
                    data={data}
                    comparisonMode={comparisonMode}
                />

                <TeamComparisonHeader
                    comparisonMode={comparisonMode}
                    teams={teams}
                />

                {data.map((row) => (
                    <TeamComparisonRow
                        key={row.opponent_id}
                        rowData={row}
                        viewMode={comparisonMode}
                        teams={teams}
                    />
                ))}
            </div>
        </div>
    );
}