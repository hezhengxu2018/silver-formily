import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Input from '../../input'
import 'element-plus/theme-chalk/index.css'

describe('previewText.Input', () => {
  it('应该支持基础输入框显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="input"
            initialValue="测试文本"
            readPretty={true}
            component={[Input]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('测试文本')
  })

  it('应该支持空值显示占位符', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="input"
            initialValue={null}
            readPretty={true}
            component={[Input]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('N/A')
  })

  it('应该支持使用格式化函数', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="input"
            initialValue={1000}
            readPretty={true}
            component={[Input, {
              formatter: (value: number) => `¥ ${value.toLocaleString()}`,
            }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('¥ 1,000')
  })

  it('应该支持渲染前置插槽', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="input"
            initialValue="测试文本"
            readPretty={true}
            component={[Input]}
          >
            {{
              prepend: () => <span class="prepend-content">前置内容</span>,
            }}
          </Field>
        </FormProvider>
      ),
    )
    expect(container.querySelector('.prepend-content')).not.toBeNull()
    expect(container.textContent).toContain('前置内容')
    expect(container.textContent).toContain('测试文本')
  })

  it('应该支持渲染前缀插槽', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="input"
            initialValue="测试文本"
            readPretty={true}
            component={[Input]}
          >
            {{
              prefix: () => <span class="prefix-content">前缀</span>,
            }}
          </Field>
        </FormProvider>
      ),
    )
    expect(container.querySelector('.prefix-content')).not.toBeNull()
    expect(container.textContent).toContain('前缀')
    expect(container.textContent).toContain('测试文本')
  })

  it('应该支持渲染后缀插槽', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="input"
            initialValue="测试文本"
            readPretty={true}
            component={[Input]}
          >
            {{
              suffix: () => <span class="suffix-content">后缀</span>,
            }}
          </Field>
        </FormProvider>
      ),
    )
    expect(container.querySelector('.suffix-content')).not.toBeNull()
    expect(container.textContent).toContain('后缀')
    expect(container.textContent).toContain('测试文本')
  })

  it('应该支持渲染后置插槽', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="input"
            initialValue="测试文本"
            readPretty={true}
            component={[Input]}
          >
            {{
              append: () => <span class="append-content">后置内容</span>,
            }}
          </Field>
        </FormProvider>
      ),
    )
    expect(container.querySelector('.append-content')).not.toBeNull()
    expect(container.textContent).toContain('后置内容')
    expect(container.textContent).toContain('测试文本')
  })

  it('应该支持同时渲染多个插槽', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="input"
            initialValue="测试文本"
            readPretty={true}
            component={[Input]}
          >
            {{
              prepend: () => <span class="prepend-content">前置</span>,
              prefix: () => <span class="prefix-content">前缀</span>,
              suffix: () => <span class="suffix-content">后缀</span>,
              append: () => <span class="append-content">后置</span>,
            }}
          </Field>
        </FormProvider>
      ),
    )
    expect(container.querySelector('.prepend-content')).not.toBeNull()
    expect(container.querySelector('.prefix-content')).not.toBeNull()
    expect(container.querySelector('.suffix-content')).not.toBeNull()
    expect(container.querySelector('.append-content')).not.toBeNull()
    expect(container.textContent).toContain('前置')
    expect(container.textContent).toContain('前缀')
    expect(container.textContent).toContain('测试文本')
    expect(container.textContent).toContain('后缀')
    expect(container.textContent).toContain('后置')
  })
})
