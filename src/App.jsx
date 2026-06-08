import AuthGate from './components/authgate/AuthGate'
import AppWithUser from './AppWithUser'
import { DatabaseProvider } from './providers/DatabaseProvider'
import { AuthProvider } from './providers/AuthProvider'
import './App.css'

function App() {
  

  return (
    <DatabaseProvider>
      <AuthProvider>
        <AuthGate>
          <AppWithUser/>
        </AuthGate>
      </AuthProvider>
    </DatabaseProvider>
  )
}

export default App
