import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import PrecisionDemo from './precision'
import WeekQuarterDemo from './week-quarter'
import '../_components/demo-page.css'

export default function DatePickerDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>DatePicker 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection
          title="基础使用"
          description="值为字符串格式的日期，点击后弹出日期选择器。"
        >
          <BasicDemo />
        </DemoSection>
        <DemoSection
          title="精度控制"
          description="通过 picker 指定 year / month 精度，showTime 开启日期时间选择。"
        >
          <PrecisionDemo />
        </DemoSection>
        <DemoSection
          title="周与季度"
          description="picker 支持扩展的 week 与 quarter 精度，值格式自动匹配。"
        >
          <WeekQuarterDemo />
        </DemoSection>
      </div>
    </div>
  )
}
