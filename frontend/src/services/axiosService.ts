import axios from 'axios';

const axiosService = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_BASE_URL || 'http://localhost:9000',
});

export default axiosService;
