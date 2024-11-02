import axios from "axios";

export const axiosClient = axios.create({
    baseURL: BACKEND_URL,
    timeout: 3 * 60 * 60
});