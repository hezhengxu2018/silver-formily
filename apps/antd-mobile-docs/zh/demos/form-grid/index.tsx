import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import ItemDemo from './item'
import SchemaDemo from './schema'
import '../_components/demo-page.css'

export default function FormGridDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>FormGrid 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="基础使用" description="固定两列，普通 HTML 节点直接参与布局。">
          <BasicDemo />
        </DemoSection>
        <DemoSection title="跨列布局" description="指定跨度，或使用 -1 填满当前行的剩余列。">
          <ItemDemo />
        </DemoSection>
        <DemoSection title="Schema 表单" description="姓名与手机号并排，地址跨两列，提交查看表单结果。">
          <SchemaDemo />
        </DemoSection>
      </div>
    </div>
  )
}
