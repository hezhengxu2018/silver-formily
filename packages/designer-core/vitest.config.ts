import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/__tests__/**/*.test.ts'],
          exclude: ['src/__tests__/**/*.browser.test.ts'],
          coverage: {
            provider: 'istanbul',
            reporter: ['clover', 'json', 'html'],
            include: ['src'],
          },
        },
      },
      {
        test: {
          name: 'browser',
          include: ['src/__tests__/**/*.browser.test.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [
              { browser: 'chromium' },
            ],
          },
        },
      },
    ],
  },
})
