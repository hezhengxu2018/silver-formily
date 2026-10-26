import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import ColumnsDemo from './columns'
import PatternsDemo from './patterns'
import '../_components/demo-page.css'

export default function DemoPage() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Picker 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="基础使用" description="点击表单项整行打开，确认后提交；取消不改变字段，支持必填校验与重置。"><BasicDemo /></DemoSection>
        <DemoSection title="两列选择" description="通过二维 dataSource 配置温度和饮品两列，提交值为数组。"><ColumnsDemo /></DemoSection>
        <DemoSection title="字段状态" description="整行触发、禁用、只读和自定义预览展示。"><PatternsDemo /></DemoSection>
      </div>
    </div>
  )
}
