import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import AppearanceDemo from './appearance'
import BasicDemo from './basic'
import StatusDemo from './status'
import '../_components/demo-page.css'

export default function SegmentedDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Segmented 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="基础使用" description="操作控件后提交查看结果，也可以重置字段。">
          <BasicDemo />
        </DemoSection>
        <DemoSection title="数据源与禁用选项">
          <AppearanceDemo />
        </DemoSection>
        <DemoSection title="字段状态" description="对比禁用、只读与阅读态。">
          <StatusDemo />
        </DemoSection>
      </div>
    </div>
  )
}
