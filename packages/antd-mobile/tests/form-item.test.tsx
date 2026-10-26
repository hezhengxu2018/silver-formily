import type { Field as FieldModel } from '@silver-formily/core'
import type { IFormItemProps, IFormLayoutProps } from '../src'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, expectTypeOf, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { FormItem, FormLayout, Input } from '../src'

afterEach(cleanup)

it('renders form item with input and label', async () => {
  const form = createForm()
  const { getByText, getByPlaceholder } = await render(
    <FormProvider form={form}>
      <FormLayout>
        <Field
          name="username"
          title="用户名"
          required
          component={[Input, { placeholder: '请输入用户名' }]}
          decorator={[FormItem]}
        />
      </FormLayout>
    </FormProvider>,
  )

  await expect.element(getByText('用户名')).toBeInTheDocument()
  await expect.element(getByPlaceholder('请输入用户名')).toBeVisible()
})

it('shows required asterisk and validation feedback', async () => {
  const form = createForm()
  const { getByText, getByRole, container } = await render(
    <FormProvider form={form}>
      <FormLayout>
        <Field
          name="email"
          title="邮箱"
          required
          validator={{ format: 'email', message: '邮箱格式不正确' }}
          component={[Input]}
          decorator={[FormItem]}
        />
      </FormLayout>
    </FormProvider>,
  )

  expect(container.innerHTML).toContain('adm-formily-item-asterisk')

  await getByRole('textbox').fill('not-an-email')
  await form.validate().catch(() => {})
  await expect.element(getByText('邮箱格式不正确')).toBeInTheDocument()
})

it('input value flows through formily field', async () => {
  const form = createForm()
  const { getByPlaceholder } = await render(
    <FormProvider form={form}>
      <FormLayout>
        <Field
          name="nickname"
          title="昵称"
          component={[Input, { placeholder: '请输入昵称' }]}
          decorator={[FormItem]}
        />
      </FormLayout>
    </FormProvider>,
  )

  await getByPlaceholder('请输入昵称').fill('silver')
  expect(form.values.nickname).toBe('silver')
})

it('updates connected field overrides and validation reactively', async () => {
  const form = createForm()
  const { container, getByText } = await render(
    <FormProvider form={form}>
      <Field name="value" title="Original" required decorator={[FormItem, { label: 'Override', asterisk: false, extra: null }]} component={[Input]} />
    </FormProvider>,
  )
  expect(container.querySelector('.adm-formily-item-asterisk')).toBeNull()
  await expect.element(getByText('Override')).toBeVisible()
  const field = form.query('value').take() as FieldModel
  field.selfErrors = ['Changed error']
  await expect.element(getByText('Changed error')).toBeVisible()
  field.setDecoratorProps({ feedbackText: null })
  await vi.waitFor(() => expect(container.querySelector('.adm-formily-item-help')).toBeNull())
})

it.each(['error', 'warning', 'success'] as const)('renders %s feedback inline and hides it without hiding help', async (feedbackStatus) => {
  const content = (feedbackText: string | null) => (
    <FormItem.BaseItem label="Label" feedbackText={feedbackText} feedbackStatus={feedbackStatus} help="Persistent help"><input /></FormItem.BaseItem>
  )
  const { container, getByText, rerender } = await render(content('Feedback message'))
  await expect.element(getByText('Persistent help')).toBeVisible()
  await expect.element(getByText('Feedback message')).toBeVisible()
  expect(container.querySelector(`.adm-formily-item-${feedbackStatus}-help`)).not.toBeNull()
  expect(document.querySelector('.adm-popover')).toBeNull()
  await rerender(content(null))
  expect(container.querySelector('.adm-formily-item-help')).toBeNull()
  await expect.element(getByText('Persistent help')).toBeVisible()
})

it('inherits layouts, isolates shallow settings and preserves deep settings', async () => {
  const nested = (shallow: boolean) => (
    <FormLayout layout="vertical" labelWidth="80px" labelAlign="right" wrapperWidth="120px" shallow={shallow}>
      <FormItem.BaseItem label="Outer">
        <FormItem.BaseItem label="Inner">Content</FormItem.BaseItem>
      </FormItem.BaseItem>
      <FormItem.BaseItem label="Override" layout="horizontal" labelWidth={100} wrapperWidth={140} labelAlign="left">Content</FormItem.BaseItem>
    </FormLayout>
  )
  const { container, rerender } = await render(nested(true))
  const items = () => Array.from(container.querySelectorAll<HTMLElement>('.adm-formily-item'))
  expect(items()[0].classList.contains('adm-formily-item-layout-vertical')).toBe(true)
  expect(items()[1].classList.contains('adm-formily-item-layout-horizontal')).toBe(true)
  expect(items()[2].querySelector<HTMLElement>('.adm-formily-item-label')!.getBoundingClientRect().width).toBeCloseTo(100)
  expect(items()[2].querySelector<HTMLElement>('.adm-formily-item-control-content-component')!.style.width).toBe('140px')
  await rerender(nested(false))
  expect(items()[1].classList.contains('adm-formily-item-layout-vertical')).toBe(true)
  expect(items()[1].querySelector<HTMLElement>('.adm-formily-item-label')!.style.width).toBe('80px')
})

