import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";

export default function ProfileAccountCard() {
    const {
        profile,
        updateDisplayName
    } = useProfile();

    const [displayName, setDisplayName] = useState(
        () => profile?.display_name ?? ""
    );

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await updateDisplayName(displayName);

        if (result.success) {
            setMessage("Display name updated");
        } else {
            setMessage(result.error.message);
        }
    };

    return (
        <section className="accountCard">

            <h2>Account Details</h2>

            <form onSubmit={handleSubmit}>

                <label>
                    Display Name
                </label>

                <input
                    type="text"
                    value={displayName}
                    maxLength={16}
                    onChange={(e) =>
                        setDisplayName(e.target.value)
                    }
                />

                <button type="submit">
                    Save Changes
                </button>

            </form>

            {message && (
                <p className="accountMessage">
                    {message}
                </p>
            )}

        </section>
    );
}