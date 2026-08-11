import { useState } from "react";
import { useTeams } from "../../hooks/useTeams";

export default function TeamComparisonSelector({ onSelect }) {
    const { availableTeams, teamsLoading } = useTeams();

    const [team1, setTeam1] = useState("");
    const [team2, setTeam2] = useState("");

    const handleSearch = () => {
        if (!team1 || !team2) return;

        onSelect(
            Number(team1),
            Number(team2)
        );
    };

    return (
        <div className="teamComparisonSelector">
            <select
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
            >
                <option value="">Select Team 1</option>

                {availableTeams
                    .filter(team => team.value !== Number(team2))
                    .map(team => (
                        <option
                            key={team.value}
                            value={team.value}
                        >
                            {team.shortCode}
                        </option>
                    ))
                }
            </select>

            <button
                onClick={handleSearch}
                disabled={
                    teamsLoading ||
                    !team1 ||
                    !team2
                }
                className="compareButton"
            >
                GO
            </button>

            <select
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
            >
                <option value="">Select Team 2</option>

                {availableTeams
                    .filter(team => team.value !== Number(team1))
                    .map(team => (
                        <option
                            key={team.value}
                            value={team.value}
                        >
                            {team.shortCode}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}