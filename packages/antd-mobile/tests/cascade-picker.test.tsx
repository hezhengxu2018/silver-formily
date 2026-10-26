import type { ReactNode } from 'react'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { CascadePicker, FormItem } from '../src'

const options = [{ label: '浙江', value: 'zj', children: [{ label: '杭州', value: 'hz' }, { label: '宁波', value: 'nb' }] }]
afterEach(cleanup)

it('opens from the row, confirms the path and restores focus', async () => {
  const form = createForm({ initialValues: { area: ['zj', 'hz'] } })
  const onChange = vi.fn()
  const onConfirm = vi.fn()
  const afterClose = vi.fn()
  const onClose = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="area" title="地区" dataSource={options} decorator={[FormItem]} component={[CascadePicker, { onChange, onConfirm, afterClose, onClose }]} /></FormProvider>)
  const trigger = screen.getByRole('button', { name: '地区', exact: true })
  await expect.element(trigger).toHaveTextContent('浙江 / 杭州')
  await screen.getByText('地区', { exact: true }).click()
  await vi.waitFor(() => expect(document.querySelectorAll('.adm-picker-view-column')).toHaveLength(2))
  document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[1].click()
  await vi.waitFor(() => expect(afterClose).toHaveBeenCalledOnce())
  expect(onClose).toHaveBeenCalledOnce()
  expect(onChange).toHaveBeenCalledWith(['zj', 'hz'], expect.objectContaining({ items: expect.any(Array) }))
  expect(onConfirm).toHaveBeenCalledOnce()
  expect(document.activeElement).toBe(document.querySelector('.adm-formily-cascade-picker-trigger'))
  form.setValues({ area: ['zj', 'nb'] })
  await expect.element(trigger).toHaveTextContent('浙江 / 宁波')
  await form.reset()
  await expect.element(trigger).toHaveTextContent('浙江 / 杭州')
})

it.each(['disabled', 'readOnly', 'readPretty'] as const)('protects the value in %s mode', async (pattern) => {
  const form = createForm({ initialValues: { area: ['zj', 'hz'] } })
  const onChange = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="area" title="地区" pattern={pattern} dataSource={options} decorator={[FormItem, { clearable: true }]} component={[CascadePicker, { onChange, displayRender: (labels: ReactNode[]) => labels.join(' > ') }]} /></FormProvider>)
  await expect.element(screen.getByText('浙江 > 杭州')).toBeInTheDocument()
  expect(document.querySelector('.adm-formily-item-clear')).toBeNull()
  if (pattern === 'disabled') {
    await expect.element(screen.getByRole('button', { name: '地区', exact: true })).toBeDisabled()
  }
  else if (pattern === 'readOnly') {
    await screen.getByText('地区', { exact: true }).click()
    await vi.waitFor(() => expect(document.querySelector('.adm-formily-cascade-picker-readonly-popup')).not.toBeNull())
    document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[1].click()
  }
  else {
    expect(document.querySelector('.adm-formily-cascade-picker-trigger')).toBeNull()
  }
  expect(onChange).not.toHaveBeenCalled()
  expect(form.values.area).toEqual(['zj', 'hz'])
})

it('clears without opening and supports an empty placeholder', async () => {
  const form = createForm({ initialValues: { area: ['zj', 'hz'] } })
  const screen = await render(<FormProvider form={form}><Field name="area" dataSource={options} decorator={[FormItem, { clearable: true }]} component={[CascadePicker, { placeholder: '请选择地区' }]} /></FormProvider>)
  expect(document.querySelectorAll('.adm-list-item-content-arrow')).toHaveLength(1)
  expect(document.querySelector('.adm-list-item-content-arrow .adm-formily-item-clear')).not.toBeNull()
  await screen.getByRole('button', { name: '清除' }).click()
  await vi.waitFor(() => expect(document.querySelector('.adm-formily-item-clear')).toBeNull())
  expect(document.querySelectorAll('.adm-list-item-content-arrow')).toHaveLength(1)
  expect(form.values.area).toBeUndefined()
  await expect.element(screen.getByText('请选择地区')).toBeInTheDocument()
  expect(document.querySelector('.adm-picker-popup')).toBeNull()
})

it('updates labels from new options and cancels without writing', async () => {
  const onChange = vi.fn()
  const onCancel = vi.fn()
  const screen = await render(<CascadePicker value={['zj', 'hz']} options={options} onChange={onChange} onCancel={onCancel} />)
  await screen.rerender(<CascadePicker value={['zj', 'hz']} options={[{ ...options[0], label: '浙江省' }]} onChange={onChange} onCancel={onCancel} />)
  await screen.getByRole('button', { name: '浙江省 / 杭州', exact: true }).click()
  await vi.waitFor(() => expect(document.querySelector('.adm-picker-popup')).not.toBeNull())
  document.querySelectorAll<HTMLElement>('.adm-picker-header-button')[0].click()
  expect(onCancel).toHaveBeenCalledOnce()
  expect(onChange).not.toHaveBeenCalled()
})
