import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import PatternsDemo from './patterns'
import '../_components/demo-page.css'

export default function CascadePickerDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>CascadePicker 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="省市区联动" description="点击表单项整行打开，确认后保存路径数组，支持清空、必填校验与重置。"><BasicDemo /></DemoSection>
        <DemoSection title="字段状态" description="禁用态不可打开，只读态可查看选项，预览态支持自定义展示。"><PatternsDemo /></DemoSection>
      </div>
    </div>
  )
}
