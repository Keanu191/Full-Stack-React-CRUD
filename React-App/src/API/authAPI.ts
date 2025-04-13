// Axios instance for authentication-related API calls.
// Configured with a base URL and default headers.
import axios from "axios";

// This API is used for authentication and category management
const authAPI = axios.create({
    baseURL: "https://localhost:7033/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default authAPI;