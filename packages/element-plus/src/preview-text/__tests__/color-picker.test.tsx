import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import ColorPicker from '../../color-picker'
import 'element-plus/theme-chalk/index.css'

describe('previewText.ColorPicker', () => {
  it('should render swatch and color text when value is valid', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="color"
            initialValue="#409EFF"
            readPretty={true}
            component={[ColorPicker]}
          />
        </FormProvider>
      ),
    )

    const swatch = container.querySelector('.formily-element-plus-preview-text__color-swatch') as HTMLElement | null
    expect(swatch).not.toBeNull()
    expect(swatch?.style.backgroundColor).not.toBe('')
    expect(container.textContent).toContain('#409EFF')
  })

  it('should render placeholder and hide swatch when value is empty', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="color"
            initialValue={undefined}
            readPretty={true}
            component={[ColorPicker]}
          />
        </FormProvider>
      ),
    )

    expect(container.querySelector('.formily-element-plus-preview-text__color-swatch')).toBeNull()
    expect(container.textContent).toContain('N/A')
  })

  it('should prefer formatter text when formatter is provided', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="color"
            initialValue="#67C23A"
            readPretty={true}
            component={[ColorPicker, {
              formatter: (value: string) => `Color: ${value}`,
            }]}
          />
        </FormProvider>
      ),
    )

    expect(container.textContent).toContain('Color: #67C23A')
  })
})
