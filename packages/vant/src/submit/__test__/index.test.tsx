import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { Form } from '../../form'
import FormItem from '../../form-item'
import { Input } from '../../input'
import { Submit } from '../../submit'
import 'vant/lib/index.css'

describe('submit', () => {
  it('应该正常渲染', async () => {
    const { getByRole } = render(() => (
      <Submit />
    ))

    await expect.element(getByRole('button')).toBeInTheDocument()
    await expect.element(getByRole('button')).toHaveTextContent('提交')
    expect(getByRole('button').element().className).toContain('van-button--primary')
    expect(getByRole('button').element().className).toContain('van-button--round')
    expect(getByRole('button').element().className).toContain('van-button--block')
  })

  it('应该支持点击事件', async () => {
    const onClick = vi.fn()
    const { getByRole } = render(() => (
      <Submit onClick={onClick}>提交</Submit>
    ))

    await getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })

  it('应该支持阻止手动提交', async () => {
    const onClick = vi.fn().mockReturnValue(false)
    const onSubmit = vi.fn()
    const { getByRole } = render(() => (
      <FormProvider form={createForm()}>
        <Submit onClick={onClick} onSubmit={onSubmit}>
          提交
        </Submit>
      </FormProvider>
    ))

    await getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('应该支持表单提交成功回调', async () => {
    const onSubmit = vi.fn().mockResolvedValue('success')
    const onSubmitSuccess = vi.fn()

    const { getByRole } = render(() => (
      <FormProvider form={createForm()}>
        <Submit onSubmit={onSubmit} onSubmitSuccess={onSubmitSuccess}>
          提交
        </Submit>
      </FormProvider>
    ))

    await getByRole('button').click()

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalled()
      expect(onSubmitSuccess).toHaveBeenCalledWith('success')
    })
  })

  it('应该支持表单提交失败回调', async () => {
    const error = new Error('提交失败')
    const onSubmit = vi.fn().mockRejectedValue(error)
    const onSubmitFailed = vi.fn()

    const { getByRole } = render(() => (
      <FormProvider form={createForm()}>
        <Submit onSubmit={onSubmit} onSubmitFailed={onSubmitFailed}>
          提交
        </Submit>
      </FormProvider>
    ))

    await getByRole('button').click()

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalled()
      expect(onSubmitFailed).toHaveBeenCalledWith(error)
    })
  })

  it('应该在未传 onSubmit 时走 Form 原生提交链路', async () => {
    const onAutoSubmit = vi.fn()
    const form = createForm({
      values: {
        username: 'silver-formily',
      },
    })

    const { getByRole } = render(() => (
      <Form form={form} onAutoSubmit={onAutoSubmit}>
        <Field
          name="username"
          title="用户名"
          decorator={[FormItem]}
          component={[Input]}
        />
        <Submit>
          提交
        </Submit>
      </Form>
    ))

    await getByRole('button').click()

    await vi.waitFor(() => {
      expect(onAutoSubmit).toHaveBeenCalledWith({
        username: 'silver-formily',
      })
    })
  })

  it('应该跟随 Formily submitting 状态展示加载态', async () => {
    const onSubmit = vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000, 'success')
      })
    })

    const { getByRole } = render(() => (
      <FormProvider form={createForm()}>
        <Submit onSubmit={onSubmit} loadingText="提交中...">
          提交
        </Submit>
      </FormProvider>
    ))

    const button = getByRole('button')
    await button.click()

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalled()
      expect(document.querySelector('button')?.className).toContain('van-button--loading')
      expect(document.querySelector('button')?.textContent).toContain('提交中...')
    })

    await expect.element(button).toBeDisabled()
  })

  it('应该支持透传 attrs', async () => {
    const { getByRole } = render(() => (
      <Submit
        aria-label="自定义提交"
        class="custom-submit"
        data-testid="submit-button"
      >
        提交
      </Submit>
    ))

    const button = getByRole('button', { name: '自定义提交' }).element()
    expect(button.className).toContain('custom-submit')
    expect(button.getAttribute('data-testid')).toBe('submit-button')
  })

  it('应该由组件内部推导 native type 并忽略 nativeType 透传', () => {
    const nativeSubmit = render(() => (
      <Submit {...({ nativeType: 'button' } as any)}>
        原生提交
      </Submit>
    ))

    expect(nativeSubmit.getByRole('button', { name: '原生提交' }).element().getAttribute('type')).toBe('submit')

    const manualSubmit = render(() => (
      <Submit {...({ nativeType: 'submit', onSubmit: vi.fn() } as any)}>
        手动提交
      </Submit>
    ))

    expect(manualSubmit.getByRole('button', { name: '手动提交' }).element().getAttribute('type')).toBe('button')
  })

  it('应该支持透传按钮类型和禁用态', async () => {
    const { getByRole } = render(() => (
      <Submit type="danger" disabled>
        删除
      </Submit>
    ))

    const button = getByRole('button', { name: '删除' })
    await expect.element(button).toBeDisabled()
    expect(button.element().className).toContain('van-button--danger')
  })

  it('应该支持覆盖默认文案和布局样式', async () => {
    const { getByRole } = render(() => (
      <Submit type="warning" block={false} round={false}>
        保存
      </Submit>
    ))

    const button = getByRole('button', { name: '保存' })
    expect(button.element().className).toContain('van-button--warning')
    expect(button.element().className).not.toContain('van-button--round')
    expect(button.element().className).not.toContain('van-button--block')
  })
})
