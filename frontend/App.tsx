import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'

function App() {
  const { token, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Default route */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        {/* 404 */}
        <Route path="*" element={<div className="text-center mt-20">Page not found</div>} />
      </Routes>
    </Router>
  )
}

export default App
