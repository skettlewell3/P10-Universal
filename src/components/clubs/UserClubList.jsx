import { useMemo } from "react";
import { useClubs } from "../../hooks/useClubs";
import { useLeaderboard } from "../../hooks/useLeaderboard";
import { Link } from "react-router-dom";

export default function UserClubList() {

    const { myMemberships } = useClubs();
    const { leaderboard } = useLeaderboard();

    const leaderboardByClub = useMemo(() => {
        return new Map(
            leaderboard
                .filter(row => row.profile_type === "club")
                .map(row => [row.profile_id, row])
        );
    }, [leaderboard]);

    return (
        <section className="accountCard">
            <h2>My Clubs</h2>

            <div className="clubList">
                {myMemberships.map(club => {
                    const ranking = leaderboardByClub.get(club.club_id);

                    return (
                        <Link
                            key={club.club_id}
                            to={`/clubhouse/${club.club_id}`}
                            className="clubListRow"
                        >
                            <div className="clubListMain">
                                <span className="clubName">
                                    {club.club_name}
                                </span>

                                <span className="clubRole">
                                    {club.club_role}
                                </span>
                            </div>

                            <div className="clubStats">
                                <span>
                                    Rank {ranking?.rank ?? "-"}
                                </span>

                                <span>
                                    Points {ranking?.points_total ?? "-"}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}