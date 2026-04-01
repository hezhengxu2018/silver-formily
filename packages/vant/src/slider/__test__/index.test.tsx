import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import Slider from '../index'
import 'vant/lib/index.css'

function getSlider(container: Element) {
  return container.querySelector<HTMLElement>('.van-slider')
}

function getSliderButtons(container: Element) {
  return Array.from(container.querySelectorAll<HTMLElement>('[role="slider"]'))
}

function mockSliderRect(slider: HTMLElement, rect: Partial<DOMRect> = {}) {
  const left = rect.left ?? 0
  const top = rect.top ?? 0
  const width = rect.width ?? 100
  const height = rect.height ?? 10

  return vi.spyOn(slider, 'getBoundingClientRect').mockReturnValue({
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: rect.right ?? left + width,
    bottom: rect.bottom ?? top + height,
    toJSON: () => ({}),
  } as DOMRect)
}

function triggerSliderClick(slider: HTMLElement, clientX: number) {
  slider.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    clientX,
  }))
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('slider', () => {
  it('应该支持点击更新字段值', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="progress" component={[Slider]} />
      </FormProvider>
    ))

    const slider = getSlider(container)

    expect(slider).not.toBeNull()

    mockSliderRect(slider!)
    triggerSliderClick(slider!, 75)

    await vi.waitFor(() => {
      expect(form.values.progress).toBe(75)
    })
  })

  it('应该支持区间滑块回显并响应外部赋值', async () => {
    const form = createForm({
      values: {
        progress: [20, 60],
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="progress"
          component={[Slider, {
            range: true,
          }]}
        />
      </FormProvider>
    ))

    expect(getSliderButtons(container).map(button => button.getAttribute('aria-valuenow'))).toEqual(['20', '60'])

    form.setValues({
      progress: [30, 80],
    })

    await vi.waitFor(() => {
      expect(getSliderButtons(container).map(button => button.getAttribute('aria-valuenow'))).toEqual(['30', '80'])
    })
  })

  it('应该支持 readonly 状态并阻止继续拖动', () => {
    const form = createForm({
      values: {
        progress: 20,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="progress"
          component={[Slider, {
            readonly: true,
          }]}
        />
      </FormProvider>
    ))

    const slider = getSlider(container)
    const button = getSliderButtons(container)[0]

    expect(button).toHaveAttribute('aria-readonly', 'true')

    mockSliderRect(slider!)
    triggerSliderClick(slider!, 90)

    expect(form.values.progress).toBe(20)
  })

  it('应该同步 Field.readOnly 到滑块组件并阻止继续拖动', () => {
    const form = createForm({
      values: {
        progress: 20,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="progress"
          readOnly={true}
          component={[Slider]}
        />
      </FormProvider>
    ))

    const slider = getSlider(container)
    const button = getSliderButtons(container)[0]

    expect(button).toHaveAttribute('aria-readonly', 'true')

    mockSliderRect(slider!)
    triggerSliderClick(slider!, 90)

    expect(form.values.progress).toBe(20)
  })

  it('应该支持 disabled 状态', () => {
    const form = createForm({
      values: {
        progress: 25,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="progress"
          component={[Slider, {
            disabled: true,
          }]}
        />
      </FormProvider>
    ))

    const slider = getSlider(container)
    const button = getSliderButtons(container)[0]

    expect(slider).toHaveClass('van-slider--disabled')
    expect(button).toHaveAttribute('aria-disabled', 'true')

    mockSliderRect(slider!)
    triggerSliderClick(slider!, 90)

    expect(form.values.progress).toBe(25)
  })

  it('应该同步 Field.disabled 到滑块组件并阻止继续拖动', () => {
    const form = createForm({
      values: {
        progress: 25,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="progress"
          disabled={true}
          component={[Slider]}
        />
      </FormProvider>
    ))

    const slider = getSlider(container)
    const button = getSliderButtons(container)[0]

    expect(slider).toHaveClass('van-slider--disabled')
    expect(button).toHaveAttribute('aria-disabled', 'true')

    mockSliderRect(slider!)
    triggerSliderClick(slider!, 90)

    expect(form.values.progress).toBe(25)
  })
})
