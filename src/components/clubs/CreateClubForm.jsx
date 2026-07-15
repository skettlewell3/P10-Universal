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
        const cleanName = clubName.trim();            
        if (cleanName.length < 3) {
            setMessage("Club name must be between 3 and 16 characters");
            return;
        }

        const result = await createClub({
            cleanName
        });

        if (result.success) {
            await refreshClubs();
            setClubName("");
            setMessage("");
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

                {clubName.length > 0 && (
                    <p>Choose a club name between 3 and 16 characters.</p>
                )}

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