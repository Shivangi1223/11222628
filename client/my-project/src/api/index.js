import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ⚠️ Change if backend runs on different port
});

export default api;
