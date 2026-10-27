import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import AsyncOptionsDemo from './async-options'
import Demo0 from './basic'
import Demo1 from './preview'
import '../_components/demo-page.css'

export default function Demo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Cascader 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="弹层选择" description="点击整行打开，确认自动写回，取消保留原值。">
          <Demo0 />
        </DemoSection>
        <DemoSection title="异步层级加载" description="选中父级后加载子级，显示加载骨架并缓存结果。">
          <AsyncOptionsDemo />
        </DemoSection>
        <DemoSection title="字段状态与展示" description="禁用阻止打开，只读允许查看，阅读态仅展示标签。">
          <Demo1 />
        </DemoSection>
      </div>
    </div>
  )
}
