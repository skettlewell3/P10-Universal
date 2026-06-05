import { useState, useEffect } from "react";
import { useDatabase } from "../../hooks/useDatabase";

export default function Login() {
  const { supabase } = useDatabase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login | signup
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      let result;

      if (mode === "login") {
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      } else {
        result = await supabase.auth.signUp({
          email,
          password,
        });
      }

      if (result.error) {
        setError(result.error.message);
      }
    } catch (err) {
      setError("Unexpected error occurred", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
}, []);

  return (
    <div id="logInContainer">
      <img
        src="/assets/logos/FullLogo_Transparent_NoBuffer.png"
        alt="logo"
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleAuth} disabled={loading}>
        {loading
          ? "Loading..."
          : mode === "login"
          ? "Log in"
          : "Sign up"}
      </button>

      <button
        onClick={() =>
          setMode(mode === "login" ? "signup" : "login")
        }
      >
        {mode === "login"
          ? "Need an account?"
          : "Already have an account?"}
      </button>

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}
    </div>
  );
}