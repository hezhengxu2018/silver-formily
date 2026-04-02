import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import Switch from '../index'
import 'vant/lib/index.css'

function getSwitch(container: Element) {
  return container.querySelector<HTMLElement>('.van-switch')
}

function createDeferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void

  const promise = new Promise<T>((innerResolve, innerReject) => {
    resolve = innerResolve
    reject = innerReject
  })

  return {
    promise,
    resolve,
    reject,
  }
}

describe('switch', () => {
  it('应该支持点击更新字段值', async () => {
    const form = createForm({
      values: {
        enabled: false,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="enabled" component={[Switch]} />
      </FormProvider>
    ))

    await userEvent.click(getSwitch(container)!)

    await vi.waitFor(() => {
      expect(form.values.enabled).toBe(true)
    })

    expect(getSwitch(container)).toHaveClass('van-switch--on')
    expect(getSwitch(container)).toHaveAttribute('aria-checked', 'true')
  })

  it('应该支持自定义激活值和关闭值', async () => {
    const form = createForm({
      values: {
        status: 'off',
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="status"
          component={[Switch, {
            activeValue: 'on',
            inactiveValue: 'off',
          }]}
        />
      </FormProvider>
    ))

    await userEvent.click(getSwitch(container)!)

    await vi.waitFor(() => {
      expect(form.values.status).toBe('on')
    })

    form.setValues({
      status: 'off',
    })

    await vi.waitFor(() => {
      expect(getSwitch(container)).not.toHaveClass('van-switch--on')
      expect(getSwitch(container)).toHaveAttribute('aria-checked', 'false')
    })
  })

  it('应该支持 disabled 状态', async () => {
    const form = createForm({
      values: {
        enabled: false,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="enabled"
          component={[Switch, {
            disabled: true,
          }]}
        />
      </FormProvider>
    ))

    expect(getSwitch(container)).toHaveClass('van-switch--disabled')

    await userEvent.click(getSwitch(container)!)

    await vi.waitFor(() => {
      expect(form.values.enabled).toBe(false)
    })
  })

  it('应该同步 Field.disabled 到开关组件并阻止继续切换', async () => {
    const form = createForm({
      values: {
        enabled: false,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="enabled"
          disabled={true}
          component={[Switch]}
        />
      </FormProvider>
    ))

    expect(getSwitch(container)).toHaveClass('van-switch--disabled')

    await userEvent.click(getSwitch(container)!)

    await vi.waitFor(() => {
      expect(form.values.enabled).toBe(false)
    })
  })

  it('应该支持通过 beforeChange 阻止切换', async () => {
    const beforeChange = vi.fn(() => false)
    const onChange = vi.fn()
    const form = createForm({
      values: {
        enabled: false,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="enabled"
          component={[Switch, {
            beforeChange,
            onChange,
          }]}
        />
      </FormProvider>
    ))

    await userEvent.click(getSwitch(container)!)

    expect(beforeChange).toHaveBeenCalledWith(
      true,
      expect.objectContaining({
        currentValue: false,
      }),
    )
    expect(getSwitch(container)).not.toHaveAttribute('beforechange')
    expect(onChange).not.toHaveBeenCalled()
    expect(form.values.enabled).toBe(false)
    expect(getSwitch(container)).not.toHaveClass('van-switch--on')
  })

  it('应该在异步 beforeChange 执行期间自动展示 loading，并在成功后写回值', async () => {
    const deferred = createDeferred<boolean>()
    const beforeChange = vi.fn(() => deferred.promise)
    const onChange = vi.fn()
    const form = createForm({
      values: {
        enabled: false,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="enabled"
          component={[Switch, {
            beforeChange,
            onChange,
          }]}
        />
      </FormProvider>
    ))

    await userEvent.click(getSwitch(container)!)

    await vi.waitFor(() => {
      expect(getSwitch(container)).toHaveClass('van-switch--loading')
    })

    deferred.resolve(true)

    await vi.waitFor(() => {
      expect(form.values.enabled).toBe(true)
    })
    await vi.waitFor(() => {
      expect(getSwitch(container)).not.toHaveClass('van-switch--loading')
    })

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('应该在异步 beforeChange 失败时恢复非 loading 状态并保持原值', async () => {
    const deferred = createDeferred<boolean>()
    const beforeChange = vi.fn(() => deferred.promise)
    const onChange = vi.fn()
    const form = createForm({
      values: {
        enabled: false,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="enabled"
          component={[Switch, {
            beforeChange,
            onChange,
          }]}
        />
      </FormProvider>
    ))

    await userEvent.click(getSwitch(container)!)

    await vi.waitFor(() => {
      expect(getSwitch(container)).toHaveClass('van-switch--loading')
    })

    deferred.reject(new Error('switch failed'))

    await vi.waitFor(() => {
      expect(getSwitch(container)).not.toHaveClass('van-switch--loading')
    })

    expect(onChange).not.toHaveBeenCalled()
    expect(form.values.enabled).toBe(false)
    expect(getSwitch(container)).not.toHaveClass('van-switch--on')
  })
})
