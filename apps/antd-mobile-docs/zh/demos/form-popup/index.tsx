import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import LoadingDemo from './loading'
import MiddlewareDemo from './middleware'
import PickerLikeDemo from './picker-like'
import '../_components/demo-page.css'

export default function DemoPage() {
  return (
    <div className="demo-page">
      <NavBar back={null}>FormPopup 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection title="基础表单弹层" description="自动创建 form、注入 FormProvider，确认后默认返回 form.values。"><BasicDemo /></DemoSection>
        <DemoSection title="自定义头尾与 middleware" description="通过 header / footer 自定义区域和 saveDraft() 动态动作，分别处理草稿与发布。"><MiddlewareDemo /></DemoSection>
        <DemoSection title="打开前异步加载" description="等待超过 100ms 自动展示 Loading，加载完成后打开表单。"><LoadingDemo /></DemoSection>
        <DemoSection title="Picker 风格头部" description="将取消和确定放在顶部，隐藏底部按钮区。"><PickerLikeDemo /></DemoSection>
      </div>
    </div>
  )
}
