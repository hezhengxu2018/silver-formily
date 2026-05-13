import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import PickerSelect from '../index'
import 'element-plus/theme-chalk/index.css'

const options = [
  { value: '1', label: 'Option 1', raw: { id: 1 } },
  { value: '2', label: 'Option 2', raw: { id: 2 } },
  { value: '3', label: 'Option 3', raw: { id: 3 } },
]

describe('pickerSelect', () => {
  it('应该支持外部直接传入 options 展示 label', async () => {
    const page = render(() => (
      <PickerSelect options={options} modelValue="2" />
    ))

    await expect.element(page.getByText('Option 2').first()).toBeInTheDocument()
  })

  it('应该在 dataSource 找不到匹配项时回退展示 value', async () => {
    const form = createForm({
      initialValues: {
        picker: 'missing-value',
      },
    })

    const page = render(() => (
      <FormProvider form={form}>
        <Field name="picker" component={[PickerSelect]} />
      </FormProvider>
    ))

    await expect.element(page.getByText('missing-value').first()).toBeInTheDocument()
  })

  it('单选时点击应触发 openPicker 并只写入 value', async () => {
    const form = createForm()
    const openPicker = vi.fn().mockResolvedValue(options[1])

    const page = render(() => (
      <FormProvider form={form}>
        <Field
          name="picker"
          component={[
            PickerSelect,
            {
              openPicker,
            },
          ]}
          dataSource={options}
        />
      </FormProvider>
    ))

    await userEvent.click(page.container.querySelector('.el-select__wrapper')!)

    await vi.waitFor(() => {
      expect(openPicker).toHaveBeenCalledTimes(1)
      expect(form.values.picker).toEqual('2')
    })

    expect(page.container.textContent).toContain('Option 2')
  })

  it('多选时应写入 value 数组', async () => {
    const form = createForm()
    const openPicker = vi.fn().mockResolvedValue([options[0], options[2]])

    const page = render(() => (
      <FormProvider form={form}>
        <Field
          name="picker"
          component={[
            PickerSelect,
            {
              multiple: true,
              openPicker,
            },
          ]}
          dataSource={options}
        />
      </FormProvider>
    ))

    await userEvent.click(page.container.querySelector('.el-select__wrapper')!)

    await vi.waitFor(() => {
      expect(form.values.picker).toEqual(['1', '3'])
    })
  })

  it('openPicker 返回空值时不应修改字段', async () => {
    const form = createForm({
      initialValues: {
        picker: '1',
      },
    })
    const openPicker = vi.fn().mockResolvedValue(undefined)

    const page = render(() => (
      <FormProvider form={form}>
        <Field
          name="picker"
          component={[
            PickerSelect,
            {
              openPicker,
            },
          ]}
          dataSource={options}
        />
      </FormProvider>
    ))

    await userEvent.click(page.container.querySelector('.el-select__wrapper')!)

    await vi.waitFor(() => {
      expect(openPicker).toHaveBeenCalledTimes(1)
      expect(form.values.picker).toEqual('1')
    })
  })

  it('disabled 时不应触发 openPicker', async () => {
    const form = createForm()
    const openPicker = vi.fn().mockResolvedValue(options[0])

    const page = render(() => (
      <FormProvider form={form}>
        <Field
          name="picker"
          component={[
            PickerSelect,
            {
              openPicker,
              disabled: true,
            },
          ]}
          dataSource={options}
        />
      </FormProvider>
    ))

    await userEvent.click(page.container.querySelector('.el-select__wrapper')!)

    await vi.waitFor(() => {
      expect(openPicker).not.toHaveBeenCalled()
    })
  })

  it('clearable 单选时应清成 undefined', async () => {
    const form = createForm({
      initialValues: {
        picker: '2',
      },
    })

    const page = render(() => (
      <FormProvider form={form}>
        <Field
          name="picker"
          component={[
            PickerSelect,
            {
              clearable: true,
            },
          ]}
          dataSource={options}
        />
      </FormProvider>
    ))

    await userEvent.hover(page.container.querySelector('.el-select__wrapper')!)
    await userEvent.click(page.container.querySelector('.el-select__clear')!)

    await vi.waitFor(() => {
      expect(form.values.picker).toBeUndefined()
    })
  })

  it('clearable 多选时应清成空数组', async () => {
    const form = createForm({
      initialValues: {
        picker: ['1', '2'],
      },
    })

    const page = render(() => (
      <FormProvider form={form}>
        <Field
          name="picker"
          component={[
            PickerSelect,
            {
              multiple: true,
              clearable: true,
            },
          ]}
          dataSource={options}
        />
      </FormProvider>
    ))

    await userEvent.hover(page.container.querySelector('.el-select__wrapper')!)
    await userEvent.click(page.container.querySelector('.el-select__clear')!)

    await vi.waitFor(() => {
      expect(form.values.picker).toEqual([])
    })
  })

  it('点击 clear 后下一次点击应直接触发 openPicker', async () => {
    const form = createForm({
      initialValues: {
        picker: ['1', '2'],
      },
    })
    const openPicker = vi.fn().mockResolvedValue([options[2]])

    const page = render(() => (
      <FormProvider form={form}>
        <Field
          name="picker"
          component={[
            PickerSelect,
            {
              multiple: true,
              clearable: true,
              openPicker,
            },
          ]}
          dataSource={options}
        />
      </FormProvider>
    ))

    await userEvent.hover(page.container.querySelector('.el-select__wrapper')!)
    await vi.waitFor(() => {
      expect(page.container.querySelector('.el-select__clear')).toBeTruthy()
    })
    await userEvent.click(page.container.querySelector('.el-select__clear')!)

    await vi.waitFor(() => {
      expect(form.values.picker).toEqual([])
      expect(openPicker).not.toHaveBeenCalled()
    })

    await userEvent.click(page.container.querySelector('.el-select__wrapper')!)

    await vi.waitFor(() => {
      expect(openPicker).toHaveBeenCalledTimes(1)
      expect(form.values.picker).toEqual(['3'])
    })
  })

  it('openPicker 返回的新 option 即使不在 dataSource 中也应通过缓存展示 label', async () => {
    const form = createForm()
    const openPicker = vi.fn().mockResolvedValue({
      value: '100',
      label: 'Cached Label',
      raw: { id: 100 },
    })

    const page = render(() => (
      <FormProvider form={form}>
        <Field
          name="picker"
          component={[
            PickerSelect,
            {
              openPicker,
            },
          ]}
          dataSource={[]}
        />
      </FormProvider>
    ))

    await userEvent.click(page.container.querySelector('.el-select')!)

    await vi.waitFor(() => {
      expect(form.values.picker).toEqual('100')
    })

    expect(page.container.textContent).toContain('Cached Label')
  })

  it('cacheSelectedOptions 为 false 时应回退展示 value', async () => {
    const form = createForm()
    const openPicker = vi.fn().mockResolvedValue({
      value: '100',
      label: 'Cached Label',
    })

    const page = render(() => (
      <FormProvider form={form}>
        <Field
          name="picker"
          component={[
            PickerSelect,
            {
              openPicker,
              cacheSelectedOptions: false,
            },
          ]}
          dataSource={[]}
        />
      </FormProvider>
    ))

    await userEvent.click(page.container.querySelector('.el-select')!)

    await vi.waitFor(() => {
      expect(form.values.picker).toEqual('100')
    })

    expect(page.container.textContent).toContain('100')
  })

  it('readPretty 下应继续复用 PreviewText.Select', async () => {
    render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="picker"
          component={[PickerSelect]}
          dataSource={options}
          readPretty={true}
          initialValue="3"
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(document.querySelector('.el-select')).not.toBeInTheDocument()
      expect(document.body.textContent).toContain('Option 3')
    })
  })
})