it('updates overflow on text changes, resize and wrapping, and opens touch tooltips', async () => {
  const content = (label: string, wrap = false) => <FormItem.BaseItem label={label} labelWrap={wrap} labelStyle={{ width: '100%' }} tooltip="More details">Content</FormItem.BaseItem>
  const { container, rerender, getByRole } = await render(content('Short'))
  await getByRole('button', { name: '字段说明' }).click()
  await vi.waitFor(() => expect(document.querySelector('.adm-popover:not(.adm-popover-hidden)')?.textContent).toContain('More details'))
  await rerender(content('Very long label that cannot fit in a mobile row'))
  const label = () => container.querySelector<HTMLElement>('.adm-formily-item-label')!
  await vi.waitFor(() => expect(label().classList.contains('adm-formily-item-label-tooltip')).toBe(true))
  expect(container.querySelector('.adm-formily-item-label-tooltip-icon')).toBeNull()
  const root = container.firstElementChild as HTMLElement
  root.style.setProperty('--prefix-width', '600px')
  await vi.waitFor(() => expect(label().classList.contains('adm-formily-item-label-tooltip')).toBe(false))
  root.style.setProperty('--prefix-width', '80px')
  await vi.waitFor(() => expect(label().classList.contains('adm-formily-item-label-tooltip')).toBe(true))
  await rerender(content('Very long label that cannot fit in a mobile row', true))
  await vi.waitFor(() => expect(label().classList.contains('adm-formily-item-label-tooltip')).toBe(false))
  expect(label().getBoundingClientRect().height).toBeGreaterThan(30)
  await rerender(content('Short'))
  await vi.waitFor(() => expect(label().classList.contains('adm-formily-item-label-tooltip')).toBe(false))
})

it('opens text tooltips by click and supports hidden labels becoming visible', async () => {
  const { container, rerender, getByText } = await render(<FormItem.BaseItem label={null}>Content</FormItem.BaseItem>)
  expect(container.querySelector('.adm-list-item-content-prefix')).toBeNull()
  await rerender(<FormItem.BaseItem label="Tap label" tooltip="Text details" tooltipLayout="text">Content</FormItem.BaseItem>)
  await getByText('Tap label').click()
  await vi.waitFor(() => expect(document.querySelector('.adm-popover:not(.adm-popover-hidden)')?.textContent).toContain('Text details'))
})

it('renders border and wrapper alignment settings', async () => {
  const { container } = await render(
    <FormLayout>
      <FormItem.BaseItem label="Aligned" wrapperWidth={100} wrapperAlign="right" wrapperWrap>Content</FormItem.BaseItem>
      <FormItem.BaseItem label="Borderless" bordered={false}>Content</FormItem.BaseItem>
    </FormLayout>,
  )
  const items = Array.from(container.querySelectorAll<HTMLElement>('.adm-formily-item'))
  expect(getComputedStyle(items[1].querySelector('.adm-list-item-content')!).borderTopWidth).toBe('0px')
  expect(getComputedStyle(items[0].querySelector('.adm-formily-item-control-content')!).justifyContent).toBe('flex-end')
  expect(items[0].querySelector<HTMLElement>('.adm-formily-item-control-content-component')!.getBoundingClientRect().width).toBeCloseTo(100)
})

it('disconnects label observers when the label is removed', async () => {
  const disconnect = vi.spyOn(ResizeObserver.prototype, 'disconnect')
  try {
    const { rerender } = await render(<FormItem.BaseItem label="Observed">Content</FormItem.BaseItem>)
    await rerender(<FormItem.BaseItem label={null}>Content</FormItem.BaseItem>)
    expect(disconnect).toHaveBeenCalled()
  }
  finally {
    disconnect.mockRestore()
  }
})

