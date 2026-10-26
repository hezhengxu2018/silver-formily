import { createForm } from '@silver-formily/core'
import { createSchemaField, Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { FormItem, Picker } from '../src'

const columns = [[{ label: '苹果', value: 'apple' }, { label: '梨', value: 'pear' }]]
afterEach(cleanup)

async function closed() {
  await vi.waitFor(() => {
    const popup = document.querySelector('.adm-picker-popup')
    expect(!popup || getComputedStyle(popup).display === 'none').toBe(true)
  })
}

it('uses field initialValue, opens from the row once and commits native confirmation', async () => {
  const form = createForm()
  const onConfirm = vi.fn()
  const onChange = vi.fn()
  const afterShow = vi.fn()
  const screen = await render(
    <FormProvider form={form}>
      <Field name="fruit" title="水果" initialValue={['pear']} dataSource={columns} decorator={[FormItem]} component={[Picker, { onConfirm, onChange, afterShow, confirmText: '确定', cancelText: '取消' }]} />
    </FormProvider>,
  )
  await expect.element(screen.getByRole('button', { name: '水果', exact: true })).toHaveTextContent('梨')
  expect(document.querySelector('.adm-list-item-content-arrow')).toBeNull()
  await screen.getByText('水果', { exact: true }).click()
  document.querySelector<HTMLButtonElement>('.adm-formily-picker-trigger')!.click()
  await vi.waitFor(() => expect(afterShow).toHaveBeenCalledOnce())
  expect(document.querySelectorAll('.adm-picker-popup')).toHaveLength(1)
  document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[1].click()
  await closed()
  expect(form.values.fruit).toEqual(['pear'])
  expect(onChange).toHaveBeenCalledOnce()
  expect(onConfirm).toHaveBeenCalledWith(['pear'], expect.objectContaining({ items: [expect.objectContaining({ value: 'pear' })] }))
  form.setValues({ fruit: ['apple'] })
  await expect.element(screen.getByRole('button', { name: '水果', exact: true })).toHaveTextContent('苹果')
  await form.reset()
  await expect.element(screen.getByRole('button', { name: '水果', exact: true })).toHaveTextContent('梨')
})

it('cancels without changing the field and opens again with its latest value', async () => {
  const form = createForm({ initialValues: { fruit: ['apple'] } })
  const onChange = vi.fn()
  const afterShow = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="fruit" title="水果" dataSource={columns} decorator={[FormItem]} component={[Picker, { onChange, afterShow }]} /></FormProvider>)
  await screen.getByText('水果', { exact: true }).click()
  await vi.waitFor(() => expect(afterShow).toHaveBeenCalledOnce())
  document.querySelector<HTMLElement>('.adm-mask')!.click()
  await closed()
  expect(onChange).not.toHaveBeenCalled()
  expect(form.values.fruit).toEqual(['apple'])
  form.setValues({ fruit: ['pear'] })
  await screen.getByRole('button', { name: '水果', exact: true }).click()
  await vi.waitFor(() => expect(afterShow).toHaveBeenCalledTimes(2))
  document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[1].click()
  await closed()
  expect(form.values.fruit).toEqual(['pear'])
})

it('does not expose a row action in disabled mode', async () => {
  const form = createForm({ initialValues: { fruit: ['apple'] } })
  const screen = await render(<FormProvider form={form}><Field name="fruit" title="水果" pattern="disabled" dataSource={columns} decorator={[FormItem]} component={[Picker]} /></FormProvider>)
  await expect.element(screen.getByRole('button', { name: '水果', exact: true })).toBeDisabled()
  expect(document.querySelector('.adm-list-item-content-arrow')).toBeNull()
  expect(document.querySelector('.adm-picker-popup')).toBeNull()
})

it('supports disabled mode without FormItem', async () => {
  const onChange = vi.fn()
  const screen = await render(<Picker disabled columns={columns} value={['apple']} onChange={onChange} />)
  const trigger = screen.getByRole('button')
  await expect.element(trigger).toBeDisabled()
  expect(document.querySelector('.adm-list-item-disabled')).not.toBeNull()
  expect(document.querySelector('.adm-picker-popup')).toBeNull()
  expect(onChange).not.toHaveBeenCalled()
})

