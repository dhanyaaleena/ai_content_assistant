import axios from "axios";

// Use the PUBLIC_API_URL environment variable or fallback to localhost
const api = axios.create({
  baseURL: process.env.PUBLIC_API_URL || "http://localhost:8000", // Fallback to localhost if PUBLIC_API_URL is not set
});

export default api;
