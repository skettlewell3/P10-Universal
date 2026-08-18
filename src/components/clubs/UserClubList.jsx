import { useMemo, useState } from "react";
import { useClubs } from "../../hooks/useClubs";
import { useLeaderboard } from "../../hooks/useLeaderboard";
import { Link } from "react-router-dom";
import RemoveIcon from "../app/RemoveIcon";

export default function UserClubList() {

    const {
        myMemberships,
        leaveClub
    } = useClubs();

    const { leaderboard } = useLeaderboard();

    const [editing, setEditing] = useState(false);

    const leaderboardByClub = useMemo(() => {
        return new Map(
            leaderboard
                .filter(row => row.profile_type === "club")
                .map(row => [row.profile_id, row])
        );
    }, [leaderboard]);

    const handleLeaveClub = async (clubId) => {

        const confirmed = window.confirm(
            "Are you sure you want to leave this club?"
        );

        if (!confirmed) return;

        const { error } = await leaveClub(clubId);

        if (error) {
            console.error(error);
        }
    };

    return (
        <section className="accountCard">
            <div className="cardHeader">
                <h2>My Clubs</h2>

                {myMemberships.length > 0 && (
                    <button
                        className="textButton"
                        onClick={() => setEditing(!editing)}
                    >
                        {editing ? "Done" : "Manage Clubs"}
                    </button>
                )}
            </div>

            <div className="clubList">

                {myMemberships.map(club => {

                    const ranking =
                        leaderboardByClub.get(club.club_id);

                    const isOwner =
                        club.club_role === "owner";

                    return (
                        <div
                            key={club.club_id}
                            className="clubListRow"
                        >
                            <Link
                                to={`/clubhouse/${club.club_id}`}
                                className="clubListLink"
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

                            {editing && !isOwner && (
                                <button
                                    className="iconButton redBG"
                                    onClick={() => handleLeaveClub(club.club_id)}
                                    title="Leave club"
                                >
                                    <RemoveIcon />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}