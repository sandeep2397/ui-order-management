import axios from "axios";

// ✅ Create Axios Instance
const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://node-graphql-server-mu.vercel.app",
});

// ✅ Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("📤 Request Sent:", config);
    // You can add Authorization headers or modify config here
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Response Received:", response);
    return response.data; // Return only response data
  },
  (error) => {
    console.error("❌ Response Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
