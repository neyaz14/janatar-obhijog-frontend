import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://janatar-obhijog-backend.vercel.app/api/v1";

const axiosPublic = axios.create({
    baseURL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor
axiosPublic.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosPublic.interceptors.response.use(
    (response) => {
        console.log(`Response received from: ${response.config.url}`, response.data);
        return response;
    },
    (error) => {
        console.error('Response error:', error.response?.data || error.message);

        // Handle specific error cases
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    console.error('Bad Request:', data.message || 'Invalid request');
                    break;
                case 401:
                    console.error('Unauthorized:', data.message || 'Authentication required');
                    break;
                case 403:
                    console.error('Forbidden:', data.message || 'Access denied');
                    break;
                case 404:
                    console.error('Not Found:', data.message || 'Resource not found');
                    break;
                case 500:
                    console.error('Server Error:', data.message || 'Internal server error');
                    break;
                default:
                    console.error(`Error ${status}:`, data.message || 'An error occurred');
            }
        } else if (error.request) {
            // Network error
            console.error('Network Error: No response received from server');
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;