import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { apiClient } from '../api/client'

export default function LoginPage() {
  const [email, setEmail] = useState('demo@example.com')
  const [password, setPassword] = useState('demo123')
  const { setToken } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await apiClient.post('/auth/login', { email, password })
      setToken(response.data.token)
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleLogin} className="w-full max-w-md">
        <div className="bg-gray-800 p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-white mb-6">Вход</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 bg-gray-700 text-white rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full px-4 py-2 mb-6 bg-gray-700 text-white rounded"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Войти
          </button>
        </div>
      </form>
    </div>
  )
}
