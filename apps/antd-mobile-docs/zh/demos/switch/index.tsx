import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import ListDemo from './list'
import StatusDemo from './status'
import '../_components/demo-page.css'

export default function SwitchDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Switch 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection
          title="基础使用"
          description="绑定布尔值，通过提交按钮查看表单结果。"
        >
          <BasicDemo />
        </DemoSection>
        <DemoSection
          title="状态与文案"
          description="支持 disabled、loading 状态，以及 checkedText / uncheckedText 开关文案。"
        >
          <StatusDemo />
        </DemoSection>
        <DemoSection
          title="搭配列表使用"
          description="将开关放入 List 场景，形成贴近系统设置页的布局。"
        >
          <ListDemo />
        </DemoSection>
      </div>
    </div>
  )
}
