import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { Input } from '../../input'
import { Reset } from '../../reset'
import { Submit } from '../../submit'
import 'vant/lib/index.css'

describe('reset', () => {
  it('应该正常渲染', async () => {
    const { getByRole } = render(() => (
      <Reset />
    ))

    await expect.element(getByRole('button', { name: '重置' })).toBeInTheDocument()
    expect(getByRole('button', { name: '重置' }).element().className).toContain('van-button--default')
    expect(getByRole('button', { name: '重置' }).element().className).toContain('van-button--round')
    expect(getByRole('button', { name: '重置' }).element().className).toContain('van-button--block')
  })

  it('应该支持点击事件', async () => {
    const onClick = vi.fn()
    const { getByRole } = render(() => (
      <Reset onClick={onClick}>重置</Reset>
    ))

    await getByRole('button', { name: '重置' }).click()
    expect(onClick).toHaveBeenCalled()
  })

  it('应该支持阻止重置', async () => {
    const form = createForm()
    const onClick = vi.fn().mockReturnValue(false)
    const resetSpy = vi.spyOn(form, 'reset')

    const { getByRole } = render(() => (
      <FormProvider form={form}>
        <Reset onClick={onClick}>重置</Reset>
      </FormProvider>
    ))

    await getByRole('button', { name: '重置' }).click()
    expect(onClick).toHaveBeenCalled()
    expect(resetSpy).not.toHaveBeenCalled()
  })

  it('应该支持普通重置', async () => {
    const form = createForm({
      initialValues: {
        input: '初始值',
      },
    })
    const resetSpy = vi.spyOn(form, 'reset')

    const { getByRole } = render(() => (
      <FormProvider form={form}>
        <Field name="input" component={[Input]} />
        <Reset>重置</Reset>
      </FormProvider>
    ))

    await getByRole('textbox').fill('新值')
    expect(form.values.input).toBe('新值')

    await getByRole('button', { name: '重置' }).click()
    expect(resetSpy).toHaveBeenCalledWith('*', { forceClear: false })
    expect(form.values.input).toBe('初始值')
  })

  it('应该支持强制清空重置', async () => {
    const form = createForm({
      initialValues: {
        input: '初始值',
      },
    })
    const resetSpy = vi.spyOn(form, 'reset')

    const { getByRole } = render(() => (
      <FormProvider form={form}>
        <Field name="input" component={[Input]} />
        <Reset forceClear>强制清空</Reset>
      </FormProvider>
    ))

    await getByRole('button', { name: '强制清空' }).click()
    expect(resetSpy).toHaveBeenCalledWith('*', { forceClear: true })
    expect(form.values.input).toBeUndefined()
  })

  it('应该支持重置校验成功回调', async () => {
    const form = createForm({
      initialValues: {
        input: '初始值',
      },
    })
    const onResetValidateSuccess = vi.fn()
    const validateSpy = vi.spyOn(form, 'validate')

    const { getByRole } = render(() => (
      <FormProvider form={form}>
        <Field name="input" component={[Input]} />
        <Reset validate onResetValidateSuccess={onResetValidateSuccess}>
          重置并校验
        </Reset>
      </FormProvider>
    ))

    await getByRole('button', { name: '重置并校验' }).click()

    await vi.waitFor(() => {
      expect(validateSpy).toHaveBeenCalled()
      expect(onResetValidateSuccess).toHaveBeenCalled()
    })
  })

  it('应该支持重置校验失败回调', async () => {
    const form = createForm()
    const onResetValidateFailed = vi.fn()
    const validateSpy = vi.spyOn(form, 'validate')

    const { getByRole } = render(() => (
      <FormProvider form={form}>
        <Field
          name="input"
          component={[Input]}
          required
          initialValue="初始值"
        />
        <Reset forceClear validate onResetValidateFailed={onResetValidateFailed}>
          重置并校验
        </Reset>
      </FormProvider>
    ))

    await getByRole('button', { name: '重置并校验' }).click()

    await vi.waitFor(() => {
      expect(validateSpy).toHaveBeenCalled()
      expect(onResetValidateFailed).toHaveBeenCalled()
    })
  })

  it('应该支持透传按钮类型和禁用态', async () => {
    const { getByRole } = render(() => (
      <Reset type="danger" disabled>
        删除
      </Reset>
    ))

    const button = getByRole('button', { name: '删除' })
    await expect.element(button).toBeDisabled()
    expect(button.element().className).toContain('van-button--danger')
  })

  it('应该支持覆盖默认文案和布局样式', async () => {
    const { getByRole } = render(() => (
      <Reset type="warning" block={false} round={false}>
        清空
      </Reset>
    ))

    const button = getByRole('button', { name: '清空' })
    expect(button.element().className).toContain('van-button--warning')
    expect(button.element().className).not.toContain('van-button--round')
    expect(button.element().className).not.toContain('van-button--block')
  })

  it('应该在表单提交中自动禁用重置按钮', async () => {
    const onSubmit = vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => resolve('success'), 1000)
      })
    })

    const { getByRole } = render(() => (
      <FormProvider form={createForm()}>
        <Submit onSubmit={onSubmit}>
          提交
        </Submit>
        <Reset>
          重置
        </Reset>
      </FormProvider>
    ))

    await getByRole('button', { name: '提交' }).click()

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalled()
    })

    await expect.element(getByRole('button', { name: '重置' })).toBeDisabled()
  })
})
