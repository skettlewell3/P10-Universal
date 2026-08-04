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

  const [inviteCode, setInviteCode] = useState('');

  const handleAuth = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (mode === "signup") {
      const { data: validCode, error: codeError} = await supabase.rpc(
        "validate_signup_code",
        {
          p_code: inviteCode.trim()
        }
      );

      if (codeError) {
        throw codeError;
      }

      if (!validCode) {
        setError("Invalid invite code");
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      let result;

      if (mode === "login") {
        result = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
      } else {
        result = await supabase.auth.signUp({
          email: cleanEmail,
          password,
        });
      }

      if (result.error) {
        setError(result.error.message);
      } else {
        setPassword("");
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
  }, []);

  return (
    <div className="logInContainer">
      <img
        src={LOGO_SRC}
        alt="logo"
      />

      <input
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        autoComplete={mode === "login" ? "current-password" : "new-password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {mode === "signup" && (
      <input
        placeholder="Invite code"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
      />
    )}

      <button 
        onClick={handleAuth} 
        disabled={
          loading || 
          (mode === "signup" && inviteCode.trim() === "")
        }
      >
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

      <p style={{ marginTop: "12px", fontSize: "0.9rem" }}>
        <a href="/forgot-password">Forgot password?</a>
      </p>
    </div>
  );
}