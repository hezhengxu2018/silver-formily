import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

function workspacePath(pathname: string) {
  return fileURLToPath(new URL(pathname, import.meta.url))
}

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@silver-formily/designer-core': workspacePath('../designer-core/src/index.ts'),
    },
  },
  optimizeDeps: {
    include: ['vue'],
  },
})
