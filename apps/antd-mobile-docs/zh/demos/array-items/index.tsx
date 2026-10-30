import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import PrimitiveDemo from './primitive'
import '../_components/demo-page.css'

export default function DemoPage() {
  return (
    <div className="demo-page">
      <NavBar back={null}>ArrayItems 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="联系人" description="分组卡片、新增默认值与必填校验。"><BasicDemo /></DemoSection>
        <DemoSection title="基础类型数组" description="默认列表模式，支持上下移动与删除。"><PrimitiveDemo /></DemoSection>
      </div>
    </div>
  )
}
