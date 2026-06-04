import { useState } from 'react';
import DummyLogin from './DummyLogin';
import AppWithUser from '../../AppWithUser';

export default function AuthGate() {
  const [ user, setUser ] = useState(false)

  const handleDummyLogIn = () => {
    setUser({ profile_id: "dummy", profile_type: "user", display_name: "Dummy"});
  };

  const handleDummyLogOut = () => {
    setUser(false)
  }

  if (!user) {
    return <DummyLogin onLogIn={handleDummyLogIn} />;
  }

  return (
    <AppWithUser 
      user={user}
      onLogOut={handleDummyLogOut}
    />
  );
}
