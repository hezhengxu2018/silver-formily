import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import ChildrenDemo from './children'
import FormStepDemo from './form-step'
import LifecycleDemo from './lifecycle'
import '../_components/demo-page.css'

export default function DemoPage() {
  return (
    <div className="demo-page">
      <NavBar back={null}>createPopup 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="选择主题色" description="确认后更新选择，提交查看结果。"><BasicDemo /></DemoSection>
        <DemoSection title="动态参数与关闭" description="修改名字后打开；此示例禁止点击遮罩关闭。"><LifecycleDemo /></DemoSection>
        <DemoSection title="React children" description="从顶部打开，通过 onConfirm 完成会话。"><ChildrenDemo /></DemoSection>
        <DemoSection title="结合 FormStep" description="在弹层内逐步校验并填写配送信息，最终确认返回完整表单值。"><FormStepDemo /></DemoSection>
      </div>
    </div>
  )
}
