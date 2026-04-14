import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'esm',
  platform: 'neutral',
  unbundle: true,
  clean: true,
  sourcemap: true,
  dts: {
    vue: true,
  },
  css: {
    inject: true,
  },
  external: [
    'lodash-es',
    '@element-plus/icons-vue',
    'vue-draggable-plus',
  ],
  deps: {
    skipNodeModulesBundle: true,
  },
  plugins: [
    Vue({ isProduction: true }),
  ],
  outExtensions: () => ({
    dts: '.d.ts',
    js: '.mjs',
  }),
})
