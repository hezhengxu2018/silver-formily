import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import Demo0 from './basic'
import Demo2 from './children'
import Demo1 from './multiple'
import '../_components/demo-page.css'

export default function Demo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>CheckList 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="基础单选" description="列表单选，字段值为数组。">
          <Demo0 />
        </DemoSection>
        <DemoSection title="多选与只读" description="支持多选、字符串选项和只读状态。">
          <Demo1 />
        </DemoSection>
        <DemoSection title="自定义列表项" description="没有数据源时可使用 CheckList.Item 自定义内容。">
          <Demo2 />
        </DemoSection>
      </div>
    </div>
  )
}
