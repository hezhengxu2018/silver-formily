import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { Input } from '../../input'
import PreviewText from '../index'
import 'vant/lib/index.css'

describe('previewText.Input', () => {
  it('应该在 readPretty 模式下显示字段值', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="input"
          initialValue="测试文本"
          readPretty={true}
          component={[Input]}
        />
      </FormProvider>
    ))

    expect(container.textContent).toContain('测试文本')
  })

  it('应该在空值时显示默认占位符', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="input"
          initialValue={null}
          readPretty={true}
          component={[Input]}
        />
      </FormProvider>
    ))

    expect(container.textContent).toContain('N/A')
  })

  it('应该支持通过 PreviewText 提供自定义占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无内容">
        <FormProvider form={createForm()}>
          <Field
            name="input"
            initialValue={null}
            readPretty={true}
            component={[Input]}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent).toContain('暂无内容')
  })

  it('应该支持格式化函数', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="input"
          initialValue={1000}
          readPretty={true}
          component={[Input, {
            formatter: (value: number) => `¥ ${value.toLocaleString()}`,
          }]}
        />
      </FormProvider>
    ))

    expect(container.textContent).toContain('¥ 1,000')
  })
})
