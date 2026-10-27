import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Cascader, FormItem } from '../src'

const options = [{ label: '浙江', value: 'zj', children: [{ label: '杭州', value: 'hz' }, { label: '宁波', value: 'nb' }] }]
afterEach(cleanup)

it('opens from the field row and only writes the selection on confirmation', async () => {
  const form = createForm({ initialValues: { city: ['zj', 'hz'] } })
  const onChange = vi.fn()
  const onConfirm = vi.fn()
  const onCancel = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="city" title="城市" dataSource={options} decorator={[FormItem]} component={[Cascader, { onChange, onConfirm, onCancel, confirmText: '确定', cancelText: '取消' }]} /></FormProvider>)
  await expect.element(screen.getByRole('button', { name: '城市', exact: true })).toHaveTextContent('浙江 / 杭州')
  await screen.getByText('城市', { exact: true }).click()
  await screen.getByText('宁波', { exact: true }).click()
  expect(form.values.city).toEqual(['zj', 'hz'])
  await screen.getByText('取消', { exact: true }).click()
  expect(onCancel).toHaveBeenCalledOnce()
  expect(onChange).not.toHaveBeenCalled()
  await screen.getByRole('button', { name: '城市', exact: true }).click()
  await screen.getByText('宁波', { exact: true }).click()
  await screen.getByText('确定', { exact: true }).click()
  expect(form.values.city).toEqual(['zj', 'nb'])
  expect(onChange).toHaveBeenCalledOnce()
  expect(onConfirm).toHaveBeenCalledWith(['zj', 'nb'], expect.objectContaining({ isLeaf: true }))
})

it('supports disabled, readOnly and readPretty field patterns', async () => {
  const form = createForm({ initialValues: { city: ['zj', 'hz'] } })
  const onChange = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="city" title="城市" pattern="disabled" dataSource={options} decorator={[FormItem]} component={[Cascader, { onChange, confirmText: '确定' }]} /></FormProvider>)
  await expect.element(screen.getByRole('button', { name: '城市', exact: true })).toBeDisabled()
  form.setFieldState('city', { pattern: 'readOnly' })
  await expect.element(screen.getByRole('button', { name: '城市', exact: true })).toBeEnabled()
  await screen.getByText('城市', { exact: true }).click()
  await vi.waitFor(() => expect(document.querySelectorAll('.adm-cascader-view .adm-list-item-disabled')).toHaveLength(3))
  await screen.getByRole('tab', { name: '浙江', exact: true }).click()
  await vi.waitFor(() => expect(document.querySelector('.adm-tabs-tab-active')?.textContent).toBe('浙江'))
  await screen.getByRole('tab', { name: '杭州', exact: true }).click()
  await vi.waitFor(() => expect(document.querySelector('.adm-tabs-tab-active')?.textContent).toBe('杭州'))
  document.querySelectorAll<HTMLElement>('.adm-cascader-view .adm-check-list-item')[2].click()
  expect(document.querySelector('.adm-tabs-tab-active')?.textContent).toBe('杭州')
  await screen.getByText('确定', { exact: true }).click()
  expect(onChange).not.toHaveBeenCalled()
  form.setFieldState('city', { pattern: 'readPretty' })
  await expect.element(screen.getByText('浙江 / 杭州', { exact: true })).toBeInTheDocument()
  await vi.waitFor(() => expect(document.querySelector('.adm-formily-cascader-trigger')).toBeNull())
})

it('uses custom field names and refreshes labels from dataSource', async () => {
  const form = createForm({ initialValues: { city: [0, 'missing'] } })
  const screen = await render(<FormProvider form={form}><Field name="city" dataSource={[{ name: '零', id: 0 }]} component={[Cascader, { fieldNames: { label: 'name', value: 'id', children: 'nodes' } }]} /></FormProvider>)
  await expect.element(screen.getByRole('button')).toHaveTextContent('零 / missing')
  form.setFieldState('city', { dataSource: [{ name: '更新', id: 0 }] })
  await expect.element(screen.getByRole('button')).toHaveTextContent('更新 / missing')
})

it('disables custom-named options in readOnly mode without changing the dataSource', async () => {
  const dataSource = [{ name: '浙江', id: 'zj', nodes: [{ name: '杭州', id: 'hz' }, { name: '宁波', id: 'nb', locked: true }] }]
  const form = createForm({ initialValues: { city: ['zj', 'hz'] } })
  const onSelect = vi.fn()
  const screen = await render(<FormProvider form={form}><Field name="city" title="城市" pattern="readOnly" dataSource={dataSource} component={[Cascader, { fieldNames: { label: 'name', value: 'id', children: 'nodes', disabled: 'locked' }, onSelect }]} /></FormProvider>)
  await screen.getByRole('button', { name: '城市', exact: true }).click()
  await vi.waitFor(() => expect(document.querySelectorAll('.adm-cascader-view .adm-list-item-disabled')).toHaveLength(3))
  document.querySelectorAll<HTMLElement>('.adm-cascader-view .adm-check-list-item')[2].click()
  expect(onSelect).not.toHaveBeenCalled()
  expect(dataSource[0]).not.toHaveProperty('locked')
  expect(dataSource[0].nodes[0]).not.toHaveProperty('locked')
  form.setFieldState('city', { pattern: 'editable' })
  await vi.waitFor(() => expect(document.querySelectorAll('.adm-cascader-view .adm-list-item-disabled')).toHaveLength(1))
  expect(form.values.city).toEqual(['zj', 'hz'])
})
