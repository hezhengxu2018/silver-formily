import { createForm, isDataField } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import DatePicker from '../index'
import 'element-plus/theme-chalk/index.css'

describe('datePicker', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const page = render(() => (
        <FormProvider form={createForm()}>
          <Field name="date" component={[DatePicker]} />
        </FormProvider>
      ))
      await expect.element(page.getByRole('combobox')).toBeInTheDocument()
    })

    it('应该点击展开日期选择面板', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="date" component={[DatePicker]} />
        </FormProvider>
      ))

      const datePickerDOM = document.querySelector('.el-input__wrapper')
      await userEvent.click(datePickerDOM)

      // 检查日期面板是否显示
      const datePanel = document.querySelector('.el-picker__popper')
      expect(datePanel).toBeInTheDocument()
    })
  })

  describe('默认格式测试', () => {
    it('应该支持date类型默认格式为YYYY-MM-DD', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="date" component={[DatePicker]} />
        </FormProvider>
      ))

      const datePickerDOM = document.querySelector('.el-input__wrapper')
      await userEvent.click(datePickerDOM)

      const todayButton = document.querySelector('.today')
      await userEvent.click(todayButton)

      const dateValue = form.values.date
      expect(dateValue).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it('应该支持datetime类型默认格式为YYYY-MM-DD HH:mm:ss', async () => {
      const form = createForm()
      const page = render(() => (
        <FormProvider form={form}>
          <Field name="datetime" component={[DatePicker, { type: 'datetime' }]} />
        </FormProvider>
      ))

      await expect.element(page.getByRole('combobox')).toBeInTheDocument()
      await page.getByRole('combobox').click()
      const todayButton = document.querySelector('.today')
      await userEvent.click(todayButton)
      const datetimeValue = form.values.datetime
      expect(datetimeValue).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    })

    it('应该支持year类型默认格式为YYYY', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="year" component={[DatePicker, { type: 'year' }]} />
        </FormProvider>
      ))

      const datePickerDOM = document.querySelector('.el-input__wrapper')
      await userEvent.click(datePickerDOM)

      const yearCell = document.querySelector('.el-year-table td.today')
      await userEvent.click(yearCell)

      const yearValue = form.values.year
      expect(yearValue).toMatch(/^\d{4}$/)
    })

    it('应该支持month类型默认格式为YYYY-MM', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="month" component={[DatePicker, { type: 'month' }]} />
        </FormProvider>
      ))

      const datePickerDOM = document.querySelector('.el-input__wrapper')
      await userEvent.click(datePickerDOM)

      // 选择当前月份
      const monthCell = document.querySelector('.el-month-table td.today')
      await userEvent.click(monthCell)

      // 验证格式是否为 YYYY-MM
      const monthValue = form.values.month
      expect(monthValue).toMatch(/^\d{4}-\d{2}$/)
    })

    it('应该支持week类型默认格式为YYYY-MM-DD', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="week" component={[DatePicker, { type: 'week' }]} />
        </FormProvider>
      ))

      const datePickerDOM = document.querySelector('.el-input__wrapper')
      await userEvent.click(datePickerDOM)

      // 选择当前周
      const weekCell = document.querySelector('.el-date-table tr td.available')
      await userEvent.click(weekCell)

      // 验证格式是否正确
      const weekValue = form.values.week
      expect(weekValue).not.toBeUndefined()
    })

    it('应该支持daterange类型默认格式为YYYY-MM-DD', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="daterange" component={[DatePicker, { type: 'daterange' }]} />
        </FormProvider>
      ))

      const datePickerDOM = document.querySelector('.el-input__wrapper')
      await userEvent.click(datePickerDOM)

      // 选择日期范围
      const dateCells = document.querySelectorAll('.el-date-table tr td.available')
      await userEvent.click(dateCells[0])
      await userEvent.click(dateCells[5])

      // 验证格式是否为 YYYY-MM-DD,YYYY-MM-DD
      const daterangeValue = form.values.daterange
      expect(daterangeValue).toHaveLength(2)
      expect(daterangeValue[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(daterangeValue[1]).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    it('应该支持monthrange类型默认格式为YYYY-MM', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="monthrange" component={[DatePicker, { type: 'monthrange' }]} />
        </FormProvider>
      ))

      const datePickerDOM = document.querySelector('.el-input__wrapper')
      await userEvent.click(datePickerDOM)

      // 选择月份范围
      const monthCells = document.querySelectorAll('.el-date-table-cell')
      await userEvent.click(monthCells[0])
      await userEvent.click(monthCells[3])

      // 验证格式是否为 YYYY-MM,YYYY-MM
      const monthrangeValue = form.values.monthrange
      expect(monthrangeValue).toHaveLength(2)
      expect(monthrangeValue[0]).toMatch(/^\d{4}-\d{2}$/)
      expect(monthrangeValue[1]).toMatch(/^\d{4}-\d{2}$/)
    })
  })

  describe('表单交互', () => {
    it('应该在选择日期时更新表单值', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="date" component={[DatePicker]} />
        </FormProvider>
      ))

      const datePickerDOM = document.querySelector('.el-input__wrapper')
      await userEvent.click(datePickerDOM)

      // 选择一个日期
      const dateCell = document.querySelector('.el-date-table tr td.available')
      await userEvent.click(dateCell)

      // 验证表单值已更新
      expect(form.values.date).not.toBeUndefined()
    })
  })

  describe('属性传递', () => {
    it('应该支持禁用状态', async () => {
      const { getByRole } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="date" component={[DatePicker, { disabled: true }]} />
        </FormProvider>
      ))

      await expect.element(getByRole('combobox')).toBeDisabled()
    })

    it('应该支持只读状态', async () => {
      const { getByRole } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="date" component={[DatePicker, { readonly: true }]} />
        </FormProvider>
      ))

      await expect.element(getByRole('combobox')).toHaveAttribute('readonly')
    })

    it('应该支持自定义格式', async () => {
      const form = createForm()
      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field name="date" component={[DatePicker, { format: 'DD/MM/YYYY', valueFormat: 'DD/MM/YYYY' }]} />
        </FormProvider>
      ))

      await expect.element(getByRole('combobox')).toBeInTheDocument()
      await getByRole('combobox').click()
      const todayButton = document.querySelector('.today')
      await userEvent.click(todayButton)
      const dateValue = form.values.date
      expect(dateValue).toMatch(/^(?:\d{2}\/){2}\d{4}$/)
    })

    it('应该响应 setComponentProps 动态更新 disabledDate', async () => {
      const form = createForm()

      render(() => (
        <FormProvider form={form}>
          <Field
            name="startDateRange"
            component={[DatePicker, { type: 'datetimerange' }]}
          />
          <Field
            name="endDateRange"
            component={[DatePicker, {
              type: 'datetimerange',
              class: 'end-date-range-input',
              popperClass: 'end-date-range-picker',
            }]}
            reactions={(field) => {
              const startDateRange = form.query('startDateRange').take()
              const range = startDateRange && isDataField(startDateRange)
                ? startDateRange.value as string[] | undefined
                : undefined

              if (!range?.[0] || !range[1])
                return

              const startDate = new Date(range[0])
              const endDate = new Date(range[1])

              startDate.setHours(0, 0, 0, 0)
              endDate.setHours(23, 59, 59, 999)

              field.setComponentProps({
                disabledDate: (time: Date) => time.getTime() < startDate.getTime()
                  || time.getTime() > endDate.getTime(),
              })
            }}
          />
        </FormProvider>
      ))

      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      const date = `${year}-${month}-${day}`
      const startDateRange = form.query('startDateRange').take()

      if (startDateRange && isDataField(startDateRange)) {
        startDateRange.setValue([
          `${date} 00:00:00`,
          `${date} 23:59:59`,
        ])
      }

      const endDateRange = form.query('endDateRange').take()
      await vi.waitFor(() => {
        expect(endDateRange?.componentProps.disabledDate).toBeTypeOf('function')
        expect(endDateRange?.componentProps.disabledDate(new Date(year, today.getMonth(), today.getDate() + 1))).toBe(true)
      })

      const datePickerDOM = document.querySelector('.end-date-range-input')
      await userEvent.click(datePickerDOM)

      await vi.waitFor(() => {
        const disabledCells = document.querySelectorAll('.end-date-range-picker td.disabled')
        expect(disabledCells.length).toBeGreaterThan(0)
      })
    })
  })
})
