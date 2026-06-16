import { playwright } from '@vitest/browser-playwright'
import { defineConfig, mergeConfig } from 'vitest/config'
import { dragByHtml5, dragByPointer, inspectPointerDrag } from './test/browserCommands'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    css: true,
    setupFiles: ['vitest-browser-vue'],
    coverage: {
      provider: 'istanbul',
      reporter: ['clover', 'json', 'html'],
      include: ['src'],
    },
    browser: {
      provider: playwright(),
      enabled: true,
      instances: [{ browser: 'chromium' }],
      commands: {
        dragByHtml5,
        dragByPointer,
        inspectPointerDrag,
      },
    },
  },
  define: {
    'process.env': JSON.stringify({}),
  },
}))
