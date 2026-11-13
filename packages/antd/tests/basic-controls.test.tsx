import type { ComponentRef } from 'react'
import { createForm, isField } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { ConfigProvider, Upload as NativeUpload, theme } from 'antd'
import dayjs from 'dayjs'
import { createRef } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { Cascader, Checkbox, DatePicker, Form, FormItem, OTP, Password, PreviewText, Radio, Rate, Reset, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload } from '../src'

afterEach(cleanup)

it('binds boolean controls and preserves native events and resets', async () => {
  const form = createForm({ initialValues: { agreed: false, enabled: false, selected: false } })
  const onChange = vi.fn()
  const { getByRole, getByText } = await render(
    <Form form={form}>
      <Field name="agreed" component={[Checkbox, { onChange, children: 'Agree' }]} />
      <Field name="enabled" component={[Switch, { title: 'Enable' }]} />
      <Field name="selected" component={[Radio, { children: 'Select' }]} />
    </Form>,
  )
  await getByRole('checkbox').click()
  expect(form.values.agreed).toBe(true)
  expect(onChange.mock.calls[0][0].target.checked).toBe(true)
  await getByRole('switch').click()
  expect(form.values.enabled).toBe(true)
  await getByRole('radio').click()
  expect(form.values.selected).toBe(true)
  await form.reset()
  await expect.element(getByRole('checkbox')).not.toBeChecked()
  form.setPattern('readPretty')
  await expect.element(getByText('否').first()).toBeVisible()
})

it('binds groups and preserves explicit primitive options with an empty dataSource', async () => {
  const form = createForm()
  const { getByRole, getByText } = await render(
    <Form form={form}>
      <Field name="tags" component={[Checkbox.Group, { options: ['A', 'B'] }]} />
      <Field name="role" dataSource={[{ label: 'Admin', value: 0 }]} component={[Radio.Group]} />
    </Form>,
  )
  await getByRole('checkbox', { name: 'A' }).click()
  await getByRole('radio', { name: 'Admin' }).click()
  expect(form.values.tags).toEqual(['A'])
  expect(form.values.role).toBe(0)
  form.setPattern('readPretty')
  await expect.element(getByText('A', { exact: true })).toBeVisible()
  await expect.element(getByText('Admin', { exact: true })).toBeVisible()
})

it('uses native refs and masks passwords in readPretty', async () => {
  const ref = createRef<ComponentRef<typeof Password>>()
  const form = createForm({ initialValues: { password: 'secret' } })
  const { container, getByText } = await render(
    <Form form={form}>
      <Field
        name="password"
        title="Password"
        decorator={[FormItem]}
        component={[Password, { ref: (instance) => {
          ref.current = instance
        } }]}
      />
    </Form>,
  )
  expect(ref.current?.input?.value).toBe('secret')
  expect(container.querySelector('label')?.htmlFor).toBe(ref.current?.input?.id)
  form.setPattern('readPretty')
  await expect.element(getByText('••••••••')).toBeVisible()
  expect(container.textContent).not.toContain('secret')
  expect(form.values.password).toBe('secret')
})

it('preserves Dayjs values, native callbacks, ranges, multiple selection and clear', async () => {
  const date = dayjs('2026-11-06')
  const form = createForm({ initialValues: { date, range: [date, date.add(1, 'day')], dates: [date], time: date.hour(9) } })
  const onChange = vi.fn()
  const { container, getByText } = await render(
    <Form form={form}>
      <Field name="date" title="Date" decorator={[FormItem]} component={[DatePicker, { valueFormat: false, format: 'DD/MM/YYYY', onChange }]} />
      <Field name="range" title="Range" decorator={[FormItem]} component={[DatePicker.RangePicker, { valueFormat: false }]} />
      <Field name="dates" component={[DatePicker, { multiple: true, valueFormat: false }]} />
      <Field name="time" component={[TimePicker, { valueFormat: false, format: 'HH:mm' }]} />
    </Form>,
  )
  expect(dayjs.isDayjs(form.values.date)).toBe(true)
  const inputs = container.querySelectorAll('input')
  expect(inputs[0].value).toBe('06/11/2026')
  expect(container.querySelectorAll('label')[1].htmlFor).toBe(inputs[1].id)
  form.setPattern('readPretty')
  await expect.element(getByText('06/11/2026')).toBeVisible()
  await expect.element(getByText('09:00')).toBeVisible()
  expect(dayjs.isDayjs(form.values.range[0])).toBe(true)
  form.setPattern('editable')
  await vi.waitFor(() => expect(container.querySelector('.ant-picker-clear')).not.toBeNull())
  await page.elementLocator(container.querySelector('.ant-picker-clear')!).click()
  expect(form.values.date).toBeNull()
  expect(onChange).toHaveBeenCalledWith(null, null)
})

