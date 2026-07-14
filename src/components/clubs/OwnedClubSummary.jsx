export default function OwnedClubSummaryCard({ club }) {

    return (
        <>
            <p>
                Club Name
            </p>

            <strong>
                {club.club_name}
            </strong>

            {club.club_code && (
                <>
                    <p>
                        Club Code
                    </p>

                    <strong>
                        {club.club_code}
                    </strong>
                </>
            )}

            <p>
                Status
            </p>

            <strong>
                {club.is_active ? "Active" : "Inactive"}
            </strong>

            {!club.is_active && (
                <p>
                    Add members to activate your club.
                </p>
            )}

            <button>
                Manage Club
            </button>
        </>
    );
}