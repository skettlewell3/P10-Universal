import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { format } from "date-fns";
import CopyCode from "../app/CopyCode";

export default function ProfileAccountCard() {
    const {
        profile,
        updateDisplayName
    } = useProfile();

    const [displayName, setDisplayName] = useState(
        () => profile?.display_name ?? ""
    );

    const [message, setMessage] = useState("");

    const createdDate = profile?.created_at
        ? format(new Date(profile.created_at), "dd MMM yyyy")
        : ""
    ;

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

            <h2>
                Account Details
                {profile?.username && (
                    <div className="accountUsername">
                        <span >
                            #{profile.username}
                        </span>

                        <CopyCode value={profile.username}/>
                    </div>                
                )}
            </h2>

            {createdDate && (
                <p className="accountCreated">
                    Member since {createdDate}
                </p>
            )}

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