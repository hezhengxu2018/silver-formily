import type { InputProps } from 'antd'
import type { IFormItemProps } from '../src/form-item'
import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { Form as AntdForm, Input as AntdInput, InputNumber as AntdInputNumber, Select as AntdSelect, ConfigProvider, DatePicker, theme } from 'antd'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { page } from 'vitest/browser'
import { Form, FormItem, Input, InputNumber, Select } from '../src'

afterEach(cleanup)

const controls = [
  ['Input', <Input />],
  ['TextArea', <Input.TextArea />],
  ['Select', <Select />],
  ['InputNumber', <InputNumber />],
  ['native Input', <AntdInput />],
  ['native TextArea', <AntdInput.TextArea />],
  ['native Select', <AntdSelect />],
  ['native InputNumber', <AntdInputNumber />],
  ['native DatePicker', <DatePicker />],
] as const
const statuses = ['error', 'warning', 'success', 'pending', undefined] as const

function appearance(element: Element) {
  const style = getComputedStyle(element)
  return Object.fromEntries(['borderTopColor', 'borderTopWidth', 'borderTopStyle', 'borderRadius', 'backgroundColor', 'boxShadow', 'outlineStyle', 'outlineWidth', 'height', 'fontSize'].map(key => [key, style[key as keyof CSSStyleDeclaration]]))
}

