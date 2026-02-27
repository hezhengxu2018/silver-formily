import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import Rate from '../index'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-rate.css'

describe('rate', () => {
  it('应该正常渲染', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field name="rate" component={[Rate]} />
      </FormProvider>
    ))

    expect(container.querySelector('.el-rate')).toBeTruthy()
  })

  it('应该支持点击更新评分', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="rate" component={[Rate]} />
      </FormProvider>
    ))

    const items = container.querySelectorAll('.el-rate__item')
    expect(items.length).toBeGreaterThan(0)

    await userEvent.click(items[2] as HTMLElement)
    expect(form.values.rate).toBe(3)
  })

  it('应该正确返显数据', async () => {
    const form = createForm()
    const { getByText } = render(() => (
      <FormProvider form={form}>
        <Field
          name="rate"
          initialValue={2}
          component={[
            Rate,
            {
              showScore: true,
              scoreTemplate: '{value}分',
            },
          ]}
        />
      </FormProvider>
    ))

    await expect.element(getByText('2分')).toBeInTheDocument()

    form.setValues({ rate: 4 })
    await expect.element(getByText('4分')).toBeInTheDocument()
  })

  it('应该支持禁用状态', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field name="rate" disabled component={[Rate]} />
      </FormProvider>
    ))

    const rate = container.querySelector('.el-rate')
    expect(rate).toHaveClass('is-disabled')
  })
})
