import axios from "axios";

const api = axios.create({
  baseURL: "/api", // à adapter si différent
});

export default api;
