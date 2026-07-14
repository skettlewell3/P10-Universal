import { useState } from "react";
import { useClubs } from "../../hooks/useClubs";

export default function SendClubInviteForm({ clubId }) {

    const {
        sendInvite
    } = useClubs();

    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        const result = await sendInvite(
            clubId,
            username
        );

        if (result.success) {
            setMessage("Invite sent");
            setUsername("");
        } else {
            setMessage(result.error.message);
        }

    };

    return (
        <section className="accountCard">

            <h2>
                Invite Player
            </h2>

            <form onSubmit={handleSubmit}>

                <label>
                    Username
                </label>

                <input
                    type="text"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <button type="submit">
                    Send Invite
                </button>

            </form>

            {message && (
                <p>
                    {message}
                </p>
            )}

        </section>
    );
}