it('renders nested tree and cascader labels, field names, zero values and range placeholders', async () => {
  const form = createForm({ pattern: 'readPretty', initialValues: { tree: 0, path: [1, 0], transfer: ['a'] } })
  const { getByText } = await render(
    <Form form={form}>
      <Field name="tree" dataSource={[{ title: 'Parent', value: 1, children: [{ title: 'Leaf', value: 0 }] }]} component={[TreeSelect]} />
      <Field name="path" dataSource={[{ text: 'Region', id: 1, nodes: [{ text: 'City', id: 0 }] }]} component={[Cascader, { fieldNames: { label: 'text', value: 'id', children: 'nodes' } }]} />
      <Field name="transfer" component={[Transfer, { dataSource: [{ key: 'a', title: 'Item' }] }]} />
      <PreviewText.DateRangePicker value={[dayjs('2026-11-06'), null]} />
    </Form>,
  )
  await expect.element(getByText('Leaf')).toBeVisible()
  await expect.element(getByText('Region')).toBeVisible()
  await expect.element(getByText('City', { exact: false })).toBeVisible()
  await expect.element(getByText('Item')).toBeVisible()
  await expect.element(getByText('N/A', { exact: false })).toBeVisible()
})

it('keeps numeric zero and range values in readPretty', async () => {
  const form = createForm({ pattern: 'readPretty', initialValues: { rate: 0, slider: [0, 10] } })
  const { getByText } = await render(
    <Form form={form}>
      <Field name="rate" component={[Rate]} />
      <Field name="slider" component={[Slider, { range: true }]} />
    </Form>,
  )
  await expect.element(getByText('0', { exact: true })).toBeVisible()
  await expect.element(getByText('0 ~ 10')).toBeVisible()
})

it('preserves upload statics and hides upload mutations in readPretty', async () => {
  expect(Upload.LIST_IGNORE).toBe(NativeUpload.LIST_IGNORE)
  const files = [{ uid: 'a', name: 'report.txt', status: 'done' as const, url: '/report.txt' }]
  const form = createForm({ pattern: 'readPretty', initialValues: { files } })
  const { container, getByText } = await render(<Form form={form}><Field name="files" component={[Upload, { children: 'Upload' }]} /></Form>)
  await expect.element(getByText('report.txt')).toBeVisible()
  expect(container.querySelector<HTMLInputElement>('input[type=file]')?.disabled).toBe(true)
  expect(container.querySelector('[title="Remove file"]')).toBeNull()
  expect(form.values.files).toEqual(files)
})

it('stores upload fileList but delivers the original event through custom requests and removal', async () => {
  const form = createForm()
  const onChange = vi.fn()
  const { container } = await render(
    <Form form={form}>
      <Field
        name="files"
        component={[Upload, {
          onChange,
          customRequest: ({ onSuccess }) => { queueMicrotask(() => onSuccess?.({ url: '/file.txt' })) },
          children: 'Upload',
        }]}
      />
    </Form>,
  )
  await page.elementLocator(container.querySelector('input[type=file]')!).upload(new File(['hello'], 'file.txt', { type: 'text/plain' }))
  await vi.waitFor(() => expect(form.values.files?.[0]?.status).toBe('done'))
  const info = onChange.mock.calls.at(-1)![0]
  expect(info.file.name).toBe('file.txt')
  expect(info.fileList).toEqual(form.values.files)
  expect(form.values.files[0].url).toBeUndefined()
  expect(form.values.files[0].response).toEqual({ url: '/file.txt' })
  await page.getByRole('button', { name: 'Remove file' }).click()
  await vi.waitFor(() => expect(form.values.files).toEqual([]))
})

