import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/theme-chalk/index.css'

createApp(App)
  .use(ElementPlus)
  .mount('#app')
