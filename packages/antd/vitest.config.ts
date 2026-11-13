import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  optimizeDeps: {
    include: ['antd/es/config-provider/hooks/useCSSVarCls', 'antd/es/form/context', 'antd/es/form/style', 'dayjs/locale/zh-cn', 'dayjs/plugin/advancedFormat', 'dayjs/plugin/customParseFormat', 'dayjs/plugin/isoWeek', 'dayjs/plugin/weekOfYear', 'dayjs/plugin/weekYear'],
  },
  test: {
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['vitest-browser-react'],
    coverage: {
      provider: 'istanbul',
      reporter: ['clover', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
    },
    browser: {
      screenshotFailures: false,
      provider: playwright(),
      enabled: true,
      instances: [{ browser: 'chromium' }],
    },
  },
})
