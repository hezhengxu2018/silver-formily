import vueJsx from '@vitejs/plugin-vue-jsx'
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
  deps: {
    skipNodeModulesBundle: true,
  },
  plugins: [
    Vue({ isProduction: true }),
    // @ts-expect-error Vite plugin is supported by tsdown plugins
    vueJsx(),
  ],
  outExtensions: () => ({
    dts: '.d.ts',
    js: '.mjs',
  }),
})
