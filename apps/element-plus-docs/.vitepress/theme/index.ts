import type { EnhanceAppContext, Theme as VitePressTheme } from 'vitepress'
import BaseTheme from '@silver-formily/docs-toolkit/theme'
import ElementPlus, { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import '../styles/theme.css'

const theme = {
  ...BaseTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    // Provide stable SSR ids before any theme/plugin code touches Element Plus.
    ctx.app.provide(ID_INJECTION_KEY, { prefix: 0, current: 0 })
    ctx.app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
    BaseTheme.enhanceApp?.(ctx)
    ctx.app.use(ElementPlus)
  },
} satisfies VitePressTheme

export default theme
