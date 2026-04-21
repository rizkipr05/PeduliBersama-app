import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3000',
    // Catatan: ganti ke IP laptop jika pakai device fisik
    // contoh: 'http://192.168.1.x:3000'
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor — attach token
api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error),
);

// Response interceptor — handle 401
api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 401) {
            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('user');
        }
        return Promise.reject(error);
    },
);

// Auth API
export const authApi = {
    login: (data: { email: string; password: string }) =>
        api.post('/auth/login', data),
    register: (data: { name: string; email: string; password: string }) =>
        api.post('/auth/register', data),
    logout: () => api.post('/auth/logout'),
    getProfile: () => api.get('/auth/profile'),
};

// Helpers
export const saveToken = (token: string) =>
    AsyncStorage.setItem('access_token', token);

export const clearToken = () =>
    AsyncStorage.removeItem('access_token');

export const getToken = (): Promise<string | null> =>
    AsyncStorage.getItem('access_token');

export default api;