import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const predictSustainability = async (productData) => {
  try {
    const response = await api.post('/scorecard/predict-score/', productData);
    return response.data;
  } catch (error) {
    console.error('Prediction API error:', error);
    throw error;
  }
};

export default api;