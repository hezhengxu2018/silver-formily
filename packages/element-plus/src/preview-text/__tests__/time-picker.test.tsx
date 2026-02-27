import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import TimePicker from '../../time-picker'
import 'element-plus/theme-chalk/index.css'

describe('previewText.TimePicker', () => {
  it('应该支持基础时间显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="time"
            initialValue="14:30:45"
            readPretty={true}
            component={[TimePicker, {
              valueFormat: 'HH:mm:ss',
            }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('14:30:45')
  })

  it('应该支持自定义时间格式', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="time"
            initialValue="14:30:45"
            readPretty={true}
            component={[TimePicker, { format: 'HH时mm分ss秒' }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('14时30分45秒')
  })

  it('应该支持时间范围显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="timerange"
            initialValue={['09:00:00', '18:00:00']}
            readPretty={true}
            component={[TimePicker, { isRange: true }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('09:00:00')
    expect(container.textContent).toContain('18:00:00')
    expect(container.textContent).toContain('~')
  })

  it('应该支持自定义范围分隔符', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="timerange"
            initialValue={['09:00:00', '18:00:00']}
            readPretty={true}
            component={[TimePicker, {
              isRange: true,
              rangeSeparator: '至',
            }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('09:00:00 至 18:00:00')
  })

  it('应该支持空值显示占位符', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="time"
            initialValue={null}
            readPretty={true}
            component={[TimePicker]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('N/A')
  })

  it('应该时间范围部分值显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="timerange"
            initialValue={['09:00:00', null]}
            readPretty={true}
            component={[TimePicker, { isRange: true }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('09:00:00')
    expect(container.textContent).toContain('N/A')
  })

  it('应该默认处理日期时间对象', async () => {
    const form = createForm()
    const date = new Date('2023-05-15T14:30:45')
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="time"
            initialValue={date}
            readPretty={true}
            component={[TimePicker]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('14:30:45')
  })

  it('应该支持处理日期时间对象范围', async () => {
    const form = createForm()
    const startDate = new Date('2023-05-15T09:00:00')
    const endDate = new Date('2023-05-15T18:00:00')
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="timerange"
            initialValue={[startDate, endDate]}
            readPretty={true}
            component={[TimePicker, { isRange: true }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('09:00:00')
    expect(container.textContent).toContain('18:00:00')
  })
})
