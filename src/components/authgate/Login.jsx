import { useState, useEffect } from "react";
import { useDatabase } from "../../hooks/useDatabase";

const LOGO_SRC = "/assets/logos/FullLogo_Transparent_NoBuffer.png";

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
      setError(`Unexpected error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = LOGO_SRC;
  })

  return (
    <div id="logInContainer">
      <img
        src={LOGO_SRC}
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