import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import Demo0 from './basic'
import Demo1 from './multiple'
import Demo2 from './status'
import '../_components/demo-page.css'

export default function Demo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Selector 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="单选与选项禁用" description="单选值仍是数组，通过 dataSource 提供选项。">
          <Demo0 />
        </DemoSection>
        <DemoSection title="多选与描述" description="通过 options 设置选项，开启 multiple 进行多选。">
          <Demo1 />
        </DemoSection>
        <DemoSection title="禁用与阅读态" description="禁用状态保留选择组，阅读态展示选项标签。">
          <Demo2 />
        </DemoSection>
      </div>
    </div>
  )
}
