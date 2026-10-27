import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import ActiveIconDemo from './active-icon'
import BasicDemo from './basic'
import ChildrenDemo from './children'
import DisabledDemo from './disabled'
import ExtraDemo from './extra'
import MultipleDemo from './multiple'
import ReadOnlyDemo from './read-only'
import '../_components/demo-page.css'

export default function Demo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>CheckList 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="基础单选" description="列表单选，字段值为数组。">
          <BasicDemo />
        </DemoSection>
        <DemoSection title="多选" description="支持多选和字符串选项。">
          <MultipleDemo />
        </DemoSection>
        <DemoSection title="自定义选中图标" description="通过 activeIcon 替换默认选中图标。">
          <ActiveIconDemo />
        </DemoSection>
        <DemoSection title="自定义列表右侧区域" description="通过 extra 根据选中状态渲染右侧内容。">
          <ExtraDemo />
        </DemoSection>
        <DemoSection title="整组只读" description="保留选中值，无法修改选择。">
          <ReadOnlyDemo />
        </DemoSection>
        <DemoSection title="禁用" description="支持单项禁用和整组禁用。">
          <DisabledDemo />
        </DemoSection>
        <DemoSection title="自定义列表项" description="没有数据源时可使用 CheckList.Item 自定义内容。">
          <ChildrenDemo />
        </DemoSection>
      </div>
    </div>
  )
}
