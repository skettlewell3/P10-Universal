import { useClubs } from "../../hooks/useClubs";
import { Link } from "react-router-dom";

export default function UserClubList() {

    const { myMemberships } = useClubs();

    return (
        <section className="accountCard">
            <h2>My Clubs</h2>

            <div className="clubList">
                {myMemberships.map(club => (
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
                                Rank -
                            </span>

                            <span>
                                Points -
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}