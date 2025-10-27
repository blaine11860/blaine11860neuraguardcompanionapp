import { useState } from 'react'
import { calculateORS } from '../utils/api'

function ParameterInputForm({ onCalculate }) {
  const [formData, setFormData] = useState({
    microvascular_flow: '25',
    plet_variation: '15',
    optic_nerve_diameter: '5.0',
    bis_index: '45',
    spo2: '98',
    map_bp: '70',
    hb: '10',
    temperature: '36.5',
    emboli_count: '0'
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    
    try {
      const result = await calculateORS(formData)
      onCalculate(result)
    } catch (err) {
      setError('Failed to calculate ORS. Please check your inputs.')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Patient Parameters</h3>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Microvascular Flow (mm/s)
          </label>
          <input
            type="number"
            step="0.1"
            name="microvascular_flow"
            value={formData.microvascular_flow}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PLETh Variation (%)
          </label>
          <input
            type="number"
            step="0.1"
            name="plet_variation"
            value={formData.plet_variation}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Optic Nerve Diameter (mm)
          </label>
          <input
            type="number"
            step="0.1"
            name="optic_nerve_diameter"
            value={formData.optic_nerve_diameter}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            BIS Index
          </label>
          <input
            type="number"
            step="1"
            name="bis_index"
            value={formData.bis_index}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SpO2 (%)
          </label>
          <input
            type="number"
            step="1"
            name="spo2"
            value={formData.spo2}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MAP (mmHg)
          </label>
          <input
            type="number"
            step="1"
            name="map_bp"
            value={formData.map_bp}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hemoglobin (g/dL)
          </label>
          <input
            type="number"
            step="0.1"
            name="hb"
            value={formData.hb}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature (°C)
          </label>
          <input
            type="number"
            step="0.1"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Emboli Count (counts/min)
          </label>
          <input
            type="number"
            step="1"
            name="emboli_count"
            value={formData.emboli_count}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-3 px-4 rounded-md hover:bg-blue-800 transition-colors font-medium"
        >
          Calculate ORS
        </button>
      </form>
    </div>
  )
}

export default ParameterInputForm
