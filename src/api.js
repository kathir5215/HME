import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8082',
    withCredentials: true
});

// Optional PATCH method support
api.patch = async (url, data, config) => {
    return api.request({
        ...config,
        url,
        data,
        method: 'patch'
    });
};

// Add token to request headers
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Redirect on unauthorized access
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            window.location.replace('/login'); // cleaner than window.location =
        }
        return Promise.reject(error);
    }
);

export default api;
