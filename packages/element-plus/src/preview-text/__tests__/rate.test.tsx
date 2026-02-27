import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Rate from '../../rate'
import 'element-plus/theme-chalk/index.css'

describe('previewText.Rate', () => {
  it('should render disabled rate when value is valid', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="rate"
            initialValue={3}
            readPretty={true}
            component={[Rate]}
          />
        </FormProvider>
      ),
    )

    const rate = container.querySelector('.el-rate')
    expect(rate).not.toBeNull()
    expect(rate?.classList.contains('is-disabled')).toBe(true)
  })

  it('should render placeholder when value is empty', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="rate"
            initialValue={undefined}
            readPretty={true}
            component={[Rate]}
          />
        </FormProvider>
      ),
    )

    expect(container.querySelector('.el-rate')).toBeNull()
    expect(container.textContent).toContain('N/A')
  })

  it('should pass attrs to rate while keeping readonly disabled behavior', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="rate"
            initialValue={2}
            readPretty={true}
            component={[Rate, { max: 3 }]}
          />
        </FormProvider>
      ),
    )

    const items = container.querySelectorAll('.el-rate__item')
    expect(items.length).toBe(3)
    expect(container.querySelector('.el-rate')?.classList.contains('is-disabled')).toBe(true)
  })
})
