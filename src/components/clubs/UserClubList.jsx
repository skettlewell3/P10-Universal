import { useClubs } from "../../hooks/useClubs";
import { useNavigate } from "react-router-dom";

export default function UserClubList() {

    const { myMemberships } = useClubs();
    const navigate = useNavigate();


    return (
        <section className="accountCard">

            <h2>
                My Clubs
            </h2>


            {myMemberships.map(m => (

                <button
                    key={m.club_id}
                    onClick={() =>
                        navigate(
                            `/clubhouse/${m.club_id}`
                        )
                    }
                >
                    {m.club_name}
                </button>

            ))}

        </section>
    );
}