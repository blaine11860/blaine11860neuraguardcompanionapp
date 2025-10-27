import { useState } from 'react'
import ParameterInputForm from '../components/ParameterInputForm'
import ORSDisplay from '../components/ORSDisplay'
import ComponentScores from '../components/ComponentScores'
import ConflictAlerts from '../components/ConflictAlerts'

function Dashboard() {
  const [orsResult, setOrsResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCalculate = async (result) => {
    setLoading(true)
    setOrsResult(result)
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Monitoring Dashboard</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Monitor optic nerve ischemia risk during prone position surgery
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <ParameterInputForm onCalculate={handleCalculate} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          {loading && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Calculating ORS...</p>
            </div>
          )}

          {orsResult && !loading && (
            <>
              <ORSDisplay result={orsResult} />
              {orsResult.conflicts && orsResult.conflicts.length > 0 && (
                <ConflictAlerts conflicts={orsResult.conflicts} />
              )}
              <ComponentScores scores={orsResult.component_scores} cmro2Do2={orsResult.cmro2_do2_ratio} />
            </>
          )}

          {!orsResult && !loading && (
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Data Yet</h3>
              <p className="text-sm sm:text-base text-gray-500">Enter patient parameters to calculate Optic Risk Score</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
