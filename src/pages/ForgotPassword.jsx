import { useState } from "react";
import { useDatabase } from "../hooks/useDatabase";

export default function ForgotPassword() {
  const { supabase } = useDatabase();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const sendReset = async () => {
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    setSent(true);
  };

  return (
    <div className="logInContainer">
      <h2>Reset password</h2>

      {!sent ? (
        <>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={sendReset}>
            Send reset link
          </button>
        </>
      ) : (
        <div>
            <p>If that email exists, a reset link has been sent.</p>
    
            <a href="/forgot-password">try again</a>
        </div>
      )}
    </div>
  );
}