it('retains upload errors as native file state and honors LIST_IGNORE', async () => {
  const form = createForm()
  const { container } = await render(
    <Form form={form}>
      <Field
        name="files"
        component={[Upload.Dragger, {
          beforeUpload: file => file.name === 'ignored.txt' ? Upload.LIST_IGNORE : true,
          customRequest: ({ onError }) => { queueMicrotask(() => onError?.(new Error('Offline'))) },
          children: 'Drop files',
        }]}
      />
    </Form>,
  )
  const input = page.elementLocator(container.querySelector('input[type=file]')!)
  await input.upload(new File(['ignore'], 'ignored.txt', { type: 'text/plain' }))
  expect(form.values.files ?? []).toEqual([])
  await input.upload(new File(['fail'], 'failed.txt', { type: 'text/plain' }))
  await vi.waitFor(() => expect(form.values.files?.[0]?.status).toBe('error'))
  expect(form.values.files[0].name).toBe('failed.txt')
})

it('preserves date types through reset and submit', async () => {
  const initial = dayjs('2026-11-06')
  const form = createForm({ initialValues: { date: initial } })
  await render(<Form form={form}><Field name="date" component={[DatePicker, { valueFormat: false }]} /></Form>)
  form.setValues({ date: initial.add(1, 'day') })
  await form.reset()
  expect(form.values.date.format('YYYY-MM-DD')).toBe('2026-11-06')
  const submit = vi.fn()
  await form.submit(submit)
  expect(dayjs.isDayjs(submit.mock.calls[0][0].date)).toBe(true)
})

it('writes tree and cascader selections back to the field', async () => {
  const form = createForm()
  const { getByRole } = await render(
    <Form form={form}>
      <Field name="tree" title="Tree" decorator={[FormItem]} component={[TreeSelect, { treeData: [{ title: 'Leaf', value: 0 }], style: { width: 240 } }]} />
      <Field name="path" title="Path" decorator={[FormItem]} component={[Cascader, { options: [{ label: 'Region', value: 1, children: [{ label: 'City', value: 0 }] }] }]} />
    </Form>,
  )
  await getByRole('combobox', { name: 'Tree' }).click()
  await page.getByText('Leaf', { exact: true }).click()
  expect(form.values.tree).toBe(0)
  await getByRole('combobox', { name: 'Path' }).click()
  await page.getByText('Region', { exact: true }).click()
  await page.getByText('City', { exact: true }).click()
  expect(form.values.path).toEqual([1, 0])
})

it('binds Transfer targetKeys and preserves direction and move keys', async () => {
  const form = createForm()
  const onChange = vi.fn()
  const { container } = await render(
    <Form form={form}>
      <Field
        name="items"
        component={[Transfer, {
          dataSource: [{ key: 'a', title: 'Item A' }],
          render: item => item.title ?? '',
          onChange,
        }]}
      />
    </Form>,
  )
  await page.getByText('Item A', { exact: true }).click()
  await page.elementLocator(container.querySelector('.ant-transfer-actions button')!).click()
  await vi.waitFor(() => expect(form.values.items).toEqual(['a']))
  expect(onChange).toHaveBeenCalledWith(['a'], 'right', ['a'])
})

it('inherits native disabled state, theme and variants for added controls', async () => {
  const form = createForm({ pattern: 'disabled' })
  const { container, getByRole } = await render(
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Form form={form} size="large" variant="filled">
        <Field name="password" decorator={[FormItem, { feedbackStatus: 'error' }]} component={[Password]} />
        <Field name="date" component={[DatePicker, { valueFormat: false }]} />
        <Field name="enabled" component={[Switch]} />
        <Field name="rating" component={[Rate]} />
      </Form>
    </ConfigProvider>,
  )
  await expect.element(getByRole('switch')).toBeDisabled()
  expect(container.querySelector<HTMLInputElement>('input[type=password]')?.disabled).toBe(true)
  expect(container.querySelector('.ant-picker')?.className).toContain('filled')
  expect(container.querySelector('.ant-picker')?.className).toContain('large')
})

it('preserves native option values in standalone and field-bound groups', async () => {
  const form = createForm()
  const standalone = vi.fn()
  const radioChildren = [<Radio key="a" value="a">A</Radio>, <Radio key="b" value="b">B</Radio>]
  const { getByRole } = await render(
    <Form form={form}>
      <Checkbox.Group onChange={standalone}><Checkbox value="standalone">Standalone</Checkbox></Checkbox.Group>
      <Field
        name="radio"
        component={[Radio.Group, { children: radioChildren }]}
      />
    </Form>,
  )
  await getByRole('checkbox', { name: 'Standalone' }).click()
  expect(standalone).toHaveBeenCalledWith(['standalone'])
  await getByRole('radio', { name: 'A', exact: true }).click()
  expect(form.values.radio).toBe('a')
  await getByRole('radio', { name: 'B', exact: true }).click()
  expect(form.values.radio).toBe('b')
  form.setPattern('readPretty')
  await expect.element(page.getByText('B', { exact: true })).toBeVisible()
})


