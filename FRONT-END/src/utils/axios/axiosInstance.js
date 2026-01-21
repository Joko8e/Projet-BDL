import axios from 'axios'

const API_URL = process.env.NODE_ENV === "development" 
  ? "http://localhost:8000"
  : "https://balldontlie-ecru.vercel.app"

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default axiosInstance;