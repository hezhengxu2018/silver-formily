import type { MobilePreviewRegistry } from '@silver-formily/docs-toolkit/theme'
import Theme, { mobilePreviewRegistryKey } from '@silver-formily/docs-toolkit/theme'
import DocsDemoRenderer from './components/docs-demo-renderer.vue'
import MobileDemoSection from './components/mobile-demo-section.vue'
import { docsDemoRegistryKey } from './docs-demo-registry'
import 'vant/lib/index.css'
import './demo-checker-group.css'

if (!import.meta.env.SSR) {
  import('@vant/touch-emulator')
}

const demoRegistry = Object.fromEntries(
  Object.entries(import.meta.glob('../../zh/demos/**/*.vue')).map(([path, loader]) => [
    path.replace('../../', ''),
    loader,
  ]),
) as MobilePreviewRegistry

export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp?.(ctx)
    ctx.app.component('DocsDemoRenderer', DocsDemoRenderer)
    ctx.app.component('MobileDemoSection', MobileDemoSection)
    ctx.app.provide(docsDemoRegistryKey, demoRegistry)
    ctx.app.provide(mobilePreviewRegistryKey, demoRegistry)
  },
}
