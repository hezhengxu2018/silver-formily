import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import ColorPickerPanel from '../index'
import 'element-plus/theme-chalk/index.css'

describe('colorPickerPanel', () => {
  it('should render panel', async () => {
    render(() => (
      <FormProvider form={createForm()}>
        <Field name="color" component={[ColorPickerPanel]} />
      </FormProvider>
    ))

    const panel = document.querySelector('.el-color-picker-panel')
    expect(panel).toBeInTheDocument()
  })

  it('should update form value after selecting predefine color', async () => {
    const form = createForm()
    render(() => (
      <FormProvider form={form}>
        <Field
          name="color"
          component={[
            ColorPickerPanel,
            {
              predefine: ['#409eff', '#67c23a'],
            },
          ]}
        />
      </FormProvider>
    ))

    const predefine = document.querySelectorAll<HTMLButtonElement>(
      '.el-color-predefine__color-selector',
    )

    expect(predefine.length).toBeGreaterThan(0)

    await userEvent.click(predefine[0])

    expect(form.values.color).toBe('#409eff')
  })

  it('should render normally when Field is readOnly', async () => {
    const form = createForm()
    render(() => (
      <FormProvider form={form}>
        <Field
          name="color"
          readOnly={true}
          component={[
            ColorPickerPanel,
            {
              predefine: ['#409eff', '#67c23a'],
              readOnly: true,
              disabled: false,
            },
          ]}
        />
      </FormProvider>
    ))

    const panel = document.querySelector('.el-color-picker-panel')
    expect(panel).toBeInTheDocument()
  })
})
