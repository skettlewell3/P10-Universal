import { useState } from "react";
import { useDatabase } from "../hooks/useDatabase";

export default function ResetPasswordPage() {
  const { supabase } = useDatabase();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleReset = async () => {
    setError(null);
    setMessage(null);

    if (password.length < 6) {
      setError("Password too short");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated. You can now log in.");
    }

    setLoading(false);
  };

  return (
    <div className="logInContainer">
      <h2>Reset password</h2>

      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      <button onClick={handleReset} disabled={loading}>
        {loading ? "Updating..." : "Update password"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}