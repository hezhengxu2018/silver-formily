import { FormButtonGroup, FormItem, FormLayout, Input, Reset, Submit } from '@silver-formily/antd-mobile'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { useMemo } from 'react'
import { showDemoResult } from '../shared'

export default function StickyDemo() {
  const form = useMemo(() => createForm({ initialValues: { username: '张三' } }), [])
  return (
    <FormProvider form={form}>
      <div style={{ height: '100vh', padding: 16 }}>继续向下滚动，表单进入屏幕后才会出现底部提交栏。</div>
      <FormLayout>
        <Field name="username" title="用户名" decorator={[FormItem]} component={[Input]} />
        <div style={{ minHeight: '110vh', padding: 16, color: 'var(--adm-color-weak)' }}>
          向下滚动查看吸底效果。按钮栏以当前 FormLayout 为边界，回到原位置时恢复普通布局。
        </div>
        <FormButtonGroup.Sticky zIndex={10}>
          <FormButtonGroup layout="compact">
            <Reset>重置</Reset>
            <Submit onSubmit={showDemoResult} />
          </FormButtonGroup>
        </FormButtonGroup.Sticky>
      </FormLayout>
      <div style={{ height: '100vh', padding: 16 }}>表单已结束，底部提交栏不再悬浮。</div>
    </FormProvider>
  )
}
