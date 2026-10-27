import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import AppearanceDemo from './appearance'
import BasicDemo from './basic'
import StatusDemo from './status'
import '../_components/demo-page.css'

export default function RateDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Rate 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="基础使用" description="绑定数字评分，提交查看表单结果。">
          <BasicDemo />
        </DemoSection>
        <DemoSection title="半星与自定义外观" description="支持半星、自定义字符、数量、大小和颜色。">
          <AppearanceDemo />
        </DemoSection>
        <DemoSection title="字段状态" description="禁用、只读和阅读态均保留评分展示，并阻止修改。">
          <StatusDemo />
        </DemoSection>
      </div>
    </div>
  )
}
