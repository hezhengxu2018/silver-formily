import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import BasicDemo from './basic'
import LoadingDemo from './loading'
import ValidateDemo from './validate'
import '../_components/demo-page.css'

export default function SubmitDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>Submit 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection
          title="基础使用"
          description="提交时自动触发整表校验，校验通过后回调 onSubmit 并拿到表单值。"
        >
          <BasicDemo />
        </DemoSection>
        <DemoSection
          title="异步提交"
          description="onSubmit 返回 Promise 时按钮自动进入 loading 状态。"
        >
          <LoadingDemo />
        </DemoSection>
        <DemoSection
          title="校验反馈"
          description="onSubmitFailed 在校验失败时回调，可在此给出轻提示。"
        >
          <ValidateDemo />
        </DemoSection>
      </div>
    </div>
  )
}
