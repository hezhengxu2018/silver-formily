import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import '../_components/demo-page.css'

export default function DemoPage() {
  return (
    <div className="demo-page">
      <NavBar back={null}>ArrayBase 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="自定义数组布局" description="使用 ArrayBase 组合新增、删除与上下移动操作。"><BasicDemo /></DemoSection>
      </div>
    </div>
  )
}
