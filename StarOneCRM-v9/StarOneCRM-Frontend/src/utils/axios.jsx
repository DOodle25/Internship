import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL:
    "https://internship-fta5hkg7e8eaecf7.westindia-01.azurewebsites.net/api",
  // withCredentials: true,
  // timeout: 5000,
});
// Add request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Add response interceptor for handling global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(error.response.data.message || error.message);
    } else {
      console.error("Network error", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
