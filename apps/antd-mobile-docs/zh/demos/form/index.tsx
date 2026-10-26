import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import InheritedDemo from './inherited'
import PreviewDemo from './preview'
import '../_components/demo-page.css'

export default function FormDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Form 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="基础提交与校验" description="清空用户名后提交可查看校验反馈，重置恢复初始值。">
          <BasicDemo />
        </DemoSection>
        <DemoSection title="继承表单实例" description="从外层 FormProvider 获取实例，并使用垂直布局。">
          <InheritedDemo />
        </DemoSection>
        <DemoSection title="预览占位符" description="阅读态下，空邮箱显示自定义占位符。">
          <PreviewDemo />
        </DemoSection>
      </div>
    </div>
  )
}
