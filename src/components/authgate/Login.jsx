import { useState, useEffect } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { useFlavour } from "../../hooks/useFlavour";

const LOGO_SRC = "/assets/logos/FullLogo_Transparent_NoBuffer.png";

export default function Login() {
  const { supabase } = useDatabase();

  const {
    flavours,
    selectedFlavourId,
    setSelectedFlavour,
    loading: flavourLoading
  } = useFlavour();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [inviteCode, setInviteCode] = useState("");

  useEffect(() => {
    if (flavourLoading) return;
    if (selectedFlavourId != null) return;
    if (!flavours.length) return;

    const storedId = localStorage.getItem(
      "selectedFlavourId"
    );

    const storedFlavour = storedId
      ? flavours.find(
          flavour => flavour.flavour_id === Number(storedId)
        )
      : null;

    const defaultFlavour =
      flavours.find(flavour => flavour.is_default);

    const resolvedFlavour =
      storedFlavour ?? defaultFlavour;

    if (resolvedFlavour) {
      setSelectedFlavour(
        resolvedFlavour.flavour_id
      );
    }
  }, [
    flavourLoading,
    flavours,
    selectedFlavourId,
    setSelectedFlavour
  ]);

  const handleAuth = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (selectedFlavourId == null) {
      setError("Please select a flavour");
      return;
    }

    if (mode === "signup") {
      const { data: validCode, error: codeError } =
        await supabase.rpc(
          "validate_signup_code",
          {
            p_code: inviteCode.trim()
          }
        );

      if (codeError) {
        setError(codeError.message);
        return;
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
        return;
      }

      setPassword("");

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

      <select
        value={selectedFlavourId ?? ""}
        onChange={(e) =>
          setSelectedFlavour(Number(e.target.value))
        }
        disabled={flavourLoading || loading}
      >
        {flavours.map(flavour => (
          <option
            key={flavour.flavour_id}
            value={flavour.flavour_id}
          >
            {flavour.flavour_name}
          </option>
        ))}
      </select>

      <input
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        autoComplete={
          mode === "login"
            ? "current-password"
            : "new-password"
        }
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
          flavourLoading ||
          selectedFlavourId == null ||
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
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <p style={{ marginTop: "12px", fontSize: "0.9rem" }}>
        <a href="/forgot-password">
          Forgot password?
        </a>
      </p>
    </div>
  );
}