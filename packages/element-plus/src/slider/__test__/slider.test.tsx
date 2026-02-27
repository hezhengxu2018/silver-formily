import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Slider from '../index'
import 'element-plus/theme-chalk/index.css'

describe('slider', () => {
  it('应该正常渲染', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field name="slider" component={[Slider]} />
      </FormProvider>
    ))

    expect(container.querySelector('.el-slider')).toBeTruthy()
  })

  it('应该支持输入框更新值', async () => {
    const form = createForm()
    const { getByRole } = render(() => (
      <FormProvider form={form}>
        <Field name="slider" component={[Slider, { showInput: true }]} />
      </FormProvider>
    ))

    await getByRole('spinbutton').fill('40')
    expect(form.values.slider).toBe(40)
  })

  it('应该正确返显数据', async () => {
    const form = createForm()
    const { getByRole } = render(() => (
      <FormProvider form={form}>
        <Field
          name="slider"
          initialValue={50}
          component={[Slider, { showInput: true }]}
        />
      </FormProvider>
    ))

    await expect.element(getByRole('spinbutton')).toHaveValue(50)

    form.setValues({ slider: 30 })
    await expect.element(getByRole('spinbutton')).toHaveValue(30)
  })

  it('应该支持禁用状态', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field name="slider" disabled component={[Slider]} />
      </FormProvider>
    ))

    const runway = container.querySelector('.el-slider__runway')
    expect(runway).toHaveClass('is-disabled')
  })

  it('应该支持区间与刻度', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="slider"
          initialValue={[20, 60]}
          component={[
            Slider,
            {
              range: true,
              marks: {
                0: '0',
                20: '20',
                40: '40',
                60: '60',
                80: '80',
                100: '100',
              },
            },
          ]}
        />
      </FormProvider>
    ))

    expect(container.querySelectorAll('.el-slider__button').length).toBe(2)

    const marks = Array.from(container.querySelectorAll('.el-slider__marks-text')).map(
      element => element.textContent?.trim(),
    )

    expect(marks).toContain('20')
    expect(marks).toContain('60')
  })
})
