import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import ForceClearDemo from './force-clear'
import '../_components/demo-page.css'

export default function ResetDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Reset 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection
          title="基础使用"
          description="默认重置回 initialValues，并触发一次重新校验。"
        >
          <BasicDemo />
        </DemoSection>
        <DemoSection
          title="强制清空"
          description="forceClear 会清空到空值而非初始值，validate 控制是否触发校验。"
        >
          <ForceClearDemo />
        </DemoSection>
      </div>
    </div>
  )
}
