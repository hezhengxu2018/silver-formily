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
  expect(container.querySelector('.silver-formily-form-item__label')).toBeNull()
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
  const items = container.querySelectorAll('.silver-formily-form-item__component > :first-child')
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
  expect(container.querySelector('.silver-formily-form-item__asterisk')).toBeNull()
  expect(container.querySelector('.silver-formily-form-item__colon')).toBeNull()
})

it('supports deep and shallow layout contexts without leaking shallow settings to nested fields', async () => {
  const { container } = await render(
    <FormLayout shallow={false} layout="vertical" colon={false}>
      <FormLayout layout="horizontal" labelWidth={120}>
        <FormItem.BaseItem label="Outer"><FormItem.BaseItem label="Inner"><Input /></FormItem.BaseItem></FormItem.BaseItem>
      </FormLayout>
    </FormLayout>,
  )
  const items = container.querySelectorAll('.silver-formily-form-item')
  expect(items[0].className).toContain('silver-formily-form-item--layout_horizontal')
  expect(items[1].className).toContain('silver-formily-form-item--layout_vertical')
  expect(container.querySelector('.silver-formily-form-item__colon')).toBeNull()
  expect((items[0].querySelector('.silver-formily-form-item__label') as HTMLElement).style.width).toBe('120px')
})

it('updates responsive layout on size and prop changes and releases observers in StrictMode', async () => {
  const disconnect = vi.spyOn(ResizeObserver.prototype, 'disconnect')
  const view = (width: number, layouts: ('horizontal' | 'vertical')[]) => <StrictMode><FormLayout style={{ width }} breakpoints={[400]} layout={layouts}><FormItem.BaseItem label="Name"><Input /></FormItem.BaseItem></FormLayout></StrictMode>
  const screen = await render(view(300, ['vertical', 'horizontal']))
  await vi.waitFor(() => expect(screen.container.querySelector('.silver-formily-form-item')?.className).toContain('silver-formily-form-item--layout_vertical'))
  await screen.rerender(view(600, ['vertical', 'horizontal']))
  await vi.waitFor(() => expect(screen.container.querySelector('.silver-formily-form-item')?.className).toContain('silver-formily-form-item--layout_horizontal'))
  await screen.rerender(view(600, ['horizontal', 'vertical']))
  await vi.waitFor(() => expect(screen.container.querySelector('.silver-formily-form-item')?.className).toContain('silver-formily-form-item--layout_vertical'))
  await screen.unmount()
  expect(disconnect).toHaveBeenCalled()
})

it('uses fixed wrapper classes with scoped theme tokens and native ConfigProvider prefixes', async () => {
  const { container } = await render(
    <ConfigProvider prefixCls="custom" theme={{ algorithm: theme.darkAlgorithm, token: { colorPrimary: '#ff6600' } }}>
      <FormLayout><FormItem.BaseItem label="Name"><Input /></FormItem.BaseItem></FormLayout>
    </ConfigProvider>,
  )
  expect(container.querySelector('.custom-formily-item')).toBeNull()
  expect(container.querySelector('.custom-form-item')).not.toBeNull()
  expect(container.querySelector('.custom-input')).not.toBeNull()
  const item = container.querySelector('.silver-formily-form-item') as HTMLElement
  expect(item.style.getPropertyValue('--silver-formily-primary')).toBeTruthy()
  expect(item.style.getPropertyValue('--silver-formily-bg')).not.toBe('#ffffff')
})

it('renders button group alignment and FormItem indentation', async () => {
  const { container } = await render(
    <FormLayout labelCol={4} wrapperCol={20}>
      <FormButtonGroup align="right"><button>one</button></FormButtonGroup>
      <FormButtonGroup.FormItem><button>two</button></FormButtonGroup.FormItem>
    </FormLayout>,
  )
  const group = container.querySelector('.silver-formily-form-button-group') as HTMLElement
  expect(getComputedStyle(group).justifyContent).toBe('flex-end')
  expect(container.querySelector('.silver-formily-form-item__label')).not.toBeNull()
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
  const input = container.querySelector('.silver-formily-form-item__component > :first-child')!
  const button = container.querySelector('button')!
  await vi.waitFor(() => expect(button.getBoundingClientRect().top).toBeCloseTo(input.getBoundingClientRect().top))
  expect(container.querySelectorAll('.silver-formily-form-item__colon')).toHaveLength(2)
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
  expect(html).toContain('silver-formily-form-button-group-sticky')
})

it.each(['left', 'right'] as const)('aligns a fixed-width control to the %s edge of its wrapper', async (wrapperAlign) => {
  const { container } = await render(
    <FormItem.BaseItem wrapperWidth={240} wrapperAlign={wrapperAlign}>
      <Input style={{ width: 160 }} />
    </FormItem.BaseItem>,
  )
  const wrapper = container.querySelector('.silver-formily-form-item__control')!
  const input = container.querySelector('.silver-formily-form-item__component > :first-child')!
  await vi.waitFor(() => {
    const bounds = input.getBoundingClientRect()
    const wrapperBounds = wrapper.getBoundingClientRect()
    expect(bounds.width).toBeCloseTo(160)
    expect(bounds[wrapperAlign]).toBeCloseTo(wrapperBounds[wrapperAlign])
  })
})

it('combines BEM blocks, elements, modifiers and caller classes across wrappers', async () => {
  const { container } = await render(
    <FormLayout className="caller-layout" layout="inline">
      <FormGrid className="caller-grid">
        <FormItem.BaseItem className="caller-item" label="Name" layout="vertical" size="small" feedbackStatus="warning" feedbackText="Check" feedbackLayout="terse" labelWrap wrapperWrap fullness>
          <Input />
        </FormItem.BaseItem>
        <FormButtonGroup className="caller-buttons"><button>Save</button></FormButtonGroup>
        <PreviewText className="caller-preview" value="Value" />
      </FormGrid>
    </FormLayout>,
  )
  for (const [block, caller] of [
    ['form-layout', 'layout'],
    ['form-grid', 'grid'],
    ['form-item', 'item'],
    ['form-button-group', 'buttons'],
    ['preview-text', 'preview'],
  ]) {
    expect(container.querySelector(`.silver-formily-${block}.caller-${caller}`)).not.toBeNull()
  }
  expect(container.querySelector('.silver-formily-form-layout--layout_inline')).not.toBeNull()
  const item = container.querySelector('.silver-formily-form-item')!
  for (const modifier of ['layout_vertical', 'size_small', 'status_warning', 'feedback-layout_terse', 'label-wrap', 'wrapper-wrap', 'fullness', 'outline', 'feedback-visible'])
    expect(item.classList.contains(`silver-formily-form-item--${modifier}`)).toBe(true)
  expect(item.querySelector('.silver-formily-form-item__label')).not.toBeNull()
  expect(item.querySelector('.silver-formily-form-item__help')?.textContent).toBe('Check')
})
