import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { apiClient } from '../api/client'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setToken } = useAuthStore()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await apiClient.post('/auth/register', { email, password })
      const response = await apiClient.post('/auth/login', { email, password })
      setToken(response.data.token)
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleRegister} className="w-full max-w-md">
        <div className="bg-gray-800 p-8 rounded-lg">
          <h1 className="text-2xl font-bold text-white mb-6">Регистрация</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full px-4 py-2 mb-6 bg-gray-700 text-white rounded"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  )
}
