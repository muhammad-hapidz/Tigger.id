import './assets/output.css'
import './assets/input.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'core-js/stable';
import 'regenerator-runtime/runtime'; // Untuk mendukung async/await

const app = createApp(App)

app.use(router)

app.mount('#app')
