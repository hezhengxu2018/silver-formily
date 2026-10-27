import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import Demo0 from './basic'
import Demo1 from './precision'
import Demo2 from './status'
import '../_components/demo-page.css'

export default function Demo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Stepper 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="基础使用" description="限制数量范围，点击加减或直接输入。">
          <Demo0 />
        </DemoSection>
        <DemoSection title="步长与精度" description="支持小数步长、价格格式化和字符串高精度模式。">
          <Demo1 />
        </DemoSection>
        <DemoSection title="状态控制" description="区分禁用、禁止键入和阅读态。">
          <Demo2 />
        </DemoSection>
      </div>
    </div>
  )
}
