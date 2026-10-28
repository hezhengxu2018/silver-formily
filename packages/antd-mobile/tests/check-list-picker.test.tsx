import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { CheckListPicker, FormItem } from '../src'

const options = [{ label: '苹果', value: 'apple' }, { label: '梨', value: 'pear' }]
afterEach(cleanup)

async function closed() {
  await vi.waitFor(() => expect(document.querySelector('.adm-formily-popup-root')).toBeNull())
}

it('stages multiple selection, cancels without writing and commits confirmation', async () => {
  const form = createForm({ initialValues: { fruit: ['apple'] } })
  const onChange = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="fruit" title="水果" dataSource={options} decorator={[FormItem]} component={[CheckListPicker, { multiple: true, onChange }]} /></FormProvider>)
  await screen.getByText('水果', { exact: true }).click()
  expect(document.querySelectorAll('.adm-picker-header-button')).toHaveLength(2)
  expect(getComputedStyle(document.querySelector('.adm-picker-popup .adm-popup-body')!).borderTopLeftRadius).toBe('8px')
  await screen.getByText('梨', { exact: true }).click()
  expect(form.values.fruit).toEqual(['apple'])
  await screen.getByRole('button', { name: '取消', exact: true }).click()
  await closed()
  expect(onChange).not.toHaveBeenCalled()
  await screen.getByRole('button', { name: '水果', exact: true }).click()
  await screen.getByText('梨', { exact: true }).click()
  await screen.getByRole('button', { name: '确定', exact: true }).click()
  await closed()
  expect(form.values.fruit).toEqual(['apple', 'pear'])
  expect(onChange).toHaveBeenCalledOnce()
  await expect.element(screen.getByRole('button', { name: '水果', exact: true })).toHaveTextContent('苹果梨')
})

it('supports disabled, readOnly and readPretty patterns', async () => {
  const form = createForm({ initialValues: { fruit: ['apple'] } })
  const onChange = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="fruit" title="水果" pattern="disabled" dataSource={options} component={[CheckListPicker, { onChange }]} /></FormProvider>)
  await expect.element(screen.getByRole('button', { name: '水果', exact: true })).toBeDisabled()
  form.setFieldState('fruit', { pattern: 'readOnly' })
  await expect.element(screen.getByRole('button', { name: '水果', exact: true })).toBeEnabled()
  await screen.getByRole('button', { name: '水果', exact: true }).click()
  await screen.getByText('梨', { exact: true }).click()
  expect(document.querySelector('.adm-formily-popup-root')).not.toBeNull()
  document.querySelector<HTMLElement>('.adm-mask')!.click()
  await closed()
  expect(onChange).not.toHaveBeenCalled()
  expect(form.values.fruit).toEqual(['apple'])
  form.setFieldState('fruit', { pattern: 'readPretty' })
  await expect.element(screen.getByText('苹果', { exact: true })).toBeInTheDocument()
  await vi.waitFor(() => expect(document.querySelector('[data-form-item-trigger]')).toBeNull())
})

it('uses single selection by default and preserves zero and missing values in preview', async () => {
  const onChange = vi.fn()
  const screen = await render(<CheckListPicker options={options} value={['apple']} onChange={onChange} />)
  await screen.getByRole('button', { name: '苹果', exact: true }).click()
  expect(document.querySelector('.adm-picker-header-button')).toBeNull()
  const body = document.querySelector('.adm-picker-popup .adm-popup-body')!
  expect(getComputedStyle(body).borderTopLeftRadius).toBe('8px')
  expect(getComputedStyle(body).borderTopRightRadius).toBe('8px')
  expect(getComputedStyle(body).overflow).toBe('hidden')
  await screen.getByText('梨', { exact: true }).click()
  await closed()
  expect(onChange).toHaveBeenCalledWith(['pear'])
  await screen.rerender(<CheckListPicker options={[{ label: '零', value: 0 }]} value={[0, 'missing']} />)
  await expect.element(screen.getByRole('button')).toHaveTextContent('零 / missing')
})

it('closes an unmounted field without submitting its draft', async () => {
  const onChange = vi.fn()
  const screen = await render(<CheckListPicker multiple options={options} onChange={onChange} />)
  await screen.getByRole('button').click()
  await screen.getByText('梨', { exact: true }).click()
  await cleanup()
  await closed()
  expect(onChange).not.toHaveBeenCalled()
})
