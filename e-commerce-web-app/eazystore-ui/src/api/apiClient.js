import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 10000,
})

export default apiClient;