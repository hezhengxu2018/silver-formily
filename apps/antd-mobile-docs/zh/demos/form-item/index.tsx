import { NavBar } from 'antd-mobile'
import { DemoSection } from '../_components/demo-section'
import AppearanceDemo from './appearance'
import BasicDemo from './basic'
import LabelDemo from './label'
import LongTextDemo from './long-text'
import StatesDemo from './states'
import TooltipDemo from './tooltip'
import ValidationDemo from './validation'
import VerticalDemo from './vertical'
import '../_components/demo-page.css'

export default function FormItemDemo() {
  return (
    <div className="demo-page">
      <NavBar back={null}>FormItem 预览</NavBar>
      <div className="demo-page__body">
        <DemoSection
          title="基础使用"
          description="通过 help 展示常驻帮助文案，extra 展示右侧补充内容。"
        >
          <BasicDemo />
        </DemoSection>
        <DemoSection
          title="表单校验"
          description="配合字段的 validator 使用，校验失败自动展示错误反馈。"
        >
          <ValidationDemo />
        </DemoSection>
        <DemoSection
          title="标签配置"
          description="对照 80px 与 120px 标签宽度、左右对齐，通过 placeholder 观察输入区位置。"
        >
          <LabelDemo />
        </DemoSection>
        <DemoSection title="长文本：省略与换行" description="对照标签单行省略、完整换行，以及阅读内容保留换行；点击省略的标签查看全文。">
          <LongTextDemo />
        </DemoSection>
        <DemoSection title="禁用与只读" description="对照正常输入、禁用、只读输入框和纯文本阅读状态。">
          <StatesDemo />
        </DemoSection>
        <DemoSection title="垂直布局" description="标签与控件上下排列，长标签可换行；单个表单项也可覆盖为横向布局。">
          <VerticalDemo />
        </DemoSection>
        <DemoSection title="提示说明" description="点击图标或标签文字展开说明，长文本与连续链接在窄屏内自动换行。">
          <TooltipDemo />
        </DemoSection>
        <DemoSection title="外观与控件布局" description="对照分隔线、固定宽度控件靠右，以及隐藏标签后的整行输入。">
          <AppearanceDemo />
        </DemoSection>
      </div>
    </div>
  )
}
