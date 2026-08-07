import { Link } from "react-router-dom";

export default function OwnedClubSummaryCard({ club }) {

    return (
        <div className="myClub">
            <p>
                Club Name
            </p>

            <strong className="clubDetails">
                {club.club_name}
            </strong>

            {club.club_code && (
                <>
                    <p>
                        Club Code
                    </p>

                    <strong className="clubDetails">
                        {club.club_code}
                    </strong>
                </>
            )}

            <p>
                Status
            </p>
            
            <strong className="clubDetails">
                {club.is_active ? "Active" : "Inactive"}
            </strong>

            {!club.is_active && (
                <p>
                    Add members to activate your club.
                </p>
            )}

            <Link
                className="manageClubLink"
                to={`/clubhouse/${club.club_id}`}
            >
                Manage Club
            </Link>
        
        </div>
    );
}