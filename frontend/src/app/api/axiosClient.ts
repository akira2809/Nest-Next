// src/api/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001', // thay đổi nếu cần
});

export default axiosClient;
