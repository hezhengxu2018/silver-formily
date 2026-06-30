import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

function packagePath(pathname: string) {
  return fileURLToPath(new URL(`../${pathname}`, import.meta.url))
}

function playgroundPath(pathname: string) {
  return fileURLToPath(new URL(pathname, import.meta.url))
}

export default defineConfig({
  root: playgroundPath('.'),
  plugins: [
    vue(),
    vueJsx(),
  ],
  css: {
    postcss: packagePath('.'),
  },
  resolve: {
    alias: {
      '@playground': playgroundPath('./src'),
      '@silver-formily/designer-core': packagePath('../designer-core/src/index.ts'),
      '@silver-formily/designer-vue': packagePath('./src/index.ts'),
      '@silver-formily/reactive': packagePath('../reactive/src/index.ts'),
      '@silver-formily/reactive-vue': packagePath('../reactive-vue/src/index.ts'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 4180,
  },
})
