import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { ConfigProvider, theme } from 'antd'
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { Form, FormButtonGroup, FormGrid, FormItem, FormLayout, Input, PreviewText, Submit } from '../src'

it('preserves explicit null decorator content instead of falling back to field metadata', async () => {
  const { container } = await render(
    <Form form={createForm()}>
      <Field name="name" title="Hidden label" description="Hidden description" decorator={[FormItem, { label: null, extra: null, feedbackText: null }]} component={[Input]} />
    </Form>,
  )
  expect(container.textContent).not.toContain('Hidden')
  expect(container.querySelector('.sf-item-label')).toBeNull()
})

afterEach(async () => {
  await cleanup()
  vi.restoreAllMocks()
})

it('colors native control borders and honors enableOutlineFeedback=false', async () => {
  const { container } = await render(
    <FormLayout>
      <FormItem.BaseItem feedbackIcon="!" feedbackStatus="error"><Input /></FormItem.BaseItem>
      <FormItem.BaseItem feedbackIcon="!" feedbackStatus="error" enableOutlineFeedback={false}><Input /></FormItem.BaseItem>
    </FormLayout>,
  )
  const items = container.querySelectorAll('.sf-item-component > :first-child')
  expect(getComputedStyle(items[0]).borderTopColor).toBe('rgb(255, 77, 79)')
  expect(getComputedStyle(items[1]).borderTopColor).toBe('rgb(217, 217, 217)')
})

it('preserves explicit empty labels, false asterisk/colon and empty extra values', async () => {
  const { container } = await render(
    <Form form={createForm()} colon={false}>
      <Field name="name" title="Hidden label" description="Hidden extra" required decorator={[FormItem, { label: '', extra: '', asterisk: false }]} component={[Input]} />
    </Form>,
  )
  expect(container.textContent).not.toContain('Hidden')
  expect(container.querySelector('.sf-item-asterisk')).toBeNull()
  expect(container.querySelector('.sf-item-colon')).toBeNull()
})

it('supports deep and shallow layout contexts without leaking shallow settings to nested fields', async () => {
  const { container } = await render(
    <FormLayout shallow={false} layout="vertical" colon={false}>
      <FormLayout layout="horizontal" labelWidth={120}>
        <FormItem.BaseItem label="Outer"><FormItem.BaseItem label="Inner"><Input /></FormItem.BaseItem></FormItem.BaseItem>
      </FormLayout>
    </FormLayout>,
  )
  const items = container.querySelectorAll('.sf-item')
  expect(items[0].className).toContain('sf-item-horizontal')
  expect(items[1].className).toContain('sf-item-vertical')
  expect(container.querySelector('.sf-item-colon')).toBeNull()
  expect((items[0].querySelector('.sf-item-label') as HTMLElement).style.width).toBe('120px')
})

it('updates responsive layout on size and prop changes and releases observers in StrictMode', async () => {
  const disconnect = vi.spyOn(ResizeObserver.prototype, 'disconnect')
  const view = (width: number, layouts: ('horizontal' | 'vertical')[]) => <StrictMode><FormLayout style={{ width }} breakpoints={[400]} layout={layouts}><FormItem.BaseItem label="Name"><Input /></FormItem.BaseItem></FormLayout></StrictMode>
  const screen = await render(view(300, ['vertical', 'horizontal']))
  await vi.waitFor(() => expect(screen.container.querySelector('.sf-item')?.className).toContain('sf-item-vertical'))
  await screen.rerender(view(600, ['vertical', 'horizontal']))
  await vi.waitFor(() => expect(screen.container.querySelector('.sf-item')?.className).toContain('sf-item-horizontal'))
  await screen.rerender(view(600, ['horizontal', 'vertical']))
  await vi.waitFor(() => expect(screen.container.querySelector('.sf-item')?.className).toContain('sf-item-vertical'))
  await screen.unmount()
  expect(disconnect).toHaveBeenCalled()
})

it('uses scoped theme tokens and ConfigProvider prefixCls', async () => {
  const { container } = await render(
    <ConfigProvider prefixCls="custom" theme={{ algorithm: theme.darkAlgorithm, token: { colorPrimary: '#ff6600' } }}>
      <FormLayout><FormItem.BaseItem label="Name"><Input /></FormItem.BaseItem></FormLayout>
    </ConfigProvider>,
  )
  expect(container.querySelector('.custom-formily-item')).not.toBeNull()
  expect(container.querySelector('.custom-input')).not.toBeNull()
  const item = container.querySelector('.sf-item') as HTMLElement
  expect(item.style.getPropertyValue('--sf-primary')).toBeTruthy()
  expect(item.style.getPropertyValue('--sf-bg')).not.toBe('#ffffff')
})

it('renders button group alignment and FormItem indentation', async () => {
  const { container } = await render(
    <FormLayout labelCol={4} wrapperCol={20}>
      <FormButtonGroup align="right"><button>one</button></FormButtonGroup>
      <FormButtonGroup.FormItem><button>two</button></FormButtonGroup.FormItem>
    </FormLayout>,
  )
  const group = container.querySelector('.sf-buttons') as HTMLElement
  expect(getComputedStyle(group).justifyContent).toBe('flex-end')
  expect(container.querySelector('.sf-item-label')).not.toBeNull()
})

it.each(['small', 'medium', 'large'] as const)('aligns vertical grid actions with %s input controls', async (size) => {
  const { container } = await render(
    <Form form={createForm()} layout="vertical" size={size} feedbackLayout="terse">
      <FormGrid minColumns={3} maxColumns={3} style={{ width: 600 }}>
        <Field name="first" title="First" decorator={[FormItem]} component={[Input]} />
        <Field name="second" title="Second" decorator={[FormItem]} component={[Input]} />
        <FormButtonGroup.FormItem><Submit>Query</Submit></FormButtonGroup.FormItem>
      </FormGrid>
    </Form>,
  )
  const input = container.querySelector('.sf-item-component > :first-child')!
  const button = container.querySelector('button')!
  await vi.waitFor(() => expect(button.getBoundingClientRect().top).toBeCloseTo(input.getBoundingClientRect().top))
  expect(container.querySelectorAll('.sf-item-colon')).toHaveLength(2)
})

it('can render selected components on the server without browser layout effects', () => {
  const html = renderToString(
    <Form form={createForm()}>
      <FormLayout breakpoints={[400]} layout={['vertical', 'horizontal']}>
        <FormItem.BaseItem label="SSR"><Input /></FormItem.BaseItem>
        <PreviewText value={0} />
        <FormButtonGroup.Sticky><Submit /></FormButtonGroup.Sticky>
      </FormLayout>
    </Form>,
  )
  expect(html).toContain('SSR')
  expect(html).toContain('sf-buttons-sticky')
})

it.each(['left', 'right'] as const)('aligns a fixed-width control to the %s edge of its wrapper', async (wrapperAlign) => {
  const { container } = await render(
    <FormItem.BaseItem wrapperWidth={240} wrapperAlign={wrapperAlign}>
      <Input style={{ width: 160 }} />
    </FormItem.BaseItem>,
  )
  const wrapper = container.querySelector('.sf-item-control')!
  const input = container.querySelector('.sf-item-component > :first-child')!
  await vi.waitFor(() => {
    const bounds = input.getBoundingClientRect()
    const wrapperBounds = wrapper.getBoundingClientRect()
    expect(bounds.width).toBeCloseTo(160)
    expect(bounds[wrapperAlign]).toBeCloseTo(wrapperBounds[wrapperAlign])
  })
})
