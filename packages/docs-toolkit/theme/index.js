import { ElTag } from 'element-plus'
import {
  VitepressEpDemoBox,
  VitepressEpDemoPlaceholder,
} from 'vitepress-better-demo-plugin/theme/element-plus'
import vitepressNprogress from 'vitepress-plugin-nprogress'
import Theme, { mobilePreviewRegistryKey } from 'vitepress-theme-element-plus'
import 'vitepress-plugin-nprogress/lib/css/index.css'
import './styles/theme.css'
import 'virtual:group-icons.css'

export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp?.(ctx)
    vitepressNprogress(ctx)
    ctx.app.component('ElTag', ElTag)
    ctx.app.component('VitepressDemoBox', VitepressEpDemoBox)
    ctx.app.component('VitepressDemoPlaceholder', VitepressEpDemoPlaceholder)
  },
}

export { mobilePreviewRegistryKey }
