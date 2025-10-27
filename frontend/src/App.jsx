import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Research from './pages/Research'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-900 text-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">ORS</span>
                </div>
                <h1 className="text-2xl font-bold">Optic Risk Score Monitor</h1>
              </div>
              <div className="flex space-x-6">
                <Link to="/" className="hover:text-blue-300 transition-colors font-medium">
                  Dashboard
                </Link>
                <Link to="/research" className="hover:text-blue-300 transition-colors font-medium">
                  Research Portal
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/research" element={<Research />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
