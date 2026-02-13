import type { EPThemeConfig } from 'vitepress-theme-element-plus'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import Theme from '@silver-formily/docs-toolkit/theme'
import ElementPlus from 'element-plus'
import '../styles/theme.css'
import '@shikijs/vitepress-twoslash/style.css'

export default <EPThemeConfig>{
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp?.(ctx)
    ctx.app.use(ElementPlus)
    ctx.app.use(TwoslashFloatingVue)
  },
}
