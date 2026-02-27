import { playwright } from '@vitest/browser-playwright'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    css: true,
    setupFiles: ['vitest-browser-vue'],
    coverage: {
      provider: 'istanbul',
      reporter: ['clover', 'json', 'html'],
      include: ['src'],
      exclude: ['src/pagination/**'],
    },
    browser: {
      provider: playwright(),
      enabled: true,
      instances: [{ browser: 'chromium' }],
    },
  },
  define: {
    'process.env': JSON.stringify({}),
  },
}))
