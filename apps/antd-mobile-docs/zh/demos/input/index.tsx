import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import StatusDemo from './status'
import TextAreaDemo from './textarea'
import '../_components/demo-page.css'

export default function InputDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Input 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection
          title="基础使用"
          description="通过 type 指定输入类型，placeholder 提示占位文案。"
        >
          <BasicDemo />
        </DemoSection>
        <DemoSection
          title="多行输入"
          description="使用 Input.TextArea 渲染多行文本，支持字数统计与自适应高度。"
        >
          <TextAreaDemo />
        </DemoSection>
        <DemoSection
          title="状态控制"
          description="支持 clearable 快速清空，以及只读、禁用两种状态。"
        >
          <StatusDemo />
        </DemoSection>
      </div>
    </div>
  )
}
