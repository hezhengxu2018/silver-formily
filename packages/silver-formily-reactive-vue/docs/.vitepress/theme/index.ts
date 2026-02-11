import { ElTag } from 'element-plus'
import {
  VitepressEpDemoBox,
  VitepressEpDemoPlaceholder,
} from 'vitepress-better-demo-plugin/theme/element-plus'
import Theme from 'vitepress-theme-element-plus'
import './styles/theme.css'
import 'virtual:group-icons.css'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component('ElTag', ElTag)
    app.component('VitepressDemoBox', VitepressEpDemoBox)
    app.component('VitepressDemoPlaceholder', VitepressEpDemoPlaceholder)
  },
} as typeof Theme
