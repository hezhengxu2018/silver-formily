import Theme from '@silver-formily/docs-toolkit/theme'
import ElementPlus, { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import '../styles/theme.css'

export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp?.(ctx)
    ctx.app.use(ElementPlus)
    ctx.app.provide(ID_INJECTION_KEY, { prefix: 0, current: 0 })
    ctx.app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
  },
}
