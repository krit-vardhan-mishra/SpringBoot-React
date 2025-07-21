import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api/v1"
      : "http://localhost:8080/api/v1/patients",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("isAdmin");
      sessionStorage.removeItem("authToken");

      if (!window.location.pathname.includes("login")) {
        window.location.href =
          "/admin-login?errorMessage=Session expired. Please login again.";
      }
    } else if (error.response?.status === 403) {
      console.error("Access forbidden");
    } else if (error.response && error.response.status >= 500) {
      console.error("Server error:", error.response?.data);
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
    } else if (!error.response) {
      console.error("Network error - server may be down");
    }

    return Promise.reject(error);
  }
);

export const patientAPI = {
  registerPatient: (patientData: {
    name: string;
    age: string;
    gender: string;
    problem: string;
  }) => api.post("/register", patientData),

  getPatients: (cured?: boolean) => {
    const params = cured !== undefined ? { cured } : {};
    return api.get("/patients", { params });
  },

  getPatientById: (id: number) => api.get(`/${id}`),
  adminLogin: (password: string) => api.post("/admin-login", { password }),
};

export const apiHelpers = {
  get: <T = any>(url: string, params?: any): Promise<AxiosResponse<T>> =>
    api.get(url, { params }),
  post: <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> =>
    api.post(url, data),
  put: <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> =>
    api.put(url, data),
  delete: <T = any>(url: string): Promise<AxiosResponse<T>> => api.delete(url),

  handleError: (error: AxiosError) => {
    if (error.response?.data) {
      const errorMessage =
        (error.response.data as any)?.message ||
        (error.response.data as any)?.error ||
        "An error occurred";
      return errorMessage;
    } else if (error.request) {
      return "Unable to connect to server. Please check your internet connection.";
    } else {
      return error.message || "An unexpected error occurred";
    }
  },

  isNetworkError: (error: AxiosError) => !error.response && error.request,
  isServerError: (error: AxiosError) =>
    error.response && error.response.status >= 500,
  isClientError: (error: AxiosError) =>
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500,
};

export { api as axiosInstance };

export default api;
