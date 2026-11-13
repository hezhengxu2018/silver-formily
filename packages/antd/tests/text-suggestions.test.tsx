import type { ComponentRef } from 'react'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Input, AutoComplete as NativeAutoComplete, Mentions as NativeMentions } from 'antd'
import { createRef } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'
import { AutoComplete, Form, FormItem, Mentions, PreviewText } from '../src'

afterEach(cleanup)

it('binds free text and selected values while preserving AutoComplete events and refs', async () => {
  const form = createForm({ initialValues: { text: 'initial' } })
  const ref = createRef<ComponentRef<typeof AutoComplete>>()
  const onChange = vi.fn()
  const onSelect = vi.fn()
  const { getByRole, getByText } = await render(
    <Form form={form}>
      <Field name="text" title="Text" decorator={[FormItem]} dataSource={[{ label: 'Field option', value: 'field' }]} component={[AutoComplete, { ref: (instance) => { ref.current = instance }, onChange, onSelect, options: [{ label: 'Fallback', value: 'fallback' }], style: { width: 240 } }]} />
    </Form>,
  )
  ref.current?.focus()
  expect(document.activeElement).toBe(getByRole('combobox', { name: 'Text' }).element())
  await getByRole('combobox').fill('free text')
  expect(form.values.text).toBe('free text')
  expect(onChange.mock.calls.at(-1)?.[0]).toBe('free text')
  await getByRole('combobox').fill('')
  await page.getByText('Field option', { exact: true }).click()
  expect(form.values.text).toBe('field')
  expect(onSelect).toHaveBeenCalledWith('field', expect.objectContaining({ value: 'field' }))
  form.setPattern('readPretty')
  await expect.element(getByText('field', { exact: true })).toBeVisible()
  form.setPattern('editable')
  await form.reset()
  await expect.element(getByRole('combobox')).toHaveValue('initial')
  form.setPattern('disabled')
  await expect.element(getByRole('combobox')).toBeDisabled()
})

it('binds Mentions text and selection, preserves search arguments and resets', async () => {
  const form = createForm({ initialValues: { text: 'Hello' } })
  const ref = createRef<ComponentRef<typeof Mentions>>()
  const onChange = vi.fn()
  const onSearch = vi.fn()
  const onSelect = vi.fn()
  const { getByRole, getByText } = await render(
    <Form form={form}>
      <Field name="text" title="Message" decorator={[FormItem]} dataSource={[{ label: 'Alice', value: 'alice' }]} component={[Mentions, { ref: (instance) => { ref.current = instance }, prefix: ['@', '#'], onChange, onSearch, onSelect }]} />
    </Form>,
  )
  ref.current?.focus()
  expect(document.activeElement).toBe(getByRole('textbox', { name: 'Message' }).element())
  await getByRole('textbox').fill('@al')
  expect(form.values.text).toBe('@al')
  expect(onChange).toHaveBeenLastCalledWith('@al')
  await userEvent.type(getByRole('textbox'), 'i')
  await page.getByText('Alice', { exact: true }).click()
  expect(form.values.text).toBe('@alice ')
  expect(onSearch).toHaveBeenCalledWith('ali', '@')
  expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ value: 'alice' }), '@')
  form.setPattern('readPretty')
  await expect.element(getByText('@alice', { exact: true })).toBeVisible()
  form.setPattern('editable')
  await form.reset()
  await expect.element(getByRole('textbox')).toHaveValue('Hello')
  form.setPattern('disabled')
  await expect.element(getByRole('textbox')).toBeDisabled()
})

it('uses explicit options with empty field sources and maps Mentions loading with explicit override', async () => {
  const form = createForm()
  const { getByRole } = await render(
    <Form form={form}>
      <Field name="auto" component={[AutoComplete, { options: [{ label: 'Fallback auto', value: 'auto' }], style: { width: 240 } }]} />
      <Field name="mention" component={[Mentions, { options: [{ label: 'Fallback mention', value: 'mention' }] }]} />
    </Form>,
  )
  await getByRole('combobox').click()
  await page.getByText('Fallback auto', { exact: true }).click()
  expect(form.values.auto).toBe('auto')
  await getByRole('textbox').fill('@')
  await userEvent.type(getByRole('textbox'), 'm')
  await page.getByText('Fallback mention', { exact: true }).click()
  expect(form.values.mention).toBe('@mention ')
  form.setFieldState('mention', (state) => {
    state.loading = true
  })
  await getByRole('textbox').fill('@')
  await userEvent.type(getByRole('textbox'), 'm')
  await vi.waitFor(() => expect(document.querySelector('.ant-mentions-dropdown .ant-spin')).not.toBeNull())
  form.setFieldState('mention', (state) => {
    state.componentProps = { ...state.componentProps, loading: false }
  })
  await vi.waitFor(() => expect(document.querySelector('.ant-mentions-dropdown .ant-spin')).toBeNull())
})

it('keeps statics and renders only text or placeholders in readPretty', async () => {
  expect(AutoComplete.Option).toBe(NativeAutoComplete.Option)
  expect(Mentions.Option).toBe(NativeMentions.Option)
  expect(Mentions.getMentions).toBe(NativeMentions.getMentions)
  expect(Mentions.getMentions('Hello @alice')).toEqual([{ prefix: '@', value: 'alice' }])
  const form = createForm({ pattern: 'readPretty', initialValues: { auto: 'free text', mention: '@alice' } })
  const { container, getByText } = await render(
    <Form form={form}>
      <PreviewText.Placeholder value="Empty">
        <Field name="auto" component={[AutoComplete, { children: <Input /> }]} />
        <Field name="mention" component={[Mentions, { prefix: ['@', '#'] }]} />
        <Field name="empty" component={[Mentions]} />
      </PreviewText.Placeholder>
    </Form>,
  )
  await expect.element(getByText('free text')).toBeVisible()
  await expect.element(getByText('@alice', { exact: true })).toBeVisible()
  await expect.element(getByText('Empty')).toBeVisible()
  expect(container.querySelector('input, textarea')).toBeNull()
})
