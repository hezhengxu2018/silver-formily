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
      '@silver-formily/core': workspacePath('../../packages/core/src/index.ts'),
      '@silver-formily/designer-core': workspacePath('../../packages/designer-core/src/index.ts'),
      '@silver-formily/designer-materials-element-plus': workspacePath('../../packages/designer-materials-element-plus/src/index.ts'),
      '@silver-formily/designer-vue': workspacePath('../../packages/designer-vue/src/index.ts'),
      '@silver-formily/element-plus': workspacePath('../../packages/element-plus/src/index.ts'),
      '@silver-formily/grid': workspacePath('../../packages/grid/src/index.ts'),
      '@silver-formily/json-schema': workspacePath('../../packages/json-schema/src/index.ts'),
      '@silver-formily/path': workspacePath('../../packages/path/src/index.ts'),
      '@silver-formily/reactive': workspacePath('../../packages/reactive/src/index.ts'),
      '@silver-formily/reactive-vue': workspacePath('../../packages/reactive-vue/src/index.ts'),
      '@silver-formily/shared': workspacePath('../../packages/shared/src/index.ts'),
      '@silver-formily/validator': workspacePath('../../packages/validator/src/index.ts'),
      '@silver-formily/vue': workspacePath('../../packages/vue/src/index.ts'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 4177,
  },
})