it.each(controls)('matches native Form.Item feedback for %s through every status', async (_name, control) => {
  const view = (status: typeof statuses[number]) => (
    <ConfigProvider theme={{ token: { motion: false } }}>
      <FormItem.BaseItem feedbackStatus={status} hasFeedback>
        <div data-testid="adapted">{control}</div>
      </FormItem.BaseItem>
      <AntdForm.Item validateStatus={status === 'pending' ? 'validating' : status ?? ''} hasFeedback>
        <div data-testid="reference">{control}</div>
      </AntdForm.Item>
    </ConfigProvider>
  )
  const screen = await render(view(undefined))
  for (const status of statuses) {
    await screen.rerender(view(status))
    const actual = screen.container.querySelector('[data-testid="adapted"]')!
    const reference = screen.container.querySelector('[data-testid="reference"]')!
    expect(appearance(actual.firstElementChild!)).toEqual(appearance(reference.firstElementChild!))
    const actualIcon = actual.querySelector('.ant-form-item-feedback-icon')
    const referenceIcon = reference.querySelector('.ant-form-item-feedback-icon')
    expect(!!actualIcon).toBe(!!referenceIcon)
    if (actualIcon && referenceIcon) {
      expect(getComputedStyle(actualIcon).color).toBe(getComputedStyle(referenceIcon).color)
      expect(actualIcon.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe(referenceIcon.querySelector('[role="img"]')?.getAttribute('aria-label'))
      expect(actual.firstElementChild!.contains(actualIcon)).toBe(true)
    }
    expect(getComputedStyle(screen.container.querySelector('.silver-formily-form-item__content')!).borderTopWidth).toBe('0px')
  }
})

it.each(['outlined', 'filled', 'borderless', 'underlined'] as const)('matches native focused %s controls with themes, sizes, disabled state and a custom prefix', async (variant) => {
  const view = (dark: boolean, size: 'small' | 'large', disabled: boolean) => (
    <ConfigProvider prefixCls="custom" componentDisabled={disabled} theme={{ algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm, token: { colorPrimary: '#7b31c9', colorSuccess: '#218557', motion: false } }}>
      <button type="button">Unfocus</button>
      <FormItem.BaseItem className="local-item" feedbackStatus="success" hasFeedback variant={variant} size={size}>
        <div data-testid="adapted"><AntdInput aria-label="adapted" /></div>
      </FormItem.BaseItem>
      <ConfigProvider variant={variant} componentSize={size}>
        <AntdForm.Item validateStatus="success" hasFeedback>
          <div data-testid="reference"><AntdInput aria-label="reference" /></div>
        </AntdForm.Item>
      </ConfigProvider>
    </ConfigProvider>
  )
  const screen = await render(view(false, 'small', false))
  for (const dark of [false, true]) {
    for (const disabled of [false, true]) {
      await screen.rerender(view(dark, dark ? 'large' : 'small', disabled))
      await page.getByRole('button', { name: 'Unfocus' }).click()
      const actual = screen.container.querySelector('[data-testid="adapted"] > :first-child')!
      const reference = screen.container.querySelector('[data-testid="reference"] > :first-child')!
      expect(appearance(actual)).toEqual(appearance(reference))
      const icon = actual.querySelector('.custom-form-item-feedback-icon')!
      expect(getComputedStyle(icon).color).toBe(getComputedStyle(reference.querySelector('.custom-form-item-feedback-icon')!).color)
      expect(screen.container.querySelector('.silver-formily-form-item')!.classList.contains('local-item')).toBe(true)
      if (!disabled) {
        await page.getByRole('textbox', { name: 'adapted', exact: true }).click()
        const focused = appearance(actual)
        await page.getByRole('textbox', { name: 'reference', exact: true }).click()
        expect(focused).toEqual(appearance(reference))
      }
    }
  }
})

it('supports default-off, custom and explicitly disabled feedback without forcing borderless', async () => {
  const screen = await render(<FormItem.BaseItem feedbackStatus="success"><Input /></FormItem.BaseItem>)
  expect(screen.container.querySelector('.ant-form-item-feedback-icon')).toBeNull()
  await screen.rerender(<FormItem.BaseItem feedbackIcon={<b>custom</b>}><Input /></FormItem.BaseItem>)
  expect(screen.container.querySelector('.ant-input-affix-wrapper .ant-form-item-feedback-icon')!.textContent).toBe('custom')
  expect(screen.container.querySelector('.ant-input-outlined')).not.toBeNull()
  await screen.rerender(<FormItem.BaseItem hasFeedback={false} feedbackStatus="error" feedbackIcon={<b>custom</b>}><Input /></FormItem.BaseItem>)
  expect(screen.container.querySelector('.ant-form-item-feedback-icon')).toBeNull()
  expect(screen.container.querySelector('.ant-input-status-error')).not.toBeNull()
})

function Status({ id }: { id: string }) {
  return <output data-testid={id}>{JSON.stringify(AntdForm.Item.useStatus())}</output>
}

it('isolates nested feedback and exposes effective messages even when outline feedback is disabled', async () => {
  const view = (props: IFormItemProps) => (
    <FormItem.BaseItem feedbackStatus="error" hasFeedback feedbackText="outer">
      <Status id="outer" />
      <FormItem.BaseItem {...props}>
        <Status id="inner" />
        <Input />
        <Input status="warning" aria-label="explicit" />
      </FormItem.BaseItem>
    </FormItem.BaseItem>
  )
  const screen = await render(view({}))
  const status = (id: string) => JSON.parse(screen.container.querySelector(`[data-testid="${id}"]`)!.textContent!)
  expect(status('outer')).toEqual({ status: 'error', errors: ['outer'], warnings: [] })
  expect(status('inner')).toEqual({ status: '', errors: [], warnings: [] })
  expect(screen.container.querySelector('.ant-form-item-feedback-icon')).toBeNull()
  await screen.rerender(view({ feedbackStatus: 'error', feedbackText: 'inner', hasFeedback: true, enableOutlineFeedback: false }))
  expect(status('inner')).toEqual({ status: '', errors: ['inner'], warnings: [] })
  expect(screen.container.querySelector('.ant-input-status-error')).toBeNull()
  expect(screen.container.querySelector('.ant-input-status-warning')).not.toBeNull()
  expect(screen.container.querySelectorAll('.ant-form-item-feedback-icon-error')).toHaveLength(2)
  await screen.rerender(view({ feedbackStatus: 'warning', feedbackText: 'warning' }))
  expect(status('inner')).toEqual({ status: 'warning', errors: [], warnings: ['warning'] })
  await screen.rerender(view({ feedbackStatus: 'warning', feedbackText: null }))
  expect(status('inner').warnings).toEqual([])
})

it.each([['Input', Input], ['Select', Select]] as const)('keeps %s focused and renders one validation spinner alongside its custom suffix', async (name, Component) => {
  let complete!: () => void
  const pending = new Promise<void>((resolve) => {
    complete = resolve
  })
  const form = createForm()
  const screen = await render(
    <Form form={form}>
      <Field name="value" decorator={[FormItem, { hasFeedback: true }]} component={[Component, name === 'Input' ? { suffix: <span>suffix</span> } : { suffixIcon: <span>suffix</span>, options: [] }]} validator={async () => { await pending }} />
    </Form>,
  )
  const input = screen.container.querySelector('input')!
  await page.getByRole(name === 'Input' ? 'textbox' : 'combobox').click()
  const validation = form.validate()
  await vi.waitFor(() => expect(screen.container.querySelectorAll('.anticon-loading')).toHaveLength(1))
  expect(screen.container.textContent).toContain('suffix')
  expect(document.activeElement).toBe(input)
  complete()
  await validation
  await vi.waitFor(() => expect(screen.container.querySelector('.anticon-loading')).toBeNull())
  expect(screen.container.querySelector('input')).toBe(input)
  expect(document.activeElement).toBe(input)
})

it('maps field errors and explicit message overrides without adding a second form store', async () => {
  const form = createForm()
  const view = (feedbackText?: string | null) => (
    <Form form={form}>
      <Field
        name="value"
        required
        decorator={[FormItem, { hasFeedback: true, feedbackText }]}
        component={[(props: InputProps) => (
          <>
            <Input {...props} />
            <Status id="probe" />
          </>
        )]}
      />
    </Form>
  )
  const screen = await render(view())
  await form.validate().catch(() => {})
  await vi.waitFor(() => expect(screen.container.querySelector('.ant-input-status-error')).not.toBeNull())
  expect(screen.container.querySelector('.silver-formily-form-item__help')!.textContent).toBeTruthy()
  expect(JSON.parse(screen.container.querySelector('[data-testid="probe"]')!.textContent!).errors).toEqual([screen.container.querySelector('.silver-formily-form-item__help')!.textContent])
  form.setFieldState('*', (state) => {
    state.decoratorProps = { ...state.decoratorProps, feedbackText: 'override' }
  })
  await vi.waitFor(() => expect(screen.container.querySelector('.silver-formily-form-item__help')!.textContent).toBe('override'))
  expect(JSON.parse(screen.container.querySelector('[data-testid="probe"]')!.textContent!).errors).toEqual(['override'])
  form.setFieldState('*', (state) => {
    state.decoratorProps = { ...state.decoratorProps, feedbackText: null }
  })
  await vi.waitFor(() => expect(screen.container.querySelector('.silver-formily-form-item__help')).toBeNull())
  await page.getByRole('textbox').fill('valid')
  await vi.waitFor(() => expect(form.values.value).toBe('valid'))
  await vi.waitFor(() => expect(form.query('value').get('selfErrors')).toEqual([]))
  await form.validate()
  expect(form.values.value).toBe('valid')
  await vi.waitFor(() => expect(screen.container.querySelector('.ant-input-status-error')).toBeNull())
})

it.each(['loose', 'terse', 'none', 'popover'] as const)('preserves %s feedback layout and extra content with native icons', async (feedbackLayout) => {
  const { container } = await render(
    <FormItem.BaseItem feedbackLayout={feedbackLayout} feedbackStatus="error" hasFeedback feedbackText="Validation message" extra="Extra content" addonBefore="Before" addonAfter="After">
      <Input />
    </FormItem.BaseItem>,
  )
  expect(container.querySelector('.silver-formily-form-item__extra')!.textContent).toBe('Extra content')
  expect(container.querySelectorAll('.silver-formily-form-item__addon')).toHaveLength(2)
  expect(container.querySelector('.ant-input-affix-wrapper .ant-form-item-feedback-icon-error')).not.toBeNull()
  if (feedbackLayout === 'loose' || feedbackLayout === 'terse') {
    expect(container.querySelector('[role="alert"]')!.textContent).toBe('Validation message')
  }
  else {
    expect(container.querySelector('.silver-formily-form-item__help')).toBeNull()
    if (feedbackLayout === 'popover')
      await expect.element(page.getByText('Validation message', { exact: true })).toBeVisible()
  }
})

it('retains business loading and the user suffix when native feedback is enabled', async () => {
  const form = createForm()
  const { container } = await render(
    <Form form={form}>
      <Field name="input" decorator={[FormItem, { hasFeedback: true, feedbackStatus: 'success' }]} component={[Input, { suffix: <span>Business suffix</span> }]} />
      <Field name="select" decorator={[FormItem, { hasFeedback: true, feedbackStatus: 'success' }]} component={[Select]} />
    </Form>,
  )
  form.setFieldState('*', (state) => {
    state.loading = true
  })
  await vi.waitFor(() => expect(container.querySelectorAll('.anticon-loading')).toHaveLength(2))
  expect(container.textContent).toContain('Business suffix')
  expect(container.querySelectorAll('.ant-form-item-feedback-icon-success')).toHaveLength(2)
  form.setFieldState('*', (state) => {
    state.loading = false
  })
  await vi.waitFor(() => expect(container.querySelector('.anticon-loading')).toBeNull())
})

it.each([
  ['error', 'close-circle', '#bf3036'],
  ['warning', 'exclamation-circle', '#986b00'],
  ['success', 'check-circle', '#168048'],
] as const)('renders themed %s popover feedback in a custom portal container', async (feedbackStatus, icon, color) => {
  const screen = await render(
    <ConfigProvider prefixCls="custom" theme={{ token: { colorError: '#bf3036', colorWarning: '#986b00', colorSuccess: '#168048', motion: false } }}>
      <div data-testid="portal" />
      <FormItem.BaseItem feedbackLayout="popover" feedbackStatus={feedbackStatus} feedbackText="Popover message" getPopupContainer={() => document.querySelector('[data-testid="portal"]')!}>
        <Input />
      </FormItem.BaseItem>
    </ConfigProvider>,
  )
  await expect.element(page.getByText('Popover message', { exact: true })).toBeVisible()
  const popup = screen.container.querySelector('[data-testid="portal"] .silver-formily-form-item__popover-feedback')!
  expect(popup.querySelector(`[aria-label="${icon}"]`)).not.toBeNull()
  const expectedColor = document.createElement('span')
  expectedColor.style.color = color
  document.body.append(expectedColor)
  expect(getComputedStyle(popup).color).toBe(getComputedStyle(expectedColor).color)
  expect(getComputedStyle(popup.querySelector('.anticon')!).color).toBe(getComputedStyle(expectedColor).color)
  expectedColor.remove()
  expect(screen.container.querySelector('.silver-formily-form-item__help')).toBeNull()
  expect(screen.container.querySelector('.custom-input-affix-wrapper .custom-form-item-feedback-icon')).toBeNull()
})

it('limits the popover success outline to eligible controls and respects native status overrides', async () => {
  const view = (enableOutlineFeedback: boolean, variant: 'outlined' | 'borderless', status?: 'warning') => (
    <ConfigProvider theme={{ token: { colorSuccess: '#168048', motion: false } }}>
      <button type="button">Outside control</button>
      <FormItem.BaseItem feedbackStatus="success" feedbackLayout="popover" feedbackText="Success" enableOutlineFeedback={enableOutlineFeedback} variant={variant}>
        <Input status={status} />
      </FormItem.BaseItem>
    </ConfigProvider>
  )
  const screen = await render(view(true, 'outlined'))
  await page.getByRole('button', { name: 'Outside control' }).click()
  const control = () => screen.container.querySelector('.ant-input-affix-wrapper')!
  expect(getComputedStyle(control()).borderTopColor).toBe('rgb(22, 128, 72)')
  expect(getComputedStyle(screen.container.querySelector('.silver-formily-form-item__content')!).borderTopWidth).toBe('0px')
  await screen.rerender(view(false, 'outlined'))
  expect(getComputedStyle(control()).borderTopColor).toBe('rgb(217, 217, 217)')
  await screen.rerender(view(true, 'outlined', 'warning'))
  expect(getComputedStyle(control()).borderTopColor).toBe('rgb(250, 173, 20)')
  await screen.rerender(view(true, 'borderless'))
  expect(getComputedStyle(control()).borderTopWidth).toBe('0px')
})
