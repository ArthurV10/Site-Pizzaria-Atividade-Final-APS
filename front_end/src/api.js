// src/api.js
import axios from 'axios';

// URL do seu backend Flask
const API_URL = 'http://localhost:5000';

// Instância do axios para facilitar as requisições
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export default api;
