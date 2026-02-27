import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { Input } from '../../index'
import Form from '../form.vue'
import 'element-plus/theme-chalk/index.css'

describe('form', () => {
  it('应该支持基础渲染', async () => {
    const form = createForm()
    const { container } = render(() => (
      <Form form={form}>
        <button type="submit">提交</button>
      </Form>
    ))

    // 应该通过查询 DOM 元素而不是使用角色定位
    const formElement = container.querySelector('form')
    expect(formElement).toBeInTheDocument()
  })

  it('应该未提供任何form实例时无法渲染', async () => {
    const { container } = render(() => <Form />)
    const formElement = container.querySelector('form')
    expect(formElement).not.toBeInTheDocument()
  })

  it('应该表单提交功能', async () => {
    const form = createForm()
    const mockSubmit = vi.fn(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })
    })
    const { getByText, getByRole } = render(() => (
      <Form form={form} onAutoSubmit={mockSubmit}>
        <Field name="name" component={[Input]} />
        <button type="submit">提交</button>
      </Form>
    ))

    await getByText('提交').click()
    getByRole('button', { name: '提交' }).selector.includes('.is-loading')
    expect(mockSubmit).toHaveBeenCalled()
  })

  it('应该支持表单提交失败处理', async () => {
    const form = createForm()
    form.createField({
      name: 'name',
      required: true,
      validator: { required: true, message: '请输入姓名' },
    })

    const mockSubmit = vi.fn(() => Promise.resolve(true))
    const mockSubmitFailed = vi.fn()

    const { getByText } = render(() => (
      <Form form={form} onAutoSubmit={mockSubmit} onAutoSubmitFailed={mockSubmitFailed}>
        <Field name="name" component={[Input]} />
        <button type="submit">提交</button>
      </Form>
    ))

    await getByText('提交').click()

    expect(mockSubmitFailed).toHaveBeenCalled()
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('应该正常触发表单提交事件，在外部有FormProvider时', async () => {
    const form = createForm()
    const mockSubmit = vi.fn(() => {
      return Promise.resolve(true)
    })
    const { getByText } = render(() => (
      <FormProvider form={form}>
        <Form onAutoSubmit={mockSubmit}>
          <Field name="name" component={[Input]} />
          <button type="submit">提交</button>
        </Form>
      </FormProvider>
    ))

    // 模拟事件对象
    const submitButton = getByText('提交')

    await submitButton.click()
    expect(mockSubmit).toHaveBeenCalled()
  })

  it('应该处理异步结果，在表单提交后', async () => {
    const form = createForm()
    const mockSubmitResult = { success: true, data: { id: 1 } }
    const mockSubmit = vi.fn(() => Promise.resolve(mockSubmitResult))

    const { getByText } = render(() => (
      <Form form={form} onAutoSubmit={mockSubmit}>
        <Field name="name" component={[Input]} />
        <button type="submit">提交</button>
      </Form>
    ))

    await getByText('提交').click()

    // 验证提交函数被调用
    expect(mockSubmit).toHaveBeenCalled()

    // 等待异步操作完成
    await new Promise(resolve => setTimeout(resolve, 0))

    // 验证提交函数返回了预期的结果
    expect(mockSubmit).toHaveReturnedWith(Promise.resolve(mockSubmitResult))
  })

  it('应该支持修改预览占位符', async () => {
    const form = createForm()
    const { getByText } = render(() => (
      <Form form={form} previewTextPlaceholder="--">
        <Field name="name" component={[Input]} readPretty={true} />
      </Form>
    ))

    await expect.element(getByText('--')).toBeInTheDocument()
  })

  it('应该支持传入 form 实例', async () => {
    const form = createForm()
    const { getByRole } = render(() => (
      <Form form={form}>
        <Field
          name="test"
          component={[Input]}
        />
      </Form>
    ))
    await getByRole('textbox').fill('123')
    expect(form.values.test).toEqual('123')
  })

  it('应该支持继承外部 form 实例', async () => {
    const form = createForm()
    const { getByRole } = render(() => (
      <FormProvider form={form}>
        <Form>
          <Field
            name="test"
            component={[Input]}
          />
        </Form>
      </FormProvider>
    ))
    await getByRole('textbox').fill('123')
    expect(form.values.test).toEqual('123')
  })
})
