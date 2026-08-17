import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "../../hooks/useDatabase";

const LOGO_SRC = "/assets/logos/FullLogo_Transparent_NoBuffer.png";

export default function ConfirmEmail() {
    const { supabase } = useDatabase();
    const navigate = useNavigate();

    const [status, setStatus] = useState("confirming");
    const [error, setError] = useState(null);

    useEffect(() => {
        const confirmEmail = async () => {
            const params = new URLSearchParams(window.location.search);

            const tokenHash = params.get("token_hash");
            const type = params.get("type");

            if (!tokenHash) {
                setStatus("error");
                setError("Invalid confirmation link.");
                return;
            }

            const { error } = await supabase.auth.verifyOtp({
                token_hash: tokenHash,
                type: type || "email"
            });

            if (error) {
                setStatus("error");
                setError(error.message);
                return;
            }

            setStatus("success");

            setTimeout(() => {
                navigate("/");
            }, 1500);
        };

        confirmEmail();
    }, [supabase, navigate]);

    return (
        <div className="logInContainer">
            <img
                src={LOGO_SRC}
                alt="logo"
            />

            {status === "confirming" && (
                <>
                    <h2>Confirming your email</h2>
                    <p>Please wait...</p>
                </>
            )}

            {status === "success" && (
                <>
                    <h2>Email confirmed</h2>
                    <p>Your email address has been confirmed successfully.</p>
                    <p>Taking you into Elsewhere...</p>
                </>
            )}

            {status === "error" && (
                <>
                    <h2>Confirmation failed</h2>

                    <p style={{ color: "red" }}>
                        {error}
                    </p>

                    <button onClick={() => navigate("/login")}>
                        Back to login
                    </button>
                </>
            )}
        </div>
    );
}