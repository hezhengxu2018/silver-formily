import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import DisabledDemo from './disabled'
import LayoutDemo from './layout'
import '../_components/demo-page.css'

export default function RadioDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Radio 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection
          title="基础使用"
          description="通过字段的 dataSource 提供选项，值为选中项的值。"
        >
          <BasicDemo />
        </DemoSection>
        <DemoSection
          title="排列方向"
          description="支持 horizontal 横向排列与纵向排列，也可以通过 options 直接传入选项。"
        >
          <LayoutDemo />
        </DemoSection>
        <DemoSection
          title="禁用状态"
          description="支持选项级禁用与字段级整体禁用。"
        >
          <DisabledDemo />
        </DemoSection>
      </div>
    </div>
  )
}
