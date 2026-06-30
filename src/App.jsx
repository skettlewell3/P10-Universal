import AuthGate from './components/authgate/AuthGate'
import AppShell from './AppShell'
import { DatabaseProvider } from './providers/DatabaseProvider'
import { AuthProvider } from './providers/AuthProvider'
import { ProfileProvider } from './providers/ProfileProvider'
import './App.css'
import AppLoadingGate from './components/app/AppLoadingGate'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import ResetPasswordPage from './pages/ResetPasswordPage'
import { FlavourProvider } from './providers/FlavourProvider'

function App() {
  
  return (
    <DatabaseProvider>
      <AuthProvider>
        <FlavourProvider>
          <Routes>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/reset-password' element={<ResetPasswordPage/>}/>
            <Route 
              path='/*' 
              element={
                <AuthGate>
                  <ProfileProvider>
                    <AppLoadingGate>
                      <AppShell/>
                    </AppLoadingGate>
                  </ProfileProvider>
                </AuthGate>
              }
            />
          </Routes>
        </FlavourProvider>
      </AuthProvider>
    </DatabaseProvider>
  )
}

export default App
