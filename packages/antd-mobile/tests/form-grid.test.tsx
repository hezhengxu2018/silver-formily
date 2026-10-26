import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { FormGrid, FormItem, FormLayout, Input } from '../src'

afterEach(cleanup)

it('lays out fixed columns, explicit spans and full rows', async () => {
  const { container, rerender } = await render(
    <FormGrid columns={3} columnGap={8} rowGap={12} style={{ width: 320 }}>
      <div>A</div>
      <FormGrid.GridColumn gridSpan={-1}>B</FormGrid.GridColumn>
      <FormGrid.GridColumn gridSpan={3}>C</FormGrid.GridColumn>
    </FormGrid>,
  )
  const grid = container.firstElementChild as HTMLElement
  await vi.waitFor(() => {
    const [a, b, c] = Array.from(grid.children).map(child => child.getBoundingClientRect())
    expect(b.top).toBeGreaterThan(a.bottom)
    expect(b.width).toBe(320)
    expect(c.width).toBe(320)
    expect(c.top - b.bottom).toBe(12)
  })
  await rerender(
    <FormGrid columns={2} style={{ width: 320 }}>
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
        <FormGrid columns={2} style={{ width: 320 }}>
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


it('wraps spans without shrinking them and reflows when a field is hidden', async () => {
  const form = createForm()
  const { container } = await render(
    <FormProvider form={form}>
      <FormGrid columns={3} style={{ width: 320 }}>
        <Field name="first" decorator={[FormItem]} component={[Input]} />
        <Field name="second" decorator={[FormItem, { gridSpan: 2 }]} component={[Input]} />
        <Field name="third" decorator={[FormItem, { gridSpan: 2 }]} component={[Input]} />
        <div data-grid-span="-1">Full row</div>
      </FormGrid>
    </FormProvider>,
  )
  const grid = container.firstElementChild as HTMLElement
  await vi.waitFor(() => {
    const [a, b, c, d] = Array.from(grid.children).map(child => child.getBoundingClientRect())
    expect(b.top).toBe(a.top)
    expect(c.top).toBeGreaterThan(b.top)
    expect(c.width).toBeCloseTo(b.width, 0)
    expect(d.width).toBe(320)
    expect(d.top).toBeGreaterThan(c.top)
  })
  form.setFieldState('first', { visible: false })
  await vi.waitFor(() => {
    expect(grid.children).toHaveLength(3)
    expect(grid.children[0].getBoundingClientRect().left).toBe(grid.getBoundingClientRect().left)
  })
})

it('normalizes columns and gaps and preserves zero gap overrides', async () => {
  const { container, rerender } = await render(
    <FormLayout gridColumnGap={16} gridRowGap={12}>
      <FormGrid columns={Number.NaN} columnGap={0} rowGap={0} data-testid="grid"><div>A</div></FormGrid>
    </FormLayout>,
  )
  const grid = container.querySelector('[data-testid="grid"]') as HTMLElement
  expect(grid.style.gridTemplateColumns).toBe('repeat(1, minmax(0px, 1fr))')
  expect(getComputedStyle(grid).gap).toBe('0px')
  await rerender(<FormGrid columns={2.6} columnGap={-1} rowGap={Number.POSITIVE_INFINITY}><div>A</div></FormGrid>)
  const updated = container.firstElementChild as HTMLElement
  expect(updated.style.gridTemplateColumns).toBe('repeat(3, minmax(0px, 1fr))')
  expect(getComputedStyle(updated).gap).toBe('4px 8px')
})
