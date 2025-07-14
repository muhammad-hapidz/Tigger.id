import { defineConfig } from 'vite'; // Pastikan ini diimpor
import vue from '@vitejs/plugin-vue'; // Plugin Vue
import vueDevTools from 'vite-plugin-vue-devtools'; // Plugin DevTools untuk Vue
import legacy from '@vitejs/plugin-legacy'; // Plugin Legacy

import { fileURLToPath, URL } from 'node:url'; // Untuk alias path

export default defineConfig({
  base: '/cms/',
  plugins: [
    vue(),
    vueDevTools(),
    legacy({
      targets: ['defaults', 'not IE 11'], // Target browser modern
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Alias untuk folder 'src'
    },
  },
  build: {
    target: 'esnext', // Target output modern
    outDir: 'dist', // Folder output
  },
  server: {
    port: 5173, // Port pengembangan
    open: true, // Buka otomatis di browser
    historyApiFallback: true, // Tambahkan fallback untuk Vue Router
  },
});
