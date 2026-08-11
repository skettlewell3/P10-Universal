import { useEffect, useState } from "react";
import { useTeamComparison } from "../../hooks/useTeamComparison";
import TeamComparisonCore from "../teamComparison/TeamComparisonCore";
import TeamComparisonSelector from "../teamComparison/TeamComparisonSelector";

export default function TeamComparison({ teamsFromFixture }) {
    const {
        fetchTeamComparison,
        comparisons,
        loading,
        loadingMessage
    } = useTeamComparison();

    const [selectedTeams, setSelectedTeams] = useState(null);

    const activeTeams = teamsFromFixture || selectedTeams;

    const comparisonKey = activeTeams?.team1 && activeTeams?.team2
        ? `${activeTeams.team1}-${activeTeams.team2}`
        : null;

    const currentData = comparisonKey
        ? comparisons[comparisonKey]
        : null;

    useEffect(() => {
        if (!activeTeams?.team1 || !activeTeams?.team2) return;

        fetchTeamComparison(
            activeTeams.team1,
            activeTeams.team2
        );
    }, [
        activeTeams?.team1,
        activeTeams?.team2,
        fetchTeamComparison
    ]);

    const handleCompareTeams = (team1, team2) => {
        setSelectedTeams({
            team1,
            team2
        });
    };

    return (
        <div className="teamComparisonContainer statsSection">
            <div className="statsSectionTitle text-right">
                RESULTS COMPARISON
            </div>

            {!teamsFromFixture && (
                <TeamComparisonSelector
                    onSelect={handleCompareTeams}
                />
            )}

            {loading && (
                <p>{loadingMessage}</p>
            )}

            {currentData && (
                <TeamComparisonCore
                    data={currentData}
                    teams={activeTeams}
                />
            )}
        </div>
    );
}