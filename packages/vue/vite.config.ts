import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import glob from 'fast-glob'
import dts from 'unplugin-dts/vite'
import { defineConfig } from 'vite'
import pkg from './package.json' with { type: 'json' }

const externalPackages = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
]

function resolve(dir) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  return path.resolve(__dirname, dir)
}

// 获取导出入口
export function getComponentEntries() {
  return Object.fromEntries(
    glob
      .sync('src/**/*.{ts,tsx}', {
        ignore: ['src/**/*.test.{ts,tsx}', 'src/**/__tests__/**'],
      })
      .map(file => [
        path.relative('src', file.slice(0, file.length - path.extname(file).length)),
        resolve(file),
      ]),
  )
}

export default defineConfig({
  build: {
    lib: {
      entry: getComponentEntries(),
      formats: ['es'],
      fileName: (format, fileName) => {
        const extension = format === 'cjs' ? 'js' : 'mjs'
        return `${fileName}.${extension}`
      },
    },
    rollupOptions: {
      external: externalPackages,
      output: {
        preserveModules: true,
      },
      treeshake: {
        moduleSideEffects: (id) => {
          if (id.includes('@formily/shared')) {
            return false
          }
          return true
        },
      },
    },
    outDir: './esm',
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: true,
  },
  plugins: [
    vue(),
    dts({
      include: ['src'],
      vue: true,
    }),
  ],
})
