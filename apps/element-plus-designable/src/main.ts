import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import './styles/globals.css'

createApp(App).use(createPinia()).mount('#app')
