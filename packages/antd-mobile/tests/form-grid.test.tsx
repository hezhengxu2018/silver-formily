import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { FormGrid, FormItem, FormLayout, Input } from '../src'

afterEach(cleanup)

it('lays out fixed columns, explicit spans and remaining spans', async () => {
  const { container, rerender } = await render(
    <FormGrid minColumns={3} maxColumns={3} columnGap={8} rowGap={12} style={{ width: 320 }}>
      <div>A</div>
      <FormGrid.GridColumn gridSpan={-1}>B</FormGrid.GridColumn>
      <FormGrid.GridColumn gridSpan={3}>C</FormGrid.GridColumn>
    </FormGrid>,
  )
  const grid = container.firstElementChild as HTMLElement
  await vi.waitFor(() => {
    const [a, b, c] = Array.from(grid.children).map(child => child.getBoundingClientRect())
    expect(b.top).toBe(a.top)
    expect(b.width).toBeCloseTo(a.width * 2 + 8, 0)
    expect(c.width).toBe(320)
    expect(c.top - a.bottom).toBe(12)
  })
  await rerender(
    <FormGrid minColumns={2} maxColumns={2} style={{ width: 320 }}>
      <div>A</div>
      <FormGrid.GridColumn gridSpan={1}>B</FormGrid.GridColumn>
    </FormGrid>,
  )
  await vi.waitFor(() => expect(grid.children[1].getBoundingClientRect().width).toBe(156))
})

it('inherits layout gaps and supports FormItem gridSpan', async () => {
  const { container } = await render(
    <FormProvider form={createForm()}>
      <FormLayout layout="vertical" gridColumnGap={16} gridRowGap={12}>
        <FormGrid minColumns={2} maxColumns={2} style={{ width: 320 }}>
          <Field name="first" title="First" decorator={[FormItem]} component={[Input]} />
          <Field name="second" title="Second" decorator={[FormItem]} component={[Input]} />
          <Field name="address" title="Address" decorator={[FormItem, { gridSpan: 2 }]} component={[Input]} />
        </FormGrid>
      </FormLayout>
    </FormProvider>,
  )
  const grid = container.querySelector('.adm-formily-grid-layout') as HTMLElement
  expect(getComputedStyle(grid).gap).toBe('12px 16px')
  await vi.waitFor(() => expect(grid.children[2].getBoundingClientRect().width).toBe(320))
})

it('uses updated visibility and lifecycle callbacks when only callbacks change', async () => {
  const onDigest = vi.fn()
  const onInitialized = vi.fn()
  const { container, rerender } = await render(
    <FormGrid minColumns={2} maxColumns={2} shouldVisible={() => true} style={{ width: 320 }}>
      <div>A</div>
      <div>B</div>
    </FormGrid>,
  )
  await rerender(
    <FormGrid
      minColumns={2}
      maxColumns={2}
      shouldVisible={node => node.index === 0}
      onDigest={onDigest}
      onInitialized={onInitialized}
      style={{ width: 320 }}
    >
      <div>A</div>
      <div>B</div>
    </FormGrid>,
  )
  await vi.waitFor(() => {
    expect(getComputedStyle(container.firstElementChild!.children[1]).display).toBe('none')
    expect(onDigest).toHaveBeenCalled()
    expect(onInitialized).toHaveBeenCalledOnce()
  })
})
