// src/services/axiosInstance.ts

import axios from 'axios';
import authService from './authService';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
