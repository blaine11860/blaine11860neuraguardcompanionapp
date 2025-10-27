function ConflictAlerts({ conflicts }) {
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'HIGH': return 'border-red-500 bg-red-50'
      case 'MEDIUM': return 'border-yellow-500 bg-yellow-50'
      case 'LOW': return 'border-blue-500 bg-blue-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'HIGH':
        return (
          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      case 'MEDIUM':
        return (
          <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Conflict Detection</h3>
      
      <div className="space-y-4">
        {conflicts.map((conflict, index) => (
          <div key={index} className={`border-l-4 rounded-lg p-4 ${getSeverityColor(conflict.severity)}`}>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                {getSeverityIcon(conflict.severity)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-gray-900">{conflict.type.replace(/_/g, ' ')}</h4>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    conflict.severity === 'HIGH' ? 'bg-red-100 text-red-800' :
                    conflict.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {conflict.severity}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{conflict.message}</p>
                <div className="bg-white bg-opacity-50 rounded p-3">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Clinical Suggestions:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {conflict.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-sm text-gray-600">{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConflictAlerts
