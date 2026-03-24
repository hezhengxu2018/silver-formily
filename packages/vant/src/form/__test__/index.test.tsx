import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { Form } from '../../form'
import FormItem from '../../form-item'
import { Input } from '../../input'
import 'vant/lib/index.css'

function getHtmlElement(container: Element, selector: string) {
  return container.querySelector<HTMLElement>(selector)!
}

describe('form', () => {
  it('应该把 Form 布局属性透传给内部 FormItem', async () => {
    const { container } = render(() => (
      <Form form={createForm()} labelWidth="6em" labelAlign="left">
        <Field
          name="username"
          title="用户名"
          decorator={[FormItem]}
          component={[Input]}
        />
      </Form>
    ))

    await expect.element(getHtmlElement(container, '.van-field__label')).toHaveStyle({
      width: '6em',
      textAlign: 'left',
    })
  })

  it('应该支持通过 Form 统一控制标签冒号', async () => {
    const { container } = render(() => (
      <Form colon={true}>
        <FormItem label="用户名">
          <Input modelValue="hello" />
        </FormItem>
      </Form>
    ))

    expect(container.textContent).toContain('用户名:')
  })

  it('应该在显式传入 form 时走 Formily submit', async () => {
    const onAutoSubmit = vi.fn()
    const form = createForm({
      values: {
        username: 'silver-formily',
      },
    })

    render(() => (
      <Form form={form} onAutoSubmit={onAutoSubmit}>
        <Field
          name="username"
          title="用户名"
          decorator={[FormItem]}
          component={[Input]}
        />
        <button type="submit">提交</button>
      </Form>
    ))

    await userEvent.click(document.querySelector('button')!)

    await vi.waitFor(() => {
      expect(onAutoSubmit).toHaveBeenCalledWith({
        username: 'silver-formily',
      })
    })
  })

  it('应该在未显式传入 form 时复用上层 FormProvider', async () => {
    const onAutoSubmit = vi.fn()
    const form = createForm({
      values: {
        username: 'workspace',
      },
    })

    render(() => (
      <FormProvider form={form}>
        <Form onAutoSubmit={onAutoSubmit}>
          <Field
            name="username"
            title="用户名"
            decorator={[FormItem]}
            component={[Input]}
          />
          <button type="submit">提交</button>
        </Form>
      </FormProvider>
    ))

    await userEvent.click(document.querySelector('button')!)

    await vi.waitFor(() => {
      expect(onAutoSubmit).toHaveBeenCalledWith({
        username: 'workspace',
      })
    })
  })

  it('应该允许通过 Form 统一关闭错误文案展示', async () => {
    const { container } = render(() => (
      <Form showErrorMessage={false}>
        <FormItem label="用户名" feedbackStatus="error" feedbackText="校验失败">
          <Input modelValue="hello" />
        </FormItem>
      </Form>
    ))

    expect(container.querySelector('.van-field__error-message')).toBeNull()
  })

  it('应该默认不展示错误样式', async () => {
    const { container } = render(() => (
      <Form>
        <FormItem label="用户名" feedbackStatus="error" feedbackText="校验失败">
          <Input modelValue="hello" />
        </FormItem>
      </Form>
    ))

    expect(container.querySelector('.van-field--error')).toBeNull()
    expect(container.querySelector('.van-field__error-message')?.textContent).toContain('校验失败')
  })

  it('应该允许通过 Form 显式开启错误样式展示', async () => {
    const { container } = render(() => (
      <Form showError={true}>
        <FormItem label="用户名" feedbackStatus="error" feedbackText="校验失败">
          <Input modelValue="hello" />
        </FormItem>
      </Form>
    ))

    expect(container.querySelector('.van-field--error')).not.toBeNull()
    expect(container.querySelector('input')?.className).toContain('van-field__control--error')
  })

  it('应该把输入对齐方式同步给真实输入框', async () => {
    const { container } = render(() => (
      <Form inputAlign="right">
        <FormItem label="用户名">
          <Input modelValue="silver-formily" />
        </FormItem>
      </Form>
    ))

    expect(container.querySelector('input')?.className).toContain('van-field__control--right')
  })

  it('应该把 disabled 同步给真实输入框', async () => {
    const { container } = render(() => (
      <Form disabled={true}>
        <FormItem label="用户名">
          <Input modelValue="silver-formily" />
        </FormItem>
      </Form>
    ))

    expect(container.querySelector('input')).toBeDisabled()
  })

  it('应该把 readonly 同步给真实输入框', async () => {
    const { container } = render(() => (
      <Form readonly={true}>
        <FormItem label="用户名">
          <Input modelValue="silver-formily" />
        </FormItem>
      </Form>
    ))

    expect(container.querySelector('input')).toHaveAttribute('readonly')
  })

  it('应该在未显式传入 disabled 时回退读取 Formily form 实例状态', async () => {
    const { container } = render(() => (
      <Form form={createForm({ disabled: true })}>
        <FormItem label="用户名">
          <Input modelValue="silver-formily" />
        </FormItem>
      </Form>
    ))

    expect(container.querySelector('input')).toBeDisabled()
  })

  it('应该在未显式传入 readonly 时回退读取 Formily form 实例状态', async () => {
    const { container } = render(() => (
      <Form form={createForm({ readOnly: true })}>
        <FormItem label="用户名">
          <Input modelValue="silver-formily" />
        </FormItem>
      </Form>
    ))

    expect(container.querySelector('input')).toHaveAttribute('readonly')
  })

  it('应该在提交失败时滚动到第一个错误项，并透传滚动位置', async () => {
    const onAutoSubmitFailed = vi.fn()
    const form = createForm({
      values: {
        username: 'silver-formily',
      },
    })

    const { container } = render(() => (
      <Form
        form={form}
        scrollToError={true}
        scrollToErrorPosition="center"
        onAutoSubmitFailed={onAutoSubmitFailed}
      >
        <Field
          name="username"
          title="用户名"
          validator={{ required: true, message: '请输入用户名' }}
          decorator={[FormItem]}
          component={[Input]}
        />
        <Field
          name="bio"
          title="简介"
          validator={{ required: true, message: '请输入简介' }}
          decorator={[FormItem]}
          component={[Input.TextArea]}
        />
        <button type="submit">提交</button>
      </Form>
    ))

    const fields = Array.from(container.querySelectorAll<HTMLElement>('.van-field'))
    const firstScrollIntoView = vi.fn()
    const secondScrollIntoView = vi.fn()

    Object.defineProperty(fields[0], 'scrollIntoView', {
      configurable: true,
      value: firstScrollIntoView,
    })
    Object.defineProperty(fields[1], 'scrollIntoView', {
      configurable: true,
      value: secondScrollIntoView,
    })

    await userEvent.click(document.querySelector('button')!)

    await vi.waitFor(() => {
      expect(onAutoSubmitFailed).toHaveBeenCalled()
      expect(secondScrollIntoView).toHaveBeenCalledWith({ block: 'center' })
    })

    expect(firstScrollIntoView).not.toHaveBeenCalled()
  })
})
