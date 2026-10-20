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

it('renders persistent help after feedback and passes native List.Item props', async () => {
  const onClick = vi.fn()
  const { container, getByText, rerender } = await render(
    <FormItem.BaseItem label={<strong>Label</strong>} help={<span>Help</span>} feedbackText="Error" feedbackStatus="error" extra="Extra" onClick={onClick} arrowIcon={<span>Arrow</span>} tabIndex={0} aria-label="Item" data-testid="item" style={{ '--prefix-width': '90px' }}>
      Content
    </FormItem.BaseItem>,
  )
  await getByText('Content').click()
  expect(onClick).toHaveBeenCalledOnce()
  const root = container.firstElementChild as HTMLElement
  expect(root.getAttribute('aria-label')).toBe('Item')
  expect(root.getAttribute('data-testid')).toBe('item')
  expect(root.tabIndex).toBe(0)
  expect(root.style.getPropertyValue('--prefix-width')).toBe('90px')
  expect(root.querySelector('.adm-formily-item-help')!.nextElementSibling!.textContent).toBe('Help')
  await expect.element(getByText('Extra')).toBeVisible()
  await expect.element(getByText('Arrow')).toBeVisible()
  await rerender(<FormItem.BaseItem disabled onClick={onClick}>Content</FormItem.BaseItem>)
  await getByText('Content').click()
  expect(onClick).toHaveBeenCalledOnce()
  expect(root.querySelector('.adm-list-item-content-prefix')).toBeNull()
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
  { width: 320, mode: 'overflow' },
  { width: 375, mode: 'overflow' },
] as const)('keeps long $mode tooltips within a $width px viewport', async ({ width, mode }) => {
  const originalSize = { width: window.innerWidth, height: window.innerHeight }
  try {
    await page.viewport(width, 700)
    const label = mode === 'overflow' ? '这是一个会被截断并需要完整展示的很长字段标题' : '说明'
    const tooltip = `${'这是一段较长的字段说明，需要在手机屏幕内完整换行显示。'.repeat(5)} https://example.com/${'longpath'.repeat(40)}`
    const { container, getByRole, getByText } = await render(
      <div style={{ paddingTop: 220 }}>
        <FormItem.BaseItem label={label} tooltip={tooltip} tooltipLayout={mode === 'text' ? 'text' : 'icon'}>Content</FormItem.BaseItem>
      </div>,
    )
    if (mode === 'overflow') {
      await vi.waitFor(() => expect(container.querySelector('.adm-formily-item-label-tooltip')).not.toBeNull())
    }
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

it.each(['content-box', 'border-box'] as const)('applies label widths and alignment with %s page sizing', async (boxSizing) => {
  const { container } = await render(
    <div style={{ width: 360 }}>
      <style>{`.label-sizing-test * { box-sizing: ${boxSizing}; }`}</style>
      <div className="label-sizing-test">
        <FormLayout labelWidth={80}>
          <FormItem.BaseItem label="Label"><Input placeholder="Inherited width" /></FormItem.BaseItem>
          <FormItem.BaseItem label="Label" labelWidth={120} labelAlign="left"><Input placeholder="Left" /></FormItem.BaseItem>
          <FormItem.BaseItem label="Label" labelWidth={120} labelAlign="right" tooltip="Details"><Input placeholder="Right" /></FormItem.BaseItem>
          <FormItem.BaseItem label="Label" labelWidth="40%"><Input placeholder="Percent" /></FormItem.BaseItem>
        </FormLayout>
      </div>
    </div>,
  )
  const items = Array.from(container.querySelectorAll<HTMLElement>('.adm-formily-item'))
  const labels = items.map(item => item.querySelector<HTMLElement>('.adm-formily-item-label')!)
  expect(labels[0].getBoundingClientRect().width).toBeCloseTo(80)
  expect(labels[1].getBoundingClientRect().width).toBeCloseTo(120)
  expect(labels[2].getBoundingClientRect().width).toBeCloseTo(120)
  const textLeft = labels[1].querySelector('span > span')!.getBoundingClientRect()
  expect(textLeft.left).toBeCloseTo(labels[1].getBoundingClientRect().left)
  const textRight = labels[2].querySelector('.adm-formily-item-label-content')!.getBoundingClientRect()
  const icon = labels[2].querySelector('button')!.getBoundingClientRect()
  expect(icon.left).toBeGreaterThanOrEqual(textRight.right)
  expect(icon.right).toBeCloseTo(labels[2].getBoundingClientRect().right)
  const column = items[3].querySelector<HTMLElement>('.adm-list-item-content-prefix')!
  expect(labels[3].getBoundingClientRect().width).toBeCloseTo(Number.parseFloat(getComputedStyle(column).width))
  for (let index = 0; index < items.length; index++) {
    const input = items[index].querySelector('input')!.getBoundingClientRect()
    expect(input.left - labels[index].getBoundingClientRect().right).toBeCloseTo(20)
  }
})


it('excludes desktop presentation options from the public form APIs', () => {
  type Removed = 'size' | 'inset' | 'feedbackIcon' | 'feedbackLayout'
  expectTypeOf<Extract<keyof IFormItemProps, Removed>>().toEqualTypeOf<never>()
  expectTypeOf<Extract<keyof IFormLayoutProps, Removed>>().toEqualTypeOf<never>()
})
