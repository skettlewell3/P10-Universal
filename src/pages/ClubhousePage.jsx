import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClubs } from "../hooks/useClubs";
import { useFlavour } from "../hooks/useFlavour";
import { useClubLeaderboard } from "../hooks/useClubLeaderboard";
import ContentBanner from "../components/app/ContentBanner";
import ClubMembersList from "../components/clubs/ClubMembersList";
import LeagueTableCard from "../components/tables/leagueTables/LeagueTableCard";
import LeaderboardHeader from "../components/leaderboard/LeaderboardHeader";
import LeaderboardRow from "../components/leaderboard/LeaderboardRow";

export default function ClubhousePage() {

    const { clubId } = useParams();
    const { isGameweekFormat, flavourId } = useFlavour();
    const { 
        clubLeaderboard,
        fetchClubLeaderboard,
    } = useClubLeaderboard();

    const {
        myMemberships,
        clubs
    } = useClubs();

    const club = myMemberships.find(
        club => club.club_id === clubId
    );    

    useEffect(() => {
        if (!clubId || !flavourId) return;

        fetchClubLeaderboard(
            clubId,
            flavourId
        );
    }, [clubId, flavourId, fetchClubLeaderboard]);

    const hasLeaderboard = clubLeaderboard.length > 0;

    const canManageClub =
        ["owner", "captain"].includes(club?.club_role)
    ;
    const isOwner = club?.club_role === "owner";

    const clubMates = clubs.filter(
        clubMates => clubMates.club_id === clubId 
    );

    return (
        <div className="pageShell">

            <ContentBanner title={club?.club_name ?? "Clubhouse"}/>

            <div className="scrollArea dashboardScroll">

                {hasLeaderboard && (
                    <div className="clubLeaderboardContainer">
                    <LeaderboardHeader />
                        {clubLeaderboard.map(row => (
                            <LeaderboardRow 
                              key={row.profile_id}
                              row={row}
                            />
                        ))}
                    </div>
                )}

                {club && (
                    <ClubMembersList 
                        clubId={club.club_id}
                        clubMates={clubMates} 
                        canManageClub={canManageClub}
                        canManageRoles={isOwner}
                    />
                )}

                {isGameweekFormat && (
                    <LeagueTableCard
                        profileId={clubId}
                        defaultView="predicted"
                    />
                )}

            </div>
        </div>
    );
}