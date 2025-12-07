import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container-main flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🐕 Archie Health Hub</h1>
            <p className="text-gray-600">Welcome, {user?.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Stats Cards */}
          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-2">📊 Pet Profile</h3>
            <p className="text-gray-600">Manage your pet's information</p>
            <button className="btn-primary w-full mt-4">View Profile</button>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-2">📋 Health Logs</h3>
            <p className="text-gray-600">Track health records and updates</p>
            <button className="btn-primary w-full mt-4">View Logs</button>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold text-gray-800 mb-2">✅ Tasks</h3>
            <p className="text-gray-600">Manage pet care tasks</p>
            <button className="btn-primary w-full mt-4">View Tasks</button>
          </div>
        </div>

        {/* Status section */}
        <div className="mt-12 card">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🎉 System Status</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600">Backend API</p>
              <p className="text-lg font-bold text-green-700">✅ Connected</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600">Database</p>
              <p className="text-lg font-bold text-green-700">✅ Connected</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600">User</p>
              <p className="text-lg font-bold text-blue-700">📧 {user?.email}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600">JWT Token</p>
              <p className="text-lg font-bold text-blue-700">🔒 Active</p>
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="mt-12 card bg-blue-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Next Steps</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ <strong>Backend running</strong> - API server is active</li>
            <li>✅ <strong>Database connected</strong> - PostgreSQL is working</li>
            <li>✅ <strong>Authentication working</strong> - JWT tokens are secure</li>
            <li>⏳ <strong>Add pet profile</strong> - Create your pet's profile (coming soon)</li>
            <li>⏳ <strong>Health tracking</strong> - Log health records (coming soon)</li>
            <li>⏳ <strong>AI Assistant</strong> - Chat with AI for pet care tips (coming soon)</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
