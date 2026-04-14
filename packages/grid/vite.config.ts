import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json' with { type: 'json' }

const externalPackages = [
  ...Object.keys(pkg.peerDependencies ?? {}),
  ...Object.keys(pkg.dependencies ?? {}),
]

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.mjs',
    },
    outDir: './dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: externalPackages,
    },
  },
  plugins: [
    dts({
      outDir: './dist',
      include: ['src'],
      entryRoot: 'src',
      insertTypesEntry: true,
      skipDiagnostics: true,
      logDiagnostics: false,
    }),
  ],
})
