import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import DatePicker from '../../date-picker'
import 'element-plus/theme-chalk/index.css'

describe('previewText.DatePicker', () => {
  it('应该支持基础日期显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="date"
            initialValue="2023-05-15"
            readPretty={true}
            component={[DatePicker]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023-05-15')
  })

  it('应该支持自定义日期格式', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="date"
            initialValue="2023-05-15"
            readPretty={true}
            component={[DatePicker, { format: 'YYYY年MM月DD日' }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023年05月15日')
  })

  it('应该支持日期时间类型', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="datetime"
            initialValue="2023-05-15 14:30:00"
            readPretty={true}
            component={[DatePicker, {
              type: 'datetime',
              format: 'YYYY-MM-DD HH:mm:ss',
            }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023-05-15 14:30:00')
  })

  it('应该支持 datetime 类型默认格式', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="datetime"
            initialValue="2023-05-15T14:30:00"
            readPretty={true}
            component={[DatePicker, { type: 'datetime' }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023-05-15 14:30:00')
  })

  // 新增：测试 year 类型
  it('应该支持 year 类型显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="year"
            initialValue="2023-01-01"
            readPretty={true}
            component={[DatePicker, { type: 'year' }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023')
  })

  // 新增：测试 month 类型
  it('应该支持 month 类型显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="month"
            initialValue="2023-05-01"
            readPretty={true}
            component={[DatePicker, { type: 'month' }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023-05')
  })

  // 新增：测试 week 类型
  it('应该支持 week 类型显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="week"
            initialValue="2023-05-15"
            readPretty={true}
            component={[DatePicker, { type: 'week' }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('Week')
  })

  // 新增：测试 monthrange 类型
  it('应该支持 monthrange 类型显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="monthrange"
            initialValue={['2023-01-01', '2023-05-01']}
            readPretty={true}
            component={[DatePicker, { type: 'monthrange' }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023-01')
    expect(container.textContent).toContain('2023-05')
  })

  // 新增：测试 yearrange 类型
  it('应该支持 yearrange 类型显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="yearrange"
            initialValue={['2020-01-01', '2023-01-01']}
            readPretty={true}
            component={[DatePicker, { type: 'yearrange' }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2020')
    expect(container.textContent).toContain('2023')
  })

  // 新增：测试 datetimerange 类型
  it('应该支持 datetimerange 类型显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="datetimerange"
            initialValue={['2023-05-01T09:00:00', '2023-05-15T18:00:00']}
            readPretty={true}
            component={[DatePicker, { type: 'datetimerange' }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023-05-01 09:00:00')
    expect(container.textContent).toContain('2023-05-15 18:00:00')
  })

  // 新增：测试 years 类型（多年选择）
  it('应该支持 years 类型显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="years"
            initialValue={['2020-01-01', '2021-01-01', '2023-01-01']}
            readPretty={true}
            component={[DatePicker, { type: 'years' }]}
          />
        </FormProvider>
      ),
    )

    const tags = container.querySelectorAll('.el-tag')
    expect(tags.length).toBe(3)
    expect(tags[0].textContent).toContain('2020')
    expect(tags[1].textContent).toContain('2021')
    expect(tags[2].textContent).toContain('2023')
  })

  // 新增：测试 months 类型（多月选择）
  it('应该支持 months 类型显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="months"
            initialValue={['2023-01-01', '2023-05-01', '2023-12-01']}
            readPretty={true}
            component={[DatePicker, { type: 'months' }]}
          />
        </FormProvider>
      ),
    )

    const tags = container.querySelectorAll('.el-tag')
    expect(tags.length).toBe(3)
    expect(tags[0].textContent).toContain('2023-01')
    expect(tags[1].textContent).toContain('2023-05')
    expect(tags[2].textContent).toContain('2023-12')
  })

  it('应该在未知类型时使用默认格式', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="unknown"
            initialValue="2023-05-15"
            readPretty={true}
            component={[DatePicker, { type: 'unknown' as any }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023-05-15')
  })

  it('应该支持日期范围显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="daterange"
            initialValue={['2023-05-01', '2023-05-15']}
            readPretty={true}
            component={[DatePicker, {
              type: 'daterange',
            }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023-05-01')
    expect(container.textContent).toContain('2023-05-15')
  })

  it('应该支持自定义范围分隔符', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="daterange"
            initialValue={['2023-05-01', '2023-05-15']}
            readPretty={true}
            component={[DatePicker, {
              type: 'daterange',
              rangeSeparator: '至',
            }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023-05-01 至 2023-05-15')
  })

  it('应该多个日期显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="dates"
            initialValue={['2023-05-01', '2023-05-15', '2023-05-30']}
            readPretty={true}
            component={[DatePicker, {
              type: 'dates',
            }]}
          />
        </FormProvider>
      ),
    )

    const tags = container.querySelectorAll('.el-tag')
    expect(tags.length).toBe(3)
    expect(tags[0].textContent).toContain('2023-05-01')
    expect(tags[1].textContent).toContain('2023-05-15')
    expect(tags[2].textContent).toContain('2023-05-30')
  })

  it('应该空值显示占位符', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="date"
            initialValue={null}
            readPretty={true}
            component={[DatePicker]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('N/A')
  })

  it('应该支持日期范围部分值显示', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="daterange"
            initialValue={['2023-05-01', null]}
            readPretty={true}
            component={[DatePicker, {
              type: 'daterange',
            }]}
          />
        </FormProvider>
      ),
    )
    expect(container.textContent).toContain('2023-05-01')
    expect(container.textContent).toContain('N/A')
  })
})
