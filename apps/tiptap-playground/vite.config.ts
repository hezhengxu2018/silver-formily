import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(currentDir, '../..')
const tiptapSourceDir = path.resolve(repoRoot, 'packages/tiptap/src')
const vueSourceDir = path.resolve(repoRoot, 'packages/vue/src')
const reactiveVueSourceDir = path.resolve(repoRoot, 'packages/reactive-vue/src')

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@silver-formily/tiptap': path.resolve(tiptapSourceDir, 'index.ts'),
      '@silver-formily/tiptap/': `${tiptapSourceDir}/`,
      '@silver-formily/vue': path.resolve(vueSourceDir, 'index.ts'),
      '@silver-formily/vue/': `${vueSourceDir}/`,
      '@silver-formily/reactive-vue': path.resolve(reactiveVueSourceDir, 'index.ts'),
      '@silver-formily/reactive-vue/': `${reactiveVueSourceDir}/`,
    },
    dedupe: [
      'vue',
      '@tiptap/core',
      '@tiptap/pm',
      '@tiptap/starter-kit',
    ],
  },
  server: {
    port: 4177,
  },
  optimizeDeps: {
    exclude: [
      '@silver-formily/tiptap',
      '@silver-formily/vue',
      '@silver-formily/reactive-vue',
    ],
    include: [
      '@formily/core',
      '@tiptap/core',
      '@tiptap/starter-kit',
    ],
  },
})
