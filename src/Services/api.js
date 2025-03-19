import axios from 'axios';
import router from '@/router'; // Import Vue Router

const api = axios.create({
  baseURL: 'https://apiweb3a.tri3a.com/api',
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('authToken');

    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('Token tidak ditemukan di localStorage');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk menangani error (misalnya jika token tidak valid)
api.interceptors.response.use(
  (response) => response, // Biarkan response berhasil lewat
  (error) => {
    if (error.response && error.response.status === 401) {
      alert('Sesi Anda telah kedaluwarsa. Silakan login kembali.');
      localStorage.removeItem('authToken'); // Hapus token jika tidak valid
      router.push('/cms/login'); // Redirect ke halaman login menggunakan Vue Router
    }
    return Promise.reject(error);
  }
);

export default api;
