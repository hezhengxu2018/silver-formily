import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import Compact from './compact'
import CompactRounded from './compact-rounded'
import Horizontal from './horizontal'
import Rounded from './rounded'
import Sticky from './sticky'
import Vertical from './vertical'
import '../_components/demo-page.css'

export default function FormButtonGroupDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>FormButtonGroup 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="纵向布局" description="默认满宽，按钮之间保留间距。"><Vertical /></DemoSection>
        <DemoSection title="横向布局" description="多个按钮等宽排列。"><Horizontal /></DemoSection>
        <DemoSection title="紧凑布局" description="无间距连体按钮，默认直角。"><Compact /></DemoSection>
        <DemoSection title="紧凑布局统一圆角" description="按钮组统一开启圆角，首尾圆润，中间无间距连接。"><CompactRounded /></DemoSection>
        <DemoSection title="统一圆角" description="由按钮组统一设置 shape，优先于子按钮配置。"><Rounded /></DemoSection>
        <DemoSection title="滚动吸底" description="表单进入屏幕后才吸附，离开后停止悬浮。"><Sticky /></DemoSection>
      </div>
    </div>
  )
}