it.each([
  { width: 320, mode: 'icon' },
  { width: 375, mode: 'icon' },
  { width: 320, mode: 'text' },
  { width: 375, mode: 'text' },
] as const)('keeps long $mode tooltips within a $width px viewport', async ({ width, mode }) => {
  const originalSize = { width: window.innerWidth, height: window.innerHeight }
  try {
    await page.viewport(width, 700)
    const label = '说明'
    const tooltip = `${'这是一段较长的字段说明，需要在手机屏幕内完整换行显示。'.repeat(5)} https://example.com/${'longpath'.repeat(40)}`
    const { container, getByRole, getByText } = await render(
      <div style={{ paddingTop: 220 }}>
        <FormItem.BaseItem label={label} tooltip={tooltip} tooltipLayout={mode === 'text' ? 'text' : 'icon'}>Content</FormItem.BaseItem>
      </div>,
    )
    const trigger = mode === 'icon'
      ? container.querySelector('button')!
      : container.querySelector('.adm-formily-item-label-content')!
    if (mode === 'icon')
      await getByRole('button', { name: '字段说明' }).click()
    else
      await getByText(label, { exact: true }).click()
    await vi.waitFor(() => {
      const popover = document.querySelector<HTMLElement>('.adm-popover:not(.adm-popover-hidden)')!
      expect(popover).not.toBeNull()
      const bounds = popover.getBoundingClientRect()
      const anchor = trigger.getBoundingClientRect()
      expect(bounds.width).toBeGreaterThan(0)
      expect(bounds.left).toBeGreaterThanOrEqual(0)
      expect(bounds.right).toBeLessThanOrEqual(width)
      expect(bounds.bottom <= anchor.top || bounds.top >= anchor.bottom).toBe(true)
      const content = popover.querySelector<HTMLElement>('.adm-popover-inner-content')!
      expect(content.scrollWidth).toBeLessThanOrEqual(content.clientWidth)
      expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(width)
    })
  }
  finally {
    await cleanup()
    await page.viewport(originalSize.width, originalSize.height)
  }
})

it('excludes desktop presentation options from the public form APIs', () => {
  type Removed = 'size' | 'inset' | 'feedbackIcon' | 'feedbackLayout'
  expectTypeOf<Extract<keyof IFormItemProps, Removed>>().toEqualTypeOf<never>()
  expectTypeOf<Extract<keyof IFormLayoutProps, Removed>>().toEqualTypeOf<never>()
})

it('switches the arrow to a clear button without triggering the row', async () => {
  const form = createForm({ initialValues: { choice: ['a'] } })
  const onClick = vi.fn()
  const onClear = vi.fn()
  const { container, getByRole } = await render(
    <FormProvider form={form}>
      <Field name="choice" decorator={[FormItem, { clearable: true, onClick, onClear }]} component={[Input]} />
    </FormProvider>,
  )
  await getByRole('button', { name: '清除', exact: true }).click()
  await vi.waitFor(() => expect(form.values.choice).toBeUndefined())
  expect(onClear).toHaveBeenCalledOnce()
  expect(onClick).not.toHaveBeenCalled()
  await vi.waitFor(() => expect(container.querySelector('.adm-formily-item-clear')).toBeNull())
  expect(container.querySelector('.adm-list-item-content-arrow')).not.toBeNull()
  const field = form.query('choice').take() as FieldModel
  field.setValue(['b'])
  await expect.element(getByRole('button', { name: '清除', exact: true })).toBeVisible()
  field.setDecoratorProps({ arrowIcon: false })
  await vi.waitFor(() => expect(container.querySelector('.adm-formily-item-clear')).toBeNull())
})

it.each(['disabled', 'readOnly', 'readPretty'] as const)('does not clear a field in %s mode', async (pattern) => {
  const form = createForm({ initialValues: { choice: 'a' } })
  const { container } = await render(
    <FormProvider form={form}>
      <Field name="choice" pattern={pattern} decorator={[FormItem, { clearable: true }]} component={[Input]} />
    </FormProvider>,
  )
  expect(container.querySelector('.adm-formily-item-clear')).toBeNull()
  expect(form.values.choice).toBe('a')
})

it.each([undefined, null, '', [], [null], 0, false])('handles empty and falsy BaseItem values: %j', async (value) => {
  const onClear = vi.fn()
  const { container, rerender } = await render(<FormItem.BaseItem clearable value={value} onClear={onClear}>Content</FormItem.BaseItem>)
  expect(!!container.querySelector('.adm-formily-item-clear')).toBe(value === 0 || value === false)
  await rerender(<FormItem.BaseItem clearable value="a" onClear={onClear} arrowIcon={null}>Content</FormItem.BaseItem>)
  expect(container.querySelector('.adm-formily-item-clear')).toBeNull()
})


