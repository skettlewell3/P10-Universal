import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { useClubs } from "../../hooks/useClubs";

export default function CreateClubForm() {

    const { createClub } = useProfile();
    const { refreshClubs } = useClubs();

    const [clubName, setClubName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await createClub({
            clubName
        });

        if (result.success) {
            await refreshClubs();
            setClubName("");
        } else {
            setMessage(result.error.message);
        }
    };

    return (
        <>
            <p>
                Your club is currently inactive.
            </p>

            <form onSubmit={handleSubmit}>

                <label>
                    Club Name
                </label>

                <input
                    type="text"
                    value={clubName}
                    maxLength={16}
                    onChange={(e) =>
                        setClubName(e.target.value)
                    }
                />

                <button type="submit">
                    Create Club
                </button>

            </form>

            {message && (
                <p className="profileMessage">
                    {message}
                </p>
            )}
        </>
    );
}