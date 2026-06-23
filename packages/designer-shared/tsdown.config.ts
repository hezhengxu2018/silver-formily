import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'esm',
  unbundle: true,
  clean: true,
  sourcemap: true,
  dts: true,
  deps: {
    skipNodeModulesBundle: true,
  },
  outExtensions: () => ({
    dts: '.d.ts',
    js: '.mjs',
  }),
})
