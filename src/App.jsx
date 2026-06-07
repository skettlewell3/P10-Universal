import AuthGate from './components/authgate/AuthGate'

import './App.css'
import { DatabaseProvider } from './providers/DatabaseProvider'
import { AuthProvider } from './providers/AuthProvider'

function App() {
  

  return (
    <DatabaseProvider>
      <AuthProvider>
        <AuthGate/>
      </AuthProvider>
    </DatabaseProvider>
  )
}

export default App
