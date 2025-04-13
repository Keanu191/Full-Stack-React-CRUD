import axios from "axios";

// Axios instance for general API calls (e.g., products).
// Configured with a base URL and default headers.

// Base URL for ProductsController V1
const API = axios.create({
    baseURL: "https://localhost:7033/api/v1/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

    },
});

export default API;