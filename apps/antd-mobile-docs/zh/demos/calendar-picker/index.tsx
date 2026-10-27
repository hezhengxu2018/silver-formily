import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import OptionsDemo from './options'
import RangeDemo from './range'
import StatusDemo from './status'
import '../_components/demo-page.css'

export default function CalendarPickerDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>CalendarPicker 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="基础使用" description="选择单日，确认后提交格式化日期。">
          <BasicDemo />
        </DemoSection>
        <DemoSection title="日期范围" description="选择起止日期，也可以通过表单项右侧按钮清空。">
          <RangeDemo />
        </DemoSection>
        <DemoSection title="格式与日期限制" description="仅可选择 2026 年 10 月的工作日，以 YYYY/MM/DD 格式提交。">
          <OptionsDemo />
        </DemoSection>
        <DemoSection title="字段状态" description="对比禁用、只读与阅读态。">
          <StatusDemo />
        </DemoSection>
      </div>
    </div>
  )
}
