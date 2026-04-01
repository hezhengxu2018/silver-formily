import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Switch from '../../switch'
import PreviewText from '../index'
import 'vant/lib/index.css'

function getSwitch(container: Element) {
  return container.querySelector<HTMLElement>('.van-switch')
}

describe('previewText.Switch', () => {
  it('应该在 readPretty 模式下显示只读开关', () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="enabled"
          initialValue={true}
          readPretty={true}
          component={[Switch]}
        />
      </FormProvider>
    ))

    expect(getSwitch(container)).toHaveClass('van-switch--on')
    expect(getSwitch(container)).toHaveClass('van-switch--disabled')
    expect(getSwitch(container)).toHaveAttribute('aria-checked', 'true')
  })

  it('应该支持自定义激活值和关闭值回显', () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="status"
          initialValue="open"
          readPretty={true}
          component={[Switch, {
            activeValue: 'open',
            inactiveValue: 'close',
          }]}
        />
      </FormProvider>
    ))

    expect(getSwitch(container)).toHaveClass('van-switch--on')
    expect(getSwitch(container)).toHaveAttribute('aria-checked', 'true')
  })

  it('应该在空值时显示 PreviewText 提供的占位符', () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无状态">
        <FormProvider form={createForm()}>
          <Field
            name="enabled"
            initialValue={undefined}
            readPretty={true}
            component={[Switch]}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无状态')
    expect(getSwitch(container)).toBeNull()
  })

  it('应该在非法值时显示占位符而不伪造成关闭状态', () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无状态">
        <FormProvider form={createForm()}>
          <Field
            name="status"
            initialValue="unknown"
            readPretty={true}
            component={[Switch, {
              activeValue: 'open',
              inactiveValue: 'close',
            }]}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无状态')
    expect(getSwitch(container)).toBeNull()
  })

  it('应该保留真实关闭状态的只读展示', () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="enabled"
          initialValue={false}
          readPretty={true}
          component={[Switch]}
        />
      </FormProvider>
    ))

    expect(getSwitch(container)).not.toBeNull()
    expect(getSwitch(container)).not.toHaveClass('van-switch--on')
    expect(getSwitch(container)).toHaveAttribute('aria-checked', 'false')
  })

  it('应该在自定义空字符串关闭值时保留只读展示', () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="status"
          initialValue=""
          readPretty={true}
          component={[Switch, {
            activeValue: 'Y',
            inactiveValue: '',
          }]}
        />
      </FormProvider>
    ))

    expect(getSwitch(container)).not.toBeNull()
    expect(getSwitch(container)).not.toHaveClass('van-switch--on')
    expect(getSwitch(container)).toHaveAttribute('aria-checked', 'false')
  })
})
