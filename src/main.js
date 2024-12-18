import './assets/output.css'
import './assets/input.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'core-js/stable';
import 'regenerator-runtime/runtime'; // Untuk mendukung async/await
import DashboardLayout from './components/DashboardLayout.vue'

const app = createApp(App)
app.component('DefaultLayout', DashboardLayout)

app.use(createPinia())
app.use(router)

app.mount('#app')