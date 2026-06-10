import AuthGate from './components/authgate/AuthGate'
import AppShell from './AppShell'
import { DatabaseProvider } from './providers/DatabaseProvider'
import { AuthProvider } from './providers/AuthProvider'
import { ProfileProvider } from './providers/ProfileProvider'
import './App.css'
import AppLoadingGate from './components/app/AppLoadingGate'

function App() {
  
  return (
    <DatabaseProvider>
      <AuthProvider>
        <AuthGate>
          <ProfileProvider>
            <AppLoadingGate>
              <AppShell/>
            </AppLoadingGate>
          </ProfileProvider>
        </AuthGate>
      </AuthProvider>
    </DatabaseProvider>
  )
}

export default App
