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
})