it('binds every OTP input, preserves input events and refs, resets and masks readPretty', async () => {
  const form = createForm({ initialValues: { otp: '1234' } })
  const ref = createRef<ComponentRef<typeof OTP>>()
  const onChange = vi.fn()
  const onInput = vi.fn()
  const { getByRole, getByText, container } = await render(
    <Form form={form}>
      <Field
        name="otp"
        decorator={[FormItem]}
        component={[OTP, { length: 4, ref: (instance) => {
          ref.current = instance
        }, onChange, onInput }]}
      />
    </Form>,
  )
  expect(getByRole('textbox').elements()).toHaveLength(4)
  ref.current?.focus()
  expect(document.activeElement).toBe(getByRole('textbox').first().element())
  await getByRole('textbox').last().fill('5')
  await vi.waitFor(() => expect(form.values.otp).toBe('1235'))
  expect(onChange).toHaveBeenLastCalledWith('1235')
  expect(onInput).toHaveBeenLastCalledWith(['1', '2', '3', '5'])
  onChange.mockClear()
  await getByRole('textbox').last().fill('')
  expect(onChange).not.toHaveBeenCalled()
  expect(form.values.otp).toBe('123')
  expect(onInput).toHaveBeenLastCalledWith(['1', '2', '3'])
  await form.reset()
  await expect.element(getByRole('textbox').last()).toHaveValue('4')
  form.setPattern('disabled')
  await expect.element(getByRole('textbox').first()).toBeDisabled()
  form.setPattern('readPretty')
  await expect.element(getByText('••••••••')).toBeVisible()
  expect(container.querySelector('input')).toBeNull()
  expect(form.values.otp).toBe('1234')
})

it.each([false, true])('resets password and OTP through the button (forceClear=%s)', async (forceClear) => {
  const form = createForm({ initialValues: { password: 'secret', otp: '1234' } })
  const { container, getByRole } = await render(
    <Form form={form}>
      <Field name="password" component={[Password]} />
      <Field name="otp" component={[OTP, { length: 4 }]} />
      <Reset forceClear={forceClear}>Reset</Reset>
    </Form>,
  )
  const password = page.elementLocator(container.querySelector('input[type=password]')!)
  await password.fill('changed')
  await getByRole('textbox').last().fill('5')
  expect(form.values.password).toBe('changed')
  expect(form.values.otp).toBe('1235')
  await getByRole('button', { name: 'Reset', exact: true }).click()
  await expect.element(password).toHaveValue(forceClear ? '' : 'secret')
  for (const [index, input] of container.querySelectorAll<HTMLInputElement>('.ant-otp input').entries()) {
    await expect.element(input).toHaveValue(forceClear ? '' : '1234'[index])
  }
})

it('validates partial OTP input and restores it through form and field resets', async () => {
  const form = createForm({ initialValues: { otp: '1234' } })
  const onChange = vi.fn()
  const { getByRole } = await render(
    <Form form={form}>
      <Field name="otp" validator={{ len: 4, message: 'Enter four characters' }} component={[OTP, { length: 4, onChange }]} />
      <Reset>Reset</Reset>
    </Form>,
  )
  await getByRole('textbox').last().fill('')
  expect(form.values.otp).toBe('123')
  await expect(form.validate()).rejects.toBeDefined()
  expect(form.errors[0].messages).toContain('Enter four characters')
  expect(onChange).not.toHaveBeenCalled()
  await getByRole('button', { name: 'Reset', exact: true }).click()
  await expect.element(getByRole('textbox').last()).toHaveValue('4')
  await getByRole('textbox').last().fill('')
  const field = form.query('otp').take()!
  if (!isField(field))
    throw new Error('Expected an OTP field')
  await field.reset()
  await expect.element(getByRole('textbox').last()).toHaveValue('4')
  expect(onChange).not.toHaveBeenCalled()
})
