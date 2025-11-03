import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
    optimizeDeps: {
        exclude: ['@googlemaps/js-api-loader'],
    },
    server: {
        port: 3000, // or any other available port
        host: 'localhost', // explicitly use localhost instead of ::1
    },
    plugins: [vue(), vueDevTools()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
