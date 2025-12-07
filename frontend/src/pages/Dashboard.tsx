import { useAuthStore } from '../store/authStore'

export default function Dashboard() {
  const { setToken } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between">
          <h1 className="text-2xl font-bold">🐾 Archie Health Hub</h1>
          <button
            onClick={() => setToken(null)}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
          >
            Выход
          </button>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Добро пожаловать!</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 p-6 rounded">
            <h3 className="text-xl font-bold mb-2">Мои питомцы</h3>
            <p className="text-gray-400">Управляйте информацией о ваших питомцах</p>
          </div>
          <div className="bg-gray-800 p-6 rounded">
            <h3 className="text-xl font-bold mb-2">Здоровье</h3>
            <p className="text-gray-400">Отслеживайте здоровье питомца</p>
          </div>
          <div className="bg-gray-800 p-6 rounded">
            <h3 className="text-xl font-bold mb-2">История</h3>
            <p className="text-gray-400">Просмотрите историю записей</p>
          </div>
        </div>
      </div>
    </div>
  )
}
