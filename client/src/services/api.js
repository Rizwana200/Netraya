import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
});


// ==========================================
// ADD JWT TOKEN TO REQUESTS
// ==========================================

api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("netrayaToken");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;
    },

    (error) => {

        return Promise.reject(error);

    }
);


// ==========================================
// HANDLE UNAUTHORIZED REQUEST
// ==========================================

api.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem(
                "netrayaToken"
            );

            localStorage.removeItem(
                "netrayaUser"
            );

        }

        return Promise.reject(error);

    }

);


export default api;