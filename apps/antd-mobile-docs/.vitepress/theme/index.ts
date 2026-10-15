import type { MobilePreviewRegistry } from '@silver-formily/docs-toolkit/theme'
import Theme, { mobilePreviewRegistryKey } from '@silver-formily/docs-toolkit/theme'
import { createReactDemoRegistry } from './react-demo'
import 'antd-mobile/es/global/global.css'
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
  enhanceApp(ctx) {
    Theme.enhanceApp?.(ctx)
    ctx.app.provide(mobilePreviewRegistryKey, demoRegistry)
  },
}
