import { ElTag } from "element-plus"
import {
  VitepressEpDemoBox,
  VitepressEpDemoPlaceholder,
} from "vitepress-better-demo-plugin/theme/element-plus"
import Theme from "vitepress-theme-element-plus"
import "./styles/theme.css"
import "virtual:group-icons.css"

export default {
  ...Theme,
  enhanceApp(ctx) {
    Theme.enhanceApp?.(ctx)
    ctx.app.component("ElTag", ElTag)
    ctx.app.component("VitepressDemoBox", VitepressEpDemoBox)
    ctx.app.component("VitepressDemoPlaceholder", VitepressEpDemoPlaceholder)
  },
}
