import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3001', // IP default Android Emulator untuk akses localhost PC
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
    logout: async () => {
        const token = await AsyncStorage.getItem('access_token');
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('user_info');
        return api.post('/auth/logout', { token });
    },
    getProfile: async () => {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) throw new Error('No token');
        const val = await api.post('/auth/validate-token', { token });
        const sub = val.data?.data?.sub;
        if (!sub) throw new Error('Invalid token');
        return api.get(`/users/${sub}`);
    },
    updateProfile: (id: number, data: any) => api.patch(`/users/${id}`, data),
};

// Bencana (Disaster) API
export const bencanaApi = {
    getAll: () => api.get('/bencana'),
    getById: (id: string | number) => api.get(`/bencana/${id}`),
};

// Donasi API
export const donasiApi = {
    createDonation: (data: any) => api.post('/donasi', data),
    getMyDonations: () => api.get('/donasi/me'),
};

// Helpers
export const saveToken = (token: string) =>
    AsyncStorage.setItem('access_token', token);

export const clearToken = () =>
    AsyncStorage.removeItem('access_token');

export const getToken = (): Promise<string | null> =>
    AsyncStorage.getItem('access_token');

export default api;