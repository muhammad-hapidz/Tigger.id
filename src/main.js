import './assets/output.css';
import './assets/input.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'core-js/stable';
import 'regenerator-runtime/runtime'; // Untuk mendukung async/await
import DashboardLayout from './components/DashboardLayout.vue';
import 'quill/dist/quill.snow.css'; // Impor CSS untuk tema snow
import Toast, { POSITION } from 'vue-toastification'; // Import Vue Toastification
import 'vue-toastification/dist/index.css'; // Impor CSS untuk toast



const app = createApp(App);
app.component('DefaultLayout', DashboardLayout);

app.use(createPinia());
app.use(router);
app.use(Toast, {
    position: POSITION.TOP_RIGHT, // Anda bisa memilih posisi yang diinginkan
    timeout: 3000, // Timeout toast
});

app.mount('#app');
