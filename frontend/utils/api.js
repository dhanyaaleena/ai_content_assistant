import axios from "axios";

// Use the PUBLIC_API_URL environment variable or fallback to localhost
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export default api;