it('keeps the Picker openable but immutable in readOnly mode', async () => {
  const form = createForm({ initialValues: { fruit: ['apple'] } })
  const onChange = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="fruit" title="水果" pattern="readOnly" dataSource={columns} decorator={[FormItem]} component={[Picker, { displayRender: () => <strong>自定义展示</strong>, onChange }]} /></FormProvider>)
  await expect.element(screen.getByText('自定义展示')).toBeInTheDocument()
  expect(document.querySelector('.adm-list-item-content-arrow')).toBeNull()
  await screen.getByText('水果', { exact: true }).click()
  await vi.waitFor(() => expect(document.querySelector('.adm-picker-popup')).not.toBeNull())
  expect(document.querySelectorAll('.adm-picker-view-column-item')).toHaveLength(2)
  expect(document.querySelector('.adm-formily-picker-readonly-popup .adm-picker-view')).not.toBeNull()
  document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[1].click()
  await closed()
  expect(onChange).not.toHaveBeenCalled()
})

it('does not expose a row action in readPretty mode', async () => {
  const form = createForm({ initialValues: { fruit: ['apple'] } })
  const screen = await render(<FormProvider form={form}><Field name="fruit" title="水果" pattern="readPretty" dataSource={columns} decorator={[FormItem]} component={[Picker, { displayRender: () => <strong>自定义展示</strong> }]} /></FormProvider>)
  await expect.element(screen.getByText('自定义展示')).toBeInTheDocument()
  expect(document.querySelector('.adm-list-item-content-arrow')).toBeNull()
  await screen.getByText('自定义展示').click()
  expect(document.querySelector('.adm-picker-popup')).toBeNull()
  expect(document.querySelector('.adm-formily-picker-trigger')).toBeNull()
})

it('lets FormItem prevent row opening while the Picker button opens independently', async () => {
  const form = createForm()
  const onClick = vi.fn(event => event.preventDefault())
  const screen = await render(<FormProvider form={form}><Field name="fruit" title="水果" dataSource={columns} decorator={[FormItem, { onClick }]} component={[Picker]} /></FormProvider>)
  await screen.getByText('水果', { exact: true }).click()
  expect(onClick).toHaveBeenCalledOnce()
  expect(document.querySelector('.adm-picker-popup')).toBeNull()
  await screen.getByRole('button', { name: '水果', exact: true }).click()
  expect(onClick).toHaveBeenCalledOnce()
  await vi.waitFor(() => expect(document.querySelector('.adm-picker-popup')).not.toBeNull())
})

it('keeps the trigger when the field becomes read-only', async () => {
  const form = createForm({ initialValues: { fruit: ['apple'] } })
  const afterShow = vi.fn()
  const onChange = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="fruit" title="水果" dataSource={columns} decorator={[FormItem]} component={[Picker, { afterShow, onChange }]} /></FormProvider>)
  await screen.getByText('水果', { exact: true }).click()
  await vi.waitFor(() => expect(afterShow).toHaveBeenCalledOnce())
  form.setFieldState('fruit', { pattern: 'readOnly' })
  await vi.waitFor(() => expect(document.querySelector('.adm-formily-picker-trigger')).not.toBeNull())
  document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[1].click()
  await closed()
  expect(onChange).toHaveBeenCalledWith(['apple'])
})

it('does not write back after unmounting an open field', async () => {
  const form = createForm({ initialValues: { fruit: ['apple'] } })
  const afterShow = vi.fn()
  const onChange = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="fruit" title="水果" dataSource={columns} decorator={[FormItem]} component={[Picker, { afterShow, onChange }]} /></FormProvider>)
  await screen.getByText('水果', { exact: true }).click()
  await vi.waitFor(() => expect(afterShow).toHaveBeenCalledOnce())
  await cleanup()
  await closed()
  expect(onChange).not.toHaveBeenCalled()
})

it('displays function columns, zero values and missing labels in preview', async () => {
  const form = createForm({ initialValues: { fruit: [0, 'missing'] } })
  const screen = await render(<FormProvider form={form}><Field name="fruit" pattern="readPretty" component={[Picker, { columns: () => [[{ value: 0, label: '零' }], []] }]} /></FormProvider>)
  await expect.element(screen.getByText('零 / missing')).toBeInTheDocument()
})


it('maps Schema enum and updates labels when field dataSource changes', async () => {
  const form = createForm()
  const SchemaField = createSchemaField({ components: { Picker } })
  const screen = await render(
    <FormProvider form={form}>
      <SchemaField schema={{ type: 'object', properties: { fruit: {
        'type': 'array',
        'default': ['pear'],
        'enum': columns,
        'x-component': 'Picker',
      } } }}
      />
    </FormProvider>,
  )
  await expect.element(screen.getByRole('button', { name: '梨', exact: true })).toBeInTheDocument()
  form.setFieldState('fruit', { dataSource: [[{ label: '雪梨', value: 'pear' }]] })
  await expect.element(screen.getByRole('button', { name: '雪梨', exact: true })).toBeInTheDocument()
  expect(form.values.fruit).toEqual(['pear'])
})


