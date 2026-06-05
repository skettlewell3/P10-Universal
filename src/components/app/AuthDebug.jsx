import { useAuth } from "../../hooks/useAuth";

export default function AuthDebug() {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    return <pre id="authDebug">{JSON.stringify(user, null, 2)}</pre>;
}