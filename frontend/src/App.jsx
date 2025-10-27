import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Research from './pages/Research'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-safe">
        <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg sm:text-xl font-bold">ORS</span>
                </div>
                <h1 className="text-lg sm:text-2xl font-bold truncate">ORS Monitor</h1>
              </div>
              <div className="flex space-x-3 sm:space-x-6">
                <Link to="/" className="hover:text-blue-300 transition-colors font-medium text-sm sm:text-base">
                  Dashboard
                </Link>
                <Link to="/research" className="hover:text-blue-300 transition-colors font-medium text-sm sm:text-base">
                  Research
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