it.each(['confirm', 'cancel'])('refreshes open columns without writing field values until %s', async (action) => {
  const form = createForm({ initialValues: { fruit: ['apple'] } })
  const onChange = vi.fn()
  const afterShow = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="fruit" title="水果" dataSource={columns} decorator={[FormItem]} component={[Picker, { onChange, afterShow }]} /></FormProvider>)
  await screen.getByText('水果', { exact: true }).click()
  await vi.waitFor(() => expect(afterShow).toHaveBeenCalledOnce())
  form.setFieldState('fruit', { dataSource: [[{ label: '香蕉', value: 'banana' }]] })
  await vi.waitFor(() => expect(document.querySelector('.adm-picker-view')?.textContent).toContain('香蕉'))
  expect(form.values.fruit).toEqual(['apple'])
  expect(onChange).not.toHaveBeenCalled()
  document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[action === 'confirm' ? 1 : 0].click()
  await closed()
  expect(form.values.fruit).toEqual(action === 'confirm' ? ['banana'] : ['apple'])
  expect(onChange).toHaveBeenCalledTimes(action === 'confirm' ? 1 : 0)
})

it('delegates row clicks to a marked DOM button without duplicate callbacks', async () => {
  const onClick = vi.fn()
  const onTrigger = vi.fn()
  const screen = await render(
    <FormItem.BaseItem label="自定义控件" onClick={onClick}>
      <button type="button" data-form-item-trigger="" onClick={onTrigger}>打开</button>
      <button type="button">其他操作</button>
    </FormItem.BaseItem>,
  )
  await screen.getByText('自定义控件', { exact: true }).click()
  expect(onClick).toHaveBeenCalledOnce()
  expect(onTrigger).toHaveBeenCalledOnce()
  await screen.getByRole('button', { name: '打开', exact: true }).click()
  expect(onClick).toHaveBeenCalledOnce()
  expect(onTrigger).toHaveBeenCalledTimes(2)
  await screen.getByRole('button', { name: '其他操作' }).click()
  expect(onClick).toHaveBeenCalledOnce()
  expect(onTrigger).toHaveBeenCalledTimes(2)
})

it('does not choose between multiple marked triggers', async () => {
  const onTrigger = vi.fn()
  const screen = await render(
    <FormItem.BaseItem label="多个控件">
      <button type="button" data-form-item-trigger="" onClick={onTrigger}>第一个</button>
      <button type="button" data-form-item-trigger="" onClick={onTrigger}>第二个</button>
    </FormItem.BaseItem>,
  )
  await screen.getByText('多个控件', { exact: true }).click()
  expect(onTrigger).not.toHaveBeenCalled()
  expect(document.querySelector('.adm-list-item-content-arrow')).toBeNull()
})

it('looks up the current trigger only when the row is clicked', async () => {
  const onTrigger = vi.fn()
  const content = (disabled: boolean, present = true) => (
    <FormItem.BaseItem label="动态控件">
      {present && <button type="button" data-form-item-trigger="" disabled={disabled} onClick={onTrigger}>打开</button>}
    </FormItem.BaseItem>
  )
  const screen = await render(content(false))
  await screen.rerender(content(true))
  await screen.getByText('动态控件', { exact: true }).click()
  expect(onTrigger).not.toHaveBeenCalled()
  await screen.rerender(content(false))
  await screen.getByText('动态控件', { exact: true }).click()
  expect(onTrigger).toHaveBeenCalledOnce()
  await screen.rerender(content(false, false))
  await screen.getByText('动态控件', { exact: true }).click()
  expect(onTrigger).toHaveBeenCalledOnce()
})


it('reacts to Field disabled and title changes without observing DOM attributes', async () => {
  const form = createForm()
  const afterShow = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="fruit" title="水果" dataSource={columns} decorator={[FormItem]} component={[Picker, { afterShow }]} /></FormProvider>)
  form.setFieldState('fruit', { pattern: 'disabled', title: '已禁用水果' })
  await expect.element(screen.getByRole('button', { name: '已禁用水果', exact: true })).toBeDisabled()
  document.querySelector<HTMLElement>('.adm-formily-item')!.click()
  expect(document.querySelector('.adm-picker-popup')).toBeNull()
  form.setFieldState('fruit', { pattern: 'editable', title: '选择水果' })
  await expect.element(screen.getByRole('button', { name: '选择水果', exact: true })).toBeEnabled()
  await screen.getByText('选择水果', { exact: true }).click()
  await vi.waitFor(() => expect(afterShow).toHaveBeenCalledOnce())
})
