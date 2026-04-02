import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import PreviewText from '../../preview-text'
import Stepper from '../index'
import 'vant/lib/index.css'

function getStepper(container: Element) {
  return container.querySelector<HTMLElement>('.van-stepper')
}

function getMinusButton(container: Element) {
  return container.querySelector<HTMLButtonElement>('.van-stepper__minus')
}

function getPlusButton(container: Element) {
  return container.querySelector<HTMLButtonElement>('.van-stepper__plus')
}

function getInput(container: Element) {
  return container.querySelector<HTMLInputElement>('.van-stepper__input')
}

function triggerButtonClick(button: HTMLButtonElement) {
  button.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
}

describe('stepper', () => {
  it('应该在空字段首次渲染时保持空值且不写脏表单', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="count" component={[Stepper]} />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getInput(container)).toHaveValue('')
    })

    expect(form.values).toEqual({})
    expect(form.modified).toBe(false)
  })

  it('应该支持点击增加并同步字段值', async () => {
    const form = createForm({
      values: {
        count: 1,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="count" component={[Stepper]} />
      </FormProvider>
    ))

    expect(getStepper(container)).not.toBeNull()

    triggerButtonClick(getPlusButton(container)!)

    await vi.waitFor(() => {
      expect(form.values.count).toBe(2)
      expect(getInput(container)).toHaveValue('2')
    })
  })

  it('应该支持透传步长并响应外部赋值', async () => {
    const form = createForm({
      values: {
        count: 2,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="count"
          component={[Stepper, {
            step: 2,
          }]}
        />
      </FormProvider>
    ))

    triggerButtonClick(getPlusButton(container)!)

    await vi.waitFor(() => {
      expect(form.values.count).toBe(4)
      expect(getInput(container)).toHaveValue('4')
    })

    form.setValues({
      count: 8,
    })

    await vi.waitFor(() => {
      expect(getInput(container)).toHaveValue('8')
    })
  })

  it('应该在显式传入 defaultValue 时沿用原生初始化行为', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="count"
          component={[Stepper, {
            defaultValue: 5,
          }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(form.values.count).toBe(5)
      expect(getInput(container)).toHaveValue('5')
    })
  })

  it('应该支持 disabled 状态并阻止继续变更', async () => {
    const form = createForm({
      values: {
        count: 3,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="count"
          component={[Stepper, {
            disabled: true,
          }]}
        />
      </FormProvider>
    ))

    expect(getInput(container)).toBeDisabled()
    expect(getPlusButton(container)).toHaveClass('van-stepper__plus--disabled')
    expect(getMinusButton(container)).toHaveClass('van-stepper__minus--disabled')

    triggerButtonClick(getPlusButton(container)!)

    await vi.waitFor(() => {
      expect(form.values.count).toBe(3)
    })
  })

  it('应该同步 Field.disabled 到步进器组件', async () => {
    const form = createForm({
      values: {
        count: 2,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="count"
          disabled={true}
          component={[Stepper]}
        />
      </FormProvider>
    ))

    expect(getInput(container)).toBeDisabled()
    expect(getPlusButton(container)).toHaveClass('van-stepper__plus--disabled')

    triggerButtonClick(getPlusButton(container)!)

    await vi.waitFor(() => {
      expect(form.values.count).toBe(2)
    })
  })

  it('应该在 readPretty 模式下显示纯文本值', () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="count"
          initialValue={6}
          readPretty={true}
          component={[Stepper]}
        />
      </FormProvider>
    ))

    expect(container.textContent).toContain('6')
    expect(getStepper(container)).toBeNull()
  })

  it('应该在 readPretty 空值时显示占位符', () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无数量">
        <FormProvider form={createForm()}>
          <Field
            name="count"
            initialValue={undefined}
            readPretty={true}
            component={[Stepper]}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent).toContain('暂无数量')
    expect(getStepper(container)).toBeNull()
  })
})
