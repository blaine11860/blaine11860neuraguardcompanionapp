const API_BASE_URL = 'http://localhost:5001'

export const calculateORS = async (patientData) => {
  const response = await fetch(`${API_BASE_URL}/api/calculate-ors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientData),
  })
  
  if (!response.ok) {
    throw new Error('Failed to calculate ORS')
  }
  
  return response.json()
}

export const getResearchCases = async () => {
  const response = await fetch(`${API_BASE_URL}/api/research/cases`)
  
  if (!response.ok) {
    throw new Error('Failed to fetch research cases')
  }
  
  return response.json()
}
