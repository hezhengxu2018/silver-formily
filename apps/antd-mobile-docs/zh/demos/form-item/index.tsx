import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import LabelDemo from './label'
import ValidationDemo from './validation'
import '../_components/demo-page.css'

export default function FormItemDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>FormItem 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection
          title="基础使用"
          description="通过 help 展示常驻帮助文案，extra 展示右侧补充内容。"
        >
          <BasicDemo />
        </DemoSection>
        <DemoSection
          title="表单校验"
          description="配合字段的 validator 使用，校验失败自动展示错误反馈。"
        >
          <ValidationDemo />
        </DemoSection>
        <DemoSection
          title="标签配置"
          description="支持 labelWidth、labelAlign 覆盖布局，tooltip 提供气泡说明。"
        >
          <LabelDemo />
        </DemoSection>
      </div>
    </div>
  )
}
