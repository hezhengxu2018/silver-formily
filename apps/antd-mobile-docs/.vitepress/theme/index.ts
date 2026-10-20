import type { MobilePreviewRegistry } from '@silver-formily/docs-toolkit/theme'
import Theme, { mobilePreviewRegistryKey, withThemeSync } from '@silver-formily/docs-toolkit/theme'
import { createReactDemoRegistry } from './react-demo'
import './style.css'

if (!import.meta.env.SSR) {
  import('@vant/touch-emulator')
}

const demoRegistry = createReactDemoRegistry(
  import.meta.glob([
    '../../zh/demos/**/*.tsx',
    '!../../zh/demos/_**',
    '!../../zh/demos/shared.tsx',
  ]),
) as MobilePreviewRegistry

export default {
  ...Theme,
  Layout: withThemeSync(Theme.Layout, (isDark, root) => {
    root.dataset.prefersColorScheme = isDark ? 'dark' : 'light'
  }),
  enhanceApp(ctx) {
    Theme.enhanceApp?.(ctx)
    ctx.app.provide(mobilePreviewRegistryKey, demoRegistry)
  },
}
