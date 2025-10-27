import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'

function ComponentScores({ scores }) {
  const data = [
    { name: 'Microvascular Flow', value: scores.microvascular_flow, weight: '20%' },
    { name: 'PLETh Variation', value: scores.plet_variation, weight: '16%' },
    { name: 'Emboli Count', value: scores.emboli_count, weight: '12%' },
    { name: 'Optic Nerve Ø', value: scores.optic_nerve_diameter, weight: '12%' },
    { name: 'BIS Index', value: scores.bis_index, weight: '11%' },
    { name: 'SpO2', value: scores.spo2, weight: '9%' },
    { name: 'MAP', value: scores.map_bp, weight: '7%' },
    { name: 'Hemoglobin', value: scores.hb, weight: '7%' },
    { name: 'Temperature', value: scores.temperature, weight: '6%' }
  ]

  const getBarColor = (value) => {
    if (value < 30) return '#10b981'
    if (value < 60) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Component Score Breakdown</h3>
      
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
            <YAxis domain={[0, 100]} />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                      <p className="font-semibold">{payload[0].payload.name}</p>
                      <p className="text-sm">Score: {payload[0].value.toFixed(1)}</p>
                      <p className="text-sm text-gray-500">Weight: {payload[0].payload.weight}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
              <span className="text-sm text-gray-500">{item.weight}</span>
            </div>
            <div className="mt-1">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold" style={{ color: getBarColor(item.value) }}>
                  {item.value.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500 ml-1">/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${item.value}%`,
                    backgroundColor: getBarColor(item.value)
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> Higher component scores indicate greater risk. Weights represent each parameter's contribution to the overall ORS.
        </p>
      </div>
    </div>
  )
}

export default ComponentScores
