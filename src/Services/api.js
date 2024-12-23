import axios from 'axios';

const api = axios.create({
    baseURL: 'https://apitiggerid.tri3a.com/api',
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        // Ambil token dari localStorage dengan kunci 'authToken'
        const token = localStorage.getItem('authToken');
        
        // Jika token ada, masukkan ke header Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            // console.log('Token ditambahkan ke header:', token); // Log token untuk pengecekan
        } else {
            console.warn('Token tidak ditemukan di localStorage'); // Log peringatan jika token tidak ada
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor untuk menangani error (misalnya jika token tidak valid atau kedaluwarsa)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            alert("Akses tidak diizinkan. Silakan login.");
            // Redirect ke halaman login jika token tidak valid
            window.location.href = '/cms/login';
        }
        return Promise.reject(error);
    }
);

export default api;
