import vueJsx from '@vitejs/plugin-vue-jsx'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vueJsx()],
  test: {
    include: ['src/__tests__/**/*.spec.{ts,tsx}'],
    setupFiles: ['vitest-browser-vue'],
    coverage: {
      provider: 'istanbul',
      reporter: ['clover', 'json', 'html'],
      include: ['src'],
      exclude: ['src/**/__tests__/**'],
    },
    browser: {
      provider: playwright(),
      enabled: true,
      instances: [{ browser: 'chromium' }],
    },
  },
  define: {
    'process.env': JSON.stringify({}),
    '__VUE_OPTIONS_API__': true,
    '__VUE_PROD_DEVTOOLS__': false,
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false,
  },
})
