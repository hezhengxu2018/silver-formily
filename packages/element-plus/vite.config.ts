import path from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import glob from 'fast-glob'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import pkg from './package.json' with { type: 'json' }

function resolve(dir: string) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  return path.resolve(__dirname, dir)
}

function getComponentEntries() {
  return Object.fromEntries(
    glob
      .sync('src/**/*.{ts,tsx}', {
        ignore: [
          'src/**/*.test.{ts,tsx}',
          'src/**/__test__/**',
          'src/**/__tests__/**',
        ],
      })
      .map(file => [
        path.relative('src', file.slice(0, file.length - path.extname(file).length)),
        resolve(file),
      ]),
  )
}

const externalPackages = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
]

export default defineConfig({
  build: {
    lib: {
      entry: getComponentEntries(),
      formats: ['es'],
      fileName: (_format, fileName) => `${fileName}.mjs`,
    },
    outDir: './esm',
    emptyOutDir: true,
    cssCodeSplit: true,
    sourcemap: true,
    rollupOptions: {
      external: externalPackages,
      output: {
        assetFileNames: (assetInfo) => {
          const originalFileName = assetInfo.originalFileNames?.[0]
          const originalDirName = originalFileName?.match(/src\/(.*)\/index.ts/)?.[1]
          return originalDirName
            ? `styles/${originalDirName}/[name][extname]`
            : 'styles/[name][extname]'
        },
        chunkFileNames(chunkInfo) {
          if (chunkInfo.name.includes('vue_vue')) {
            const fileName = chunkInfo.name.split('.')[0]
            const regex = /.*src\/(.+)\/[^/]+\.vue\?.*/
            const outDir = chunkInfo.moduleIds.at(-1)?.match(regex)?.[1]
            return outDir ? `${outDir}${path.sep}${fileName}.mjs` : `vendor${path.sep}${fileName}.mjs`
          }
          return `vendor${path.sep}${chunkInfo.name}.mjs`
        },
        manualChunks: {
          lodash: ['lodash-es'],
        },
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
  },
  plugins: [
    libInjectCss(),
    dts({
      outDir: ['./esm'],
      entryRoot: 'src',
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['./**/style.ts', './**/*.test.{ts,tsx}'],
      cleanVueFileName: true,
      skipDiagnostics: true,
      logDiagnostics: false,
      tsconfigPath: resolve('tsconfig.json'),
    }),
    vue(),
    vueJsx(),
  ],
})
