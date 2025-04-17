// src/api/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001', // thay đổi nếu cần
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
