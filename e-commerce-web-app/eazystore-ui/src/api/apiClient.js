import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 10000,
    withCredentials: true,
});

apiClient.interceptors.request.use(
    async (config) => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }

        const safeMethods = ["GET", "HEAD", "OPTIONS"];
        if (!safeMethods.includes(config.method.toUpperCase)) {
            let csrfToken = Cookies.get("XSRF-TOKEN");
            if (!csrfToken) {
                await axios.get(`${import.meta.env.VITE_BASE_API_URL}/csrf-token`, { withCredentials: true, });
                csrfToken = Cookies.get("XSRF-TOKEN");
                if (!csrfToken) {
                    throw new Error("CSRF token not found");
                }
            }
            config.headers["X-XSRF-TOKEN"] = csrfToken;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;