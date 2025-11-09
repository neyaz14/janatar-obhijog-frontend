import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/authProvider";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://janatar-obhijog-backend.vercel.app/api/v1";

const axiosSecure = axios.create({
    baseURL,
    timeout: 60000, // 60 seconds timeout (increased from 10 seconds)
    headers: {
        'Content-Type': 'application/json',
    }
});

const useAxiosSecure = () => {
    const { signOut } = useContext(AuthContext);

    useEffect(() => {
        // Request interceptor to add authorization header
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                console.log(`Making authenticated ${config.method?.toUpperCase()} request to: ${config.url}`);
                return config;
            },
            (error) => {
                console.error('Request error:', error);
                return Promise.reject(error);
            }
        );

        // Response interceptor to handle auth errors
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => {
                console.log(`Authenticated response received from: ${response.config.url}`, response.data);
                return response;
            },
            (error) => {
                console.error('Authenticated response error:', error.response?.data || error.message);

                if (error.response) {
                    const { status, data } = error.response;

                    switch (status) {
                        case 401:
                            console.error('Unauthorized: Token expired or invalid');
                            // Only auto logout if this is not an auth validation request
                            if (!error.config?.url?.includes('/users/me') &&
                                !error.config?.url?.includes('/auth/refresh') &&
                                !error.config?.url?.includes('/auth/login')) {
                                signOut();
                                // Optionally redirect to login
                                window.location.href = '/signin';
                            }
                            break;
                        case 403:
                            console.error('Forbidden:', data.message || 'Access denied');
                            break;
                        case 400:
                            console.error('Bad Request:', data.message || 'Invalid request');
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
                    console.error('Network Error: No response received from server');
                } else {
                    console.error('Error:', error.message);
                }

                return Promise.reject(error);
            }
        );

        // Cleanup interceptors on component unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [signOut]);

    return axiosSecure;
};

export default useAxiosSecure;