it.each(['horizontal', 'vertical'] as const)('keeps label and input positions stable when %s feedback changes', async (layout) => {
  const content = (feedbackText?: string) => (
    <FormItem.BaseItem layout={layout} label="Label" feedbackText={feedbackText} feedbackStatus={feedbackText ? 'error' : undefined} extra="Extra">
      <Input />
    </FormItem.BaseItem>
  )
  const { container, rerender, getByText } = await render(content())
  const label = container.querySelector<HTMLElement>('.adm-formily-item-label')!
  const input = container.querySelector('input')!
  const labelTop = label.getBoundingClientRect().top
  const inputTop = input.getBoundingClientRect().top
  const height = container.firstElementChild!.getBoundingClientRect().height
  await rerender(content('Validation failed'))
  await expect.element(getByText('Validation failed')).toBeVisible()
  expect(label.getBoundingClientRect().top).toBeCloseTo(labelTop)
  expect(input.getBoundingClientRect().top).toBeCloseTo(inputTop)
  expect(container.firstElementChild!.getBoundingClientRect().height).toBeGreaterThan(height)
  expect(container.querySelector('.adm-list-item-description')!.textContent).toContain('Validation failed')
  await rerender(content())
  expect(label.getBoundingClientRect().top).toBeCloseTo(labelTop)
  expect(input.getBoundingClientRect().top).toBeCloseTo(inputTop)
})


it.each(['horizontal', 'vertical'] as const)('focuses the input from the %s label without making the row clickable', async (layout) => {
  const form = createForm()
  const { container, getByText, getByRole } = await render(
    <FormProvider form={form}>
      <Field name="username" title="Focus input" decorator={[FormItem, { layout }]} component={[Input]} />
    </FormProvider>,
  )
  const item = container.querySelector('.adm-formily-item')!
  expect(item.tagName).toBe('DIV')
  expect(item.classList.contains('adm-plain-anchor')).toBe(false)
  expect(item.querySelector('.adm-list-item-content-arrow')).toBeNull()
  await getByText('Focus input', { exact: true }).click()
  await expect.element(getByRole('textbox')).toHaveFocus()
})

it('preserves explicit row clickability and allows cancelling label focus', async () => {
  const onClick = vi.fn(event => event.preventDefault())
  const { container, getByText, getByRole, rerender } = await render(
    <FormItem.BaseItem label="Focus input" onClick={onClick}><Input /></FormItem.BaseItem>,
  )
  expect(container.querySelector('.adm-formily-item')!.tagName).toBe('A')
  await getByText('Focus input', { exact: true }).click()
  expect(onClick).toHaveBeenCalledOnce()
  await expect.element(getByRole('textbox')).not.toHaveFocus()
  await rerender(<FormItem.BaseItem label="Focus input" clickable={false} onClick={onClick}><Input /></FormItem.BaseItem>)
  expect(container.querySelector('.adm-formily-item')!.tagName).toBe('DIV')
})

it('does not focus disabled or ambiguous controls from the label', async () => {
  const content = (disabled: boolean) => (
    <FormItem.BaseItem label="Controls" disabled={disabled}>
      <Input />
      {!disabled && <Input />}
    </FormItem.BaseItem>
  )
  const { container, getByText, rerender } = await render(content(true))
  container.querySelector<HTMLElement>('.adm-formily-item-label')!.click()
  expect(container.contains(document.activeElement)).toBe(false)
  await rerender(content(false))
  await getByText('Controls', { exact: true }).click()
  expect(container.contains(document.activeElement)).toBe(false)
})

it.each(['horizontal', 'vertical'] as const)('inherits and updates colon settings in %s layout', async (layout) => {
  const content = (colon?: boolean, shallow = true) => (
    <FormLayout layout={layout} colon={colon} shallow={shallow}>
      <FormItem.BaseItem label="Inherited">
        <FormItem.BaseItem label="Nested">Content</FormItem.BaseItem>
      </FormItem.BaseItem>
      <FormItem.BaseItem label="Disabled" colon={false}>Content</FormItem.BaseItem>
      <FormItem.BaseItem label={<strong>Enabled</strong>} colon>Content</FormItem.BaseItem>
      <FormItem.BaseItem colon>Content</FormItem.BaseItem>
    </FormLayout>
  )
  const { container, rerender } = await render(content())
  const labels = () => Array.from(container.querySelectorAll('.adm-formily-item-label-content'), node => node.textContent)
  expect(labels()).toEqual(['Inherited', 'Nested', 'Disabled', 'Enabled:'])
  await rerender(content(true))
  expect(labels()).toEqual(['Inherited:', 'Nested', 'Disabled', 'Enabled:'])
  await rerender(content(true, false))
  expect(labels()).toEqual(['Inherited:', 'Nested:', 'Disabled', 'Enabled:'])
  await rerender(content(false, false))
  expect(labels()).toEqual(['Inherited', 'Nested', 'Disabled', 'Enabled:'])
  expect(container.querySelector('[colon]')).toBeNull()
})
