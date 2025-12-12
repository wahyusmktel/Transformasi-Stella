import axios from 'axios';

// 1. Arahkan ke Port Backend Node.js
const BASE_URL = 'http://localhost:5000'; 

const api = axios.create({
    baseURL: `${BASE_URL}/api`, // Prefix /api sesuai settingan index.ts backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. INTERCEPTOR SAKTI (Middleware Frontend)
// Fungsi ini akan berjalan SEBELUM request dikirim.
// Tugasnya: Mengecek apakah ada Token di saku (localStorage).
// Kalau ada, tempelkan ke Header request.
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Standar JWT: Header Authorization: Bearer <token>
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor Response (Opsional: Handle jika token expired)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Jika server Node.js membalas 401 (Unauthorized), 
        // berarti token palsu atau expired.
        if (error.response && error.response.status === 401) {
            // Hapus token busuk
            localStorage.removeItem('token');
            localStorage.removeItem('user_data');
            // Opsional: Redirect ke login (hati-hati infinite loop)
            // window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default api;