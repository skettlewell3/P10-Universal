import { useClubs } from "../../hooks/useClubs";
import { useNavigate } from "react-router-dom";

export default function UserClubList() {

    const { clubs } = useClubs();
    const navigate = useNavigate();


    return (
        <section className="accountCard">

            <h2>
                My Clubs
            </h2>


            {clubs.map(club => (

                <button
                    key={club.profile_id}
                    onClick={() =>
                        navigate(
                            `/clubhouse/${club.profile_id}`
                        )
                    }
                >
                    {club.club_name}
                </button>

            ))}

        </section>
    );
}