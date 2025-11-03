import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
// ✅ SOLUCIÓN SIMPLE
import 'chart.js/auto'
import 'sweetalert2/dist/sweetalert2.min.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
