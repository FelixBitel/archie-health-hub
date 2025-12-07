import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'

function App() {
  const { token } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-900">
      {token ? <Dashboard /> : <LoginPage />}
    </div>
  )
}

export default App
