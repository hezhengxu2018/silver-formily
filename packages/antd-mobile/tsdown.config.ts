import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'esm',
  platform: 'neutral',
  unbundle: true,
  clean: true,
  sourcemap: true,
  dts: true,
  css: {
    inject: true,
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  deps: {
    skipNodeModulesBundle: true,
  },
  outExtensions: () => ({
    dts: '.d.ts',
    js: '.mjs',
  }),
})
