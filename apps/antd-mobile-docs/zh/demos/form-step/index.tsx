import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import InternalInstanceDemo from './internal-instance'
import '../_components/demo-page.css'

export default function DemoPage() {
  return (
    <div className="demo-page">
      <NavBar back={null}>FormStep 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="分步表单" description="校验当前可见字段后前进，返回时保留已填写的数据。"><BasicDemo /></DemoSection>
        <DemoSection title="内部实例与隐藏步骤条" description="使用 JSON Schema，通过 useFormStep() 获取内部控制器。"><InternalInstanceDemo /></DemoSection>
      </div>
    </div>
  )
}
