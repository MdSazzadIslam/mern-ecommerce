import axios from "axios";
import storage from "./storage";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 20000, // request timeout
});

// request interceptor

service.interceptors.request.use(
  (config) => {
    // Do something before request is sent

    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = `Bearer ${storage.getLocalStorage()}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default service;
