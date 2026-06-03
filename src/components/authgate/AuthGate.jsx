import LoginForm from './LoginForm';

import { useUser } from '../../hooks/useUser';

export default function AuthGate({ children }) {
  const { user, handleLogin } = useUser();

  if (!user) {
    return <LoginForm onLogIn={handleLogin} />;
  }

  return <>{children}</>;
}
