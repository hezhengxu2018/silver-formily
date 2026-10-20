import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import SettingsDemo from './settings'
import VerticalDemo from './vertical'
import '../_components/demo-page.css'

export default function FormLayoutDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>FormLayout 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection
          title="基础使用"
          description="默认水平布局，FormItem 继承 FormLayout 的统一样式。"
        >
          <BasicDemo />
        </DemoSection>
        <DemoSection
          title="垂直布局"
          description="layout 属性设为 vertical，标签与控件上下排布，适合窄屏表单。"
        >
          <VerticalDemo />
        </DemoSection>
        <DemoSection
          title="全局配置下发"
          description="labelWidth、labelAlign、tooltipLayout 等属性会批量下发给内部的 FormItem。"
        >
          <SettingsDemo />
        </DemoSection>
      </div>
    </div>
  )
}
