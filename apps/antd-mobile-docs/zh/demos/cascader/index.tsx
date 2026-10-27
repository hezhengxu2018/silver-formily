import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import Demo0 from './basic'
import Demo1 from './preview'
import '../_components/demo-page.css'

export default function Demo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Cascader 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="弹层选择" description="显式控制弹层开关，在确认后写回字段值。">
          <Demo0 />
        </DemoSection>
        <DemoSection title="阅读态" description="根据字段数据源展示已选路径的标签。">
          <Demo1 />
        </DemoSection>
      </div>
    </div>
  )
}
