import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import MultipleDemo from './basic'
import LongListDemo from './long-list'
import SingleDemo from './single'
import '../_components/demo-page.css'

export default function DemoPage() {
  return (
    <div className="demo-page">
      <NavBar back={null}>CheckListPicker 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="单选" description="点选立即回写并关闭，无需确认。"><SingleDemo /></DemoSection>
        <DemoSection title="多选" description="确认后写回，取消保留原值。"><MultipleDemo /></DemoSection>
        <DemoSection title="超长滚动列表" description="100 个选项，支持单选与多选；列表独立滚动，多选操作按钮保持在顶部。"><LongListDemo /></DemoSection>
      </div>
    </div>
  )
}
