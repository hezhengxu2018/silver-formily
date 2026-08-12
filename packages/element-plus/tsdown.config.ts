import process from 'node:process'
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
  dts: process.env.DOCS_BUILD
    ? false
    : {
        vue: true,
      },
  css: {
    inject: true,
  },
  deps: {
    neverBundle: [
      'lodash-es',
      '@element-plus/icons-vue',
      'vue-draggable-plus',
    ],
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
