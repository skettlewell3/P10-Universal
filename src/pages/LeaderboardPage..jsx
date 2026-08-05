import ContentBanner from "../components/app/ContentBanner";
import LeaderboardFilters from "../components/leaderboard/LeaderboardFilters";
import LeaderboardHeader from "../components/leaderboard/LeaderboardHeader";
import LeaderboardRow from "../components/leaderboard/LeaderboardRow";
import { useLeaderboard } from "../hooks/useLeaderboard";

export default function LeaderboardPage() {
    const {
        leaderboard, 
        scopeType, 
        scopeId, 
        setScopeType, 
        setScopeId,
        population,
        setPopulation
    } = useLeaderboard();

    return (
        <div className="pageShell">
            <ContentBanner/>
            
            <LeaderboardFilters
                scopeType={scopeType}
                setScopeType={setScopeType}
                scopeId={scopeId}
                setScopeId={setScopeId}
                population={population}
                setPopulation={setPopulation}
            />

            <LeaderboardHeader />

            <div className="scrollArea boardList">
              {leaderboard.map(row => (
                <LeaderboardRow 
                    key={row.profile_id}
                    row={row}
                />
              ))}
            </div>    
        </div>
    )
}