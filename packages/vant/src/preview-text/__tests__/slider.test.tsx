import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Slider from '../../slider'
import PreviewText from '../index'
import 'vant/lib/index.css'

function getSliderButtons(container: Element) {
  return Array.from(container.querySelectorAll<HTMLElement>('[role="slider"]'))
}

describe('previewText.Slider', () => {
  it('应该在 readPretty 模式下显示只读滑块', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="progress"
          initialValue={40}
          readPretty={true}
          component={[Slider]}
        />
      </FormProvider>
    ))

    expect(container.querySelector('.van-slider')).not.toBeNull()
    expect(container.querySelector('.van-slider')).not.toHaveClass('van-slider--disabled')
    expect(getSliderButtons(container)[0]).toHaveAttribute('aria-readonly', 'true')
    expect(getSliderButtons(container)[0]).toHaveAttribute('aria-valuenow', '40')
  })

  it('应该支持区间滑块回显并透传属性到阅读态组件', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="progress"
          initialValue={[40, 120]}
          readPretty={true}
          component={[Slider, {
            max: 200,
            range: true,
          }]}
        />
      </FormProvider>
    ))

    const buttons = getSliderButtons(container)

    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveAttribute('aria-valuenow', '40')
    expect(buttons[1]).toHaveAttribute('aria-valuenow', '120')
    expect(buttons[0]).toHaveAttribute('aria-valuemax', '200')
  })

  it('应该在空值时显示 PreviewText 提供的占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无进度">
        <FormProvider form={createForm()}>
          <Field
            name="progress"
            initialValue={undefined}
            readPretty={true}
            component={[Slider]}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无进度')
    expect(container.querySelector('.van-slider')).toBeNull()
  })

  it('应该在非数字值时显示占位符而不伪造成 0 进度', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无进度">
        <FormProvider form={createForm()}>
          <Field
            name="progress"
            initialValue={Number.NaN}
            readPretty={true}
            component={[Slider]}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无进度')
    expect(container.querySelector('.van-slider')).toBeNull()
  })

  it('应该保留真实 0 进度的只读滑块展示', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="progress"
          initialValue={0}
          readPretty={true}
          component={[Slider]}
        />
      </FormProvider>
    ))

    expect(container.querySelector('.van-slider')).not.toBeNull()
    expect(getSliderButtons(container)[0]).toHaveAttribute('aria-valuenow', '0')
  })
})
