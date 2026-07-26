import { playwright } from '@vitest/browser-playwright'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    css: true,
    include: ['src/**/*.visual.test.tsx'],
    setupFiles: ['vitest-browser-vue'],
    browser: {
      provider: playwright(),
      enabled: true,
      instances: [
        {
          browser: 'chromium',
          viewport: {
            width: 1280,
            height: 720,
          },
        },
      ],
      expect: {
        toMatchScreenshot: {
          comparatorName: 'pixelmatch',
          comparatorOptions: {
            allowedMismatchedPixelRatio: 0.001,
          },
        },
      },
    },
  },
  define: {
    'process.env': JSON.stringify({}),
  },
}))
