function ORSDisplay({ result }) {
  const getRiskColor = (level) => {
    switch(level) {
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200'
      case 'MODERATE': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'HIGH': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getScoreColor = (score) => {
    if (score < 30) return 'text-green-600'
    if (score < 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Optic Risk Score</h3>
        {result.alert && (
          <div className="flex items-center text-red-600">
            <svg className="w-5 h-5 mr-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">ALERT</span>
          </div>
        )}
      </div>

      <div className="text-center mb-6">
        <div className={`text-7xl font-bold mb-2 ${getScoreColor(result.ors_score)}`}>
          {result.ors_score}
        </div>
        <div className={`inline-block px-6 py-2 rounded-full border-2 font-bold text-lg ${getRiskColor(result.risk_level)}`}>
          {result.risk_level} RISK
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">CMRO2/DO2 Ratio</span>
          <span className="text-2xl font-bold text-blue-900">{result.cmro2_do2_ratio}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Cerebral metabolic rate vs oxygen delivery
        </p>
      </div>

      <div className="text-xs text-gray-500 text-center">
        Last updated: {new Date(result.timestamp).toLocaleString()}
      </div>
    </div>
  )
}

export default ORSDisplay
