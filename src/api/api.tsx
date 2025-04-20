export const API_URL = 'https://api.dailytracker.tricodezone.com/api';
// export const API_URL = 'https://127.0.0.1:8000/api';

import axios from "axios";

export const API = axios.create({ baseURL: API_URL })