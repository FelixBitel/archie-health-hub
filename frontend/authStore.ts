import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

interface User {
  id: number
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
  
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  checkAuth: () => void
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ loading: true, error: null })
        try {
          const response = await axios.post('/api/auth/login', {
            email,
            password,
          })

          const { user, token } = response.data
          set({ user, token, loading: false })
        } catch (error: any) {
          const message = error.response?.data?.error || 'Login failed'
          set({ error: message, loading: false })
          throw new Error(message)
        }
      },

      register: async (email: string, password: string, name: string) => {
        set({ loading: true, error: null })
        try {
          const response = await axios.post('/api/auth/register', {
            email,
            password,
            name,
          })

          const { user, token } = response.data
          set({ user, token, loading: false })
        } catch (error: any) {
          const message = error.response?.data?.error || 'Registration failed'
          set({ error: message, loading: false })
          throw new Error(message)
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null })
      },

      checkAuth: () => {
        // Token is persisted in localStorage via Zustand persist middleware
        // Just verify it's still valid if needed
      },

      setToken: (token: string) => {
        set({ token })
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
)
