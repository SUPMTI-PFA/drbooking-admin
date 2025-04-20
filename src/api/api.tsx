export const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";
export const API = axios.create({ baseURL: API_URL })