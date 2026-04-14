import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: [
      'dayjs',
      'dayjs/plugin/customParseFormat',
      'es-toolkit/compat',
    ],
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
})
