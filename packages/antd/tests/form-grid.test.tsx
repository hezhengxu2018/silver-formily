import { createForm } from '@silver-formily/core'
import { Field } from '@silver-formily/react'
import { observer } from '@silver-formily/reactive-react'
import { StrictMode } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { createFormGrid, Form, FormGrid, FormItem, Input, useFormGrid } from '../src'

afterEach(cleanup)

it('adapts to container breakpoints and fills the remaining columns', async () => {
  const grid = createFormGrid({ breakpoints: [400, 1000], minColumns: [1, 3], maxColumns: [1, 3], columnGap: 10 })
  const { container } = await render(
    <FormGrid grid={grid} style={{ width: 620 }}>
      <FormGrid.GridColumn>A</FormGrid.GridColumn>
      <FormGrid.GridColumn gridSpan={-1}>B</FormGrid.GridColumn>
      <FormGrid.GridColumn gridSpan={8}>C</FormGrid.GridColumn>
    </FormGrid>,
  )
  const root = container.firstElementChild as HTMLElement
  await vi.waitFor(() => {
    expect(grid.columns).toBe(3)
    const [a, b, c] = Array.from(root.children).map(child => child.getBoundingClientRect())
    expect(a.width).toBe(200)
    expect(b.top).toBe(a.top)
    expect(b.width).toBe(410)
    expect(c.width).toBe(620)
  })
  root.style.width = '300px'
  await vi.waitFor(() => {
    expect(grid.columns).toBe(1)
    expect(root.children[1].getBoundingClientRect().width).toBe(300)
  })
})

it('updates layout options and column spans after rendering', async () => {
  const example = (columns: number, span: number) => (
    <FormGrid minColumns={columns} maxColumns={columns} columnGap={0} rowGap={0} style={{ width: 600 }} data-testid="grid">
      <FormGrid.GridColumn gridSpan={span}>A</FormGrid.GridColumn>
      <FormGrid.GridColumn>B</FormGrid.GridColumn>
    </FormGrid>
  )
  const { container, rerender } = await render(example(3, 1))
  const root = container.firstElementChild as HTMLElement
  await vi.waitFor(() => expect(root.children[0].getBoundingClientRect().width).toBe(200))
  await rerender(example(2, 2))
  await vi.waitFor(() => {
    expect(root.children[0].getBoundingClientRect().width).toBe(600)
    expect(getComputedStyle(root).gap).toBe('0px')
  })
})

it('supports FormItem spans and reflows when schema fields disappear', async () => {
  const form = createForm()
  const { container } = await render(
    <Form form={form} layout="vertical">
      <FormGrid minColumns={3} maxColumns={3} columnGap={0} style={{ width: 600 }}>
        <Field name="first" title="First" decorator={[FormItem]} component={[Input]} />
        <Field name="second" title="Second" decorator={[FormItem, { gridSpan: 2 }]} component={[Input]} />
        <FormGrid.GridColumn gridSpan={-1}>Actions</FormGrid.GridColumn>
      </FormGrid>
    </Form>,
  )
  const root = container.querySelector('.silver-formily-form-grid')!
  await vi.waitFor(() => expect(root.children[1].getBoundingClientRect().width).toBe(400))
  form.setFieldState('first', { visible: false })
  await vi.waitFor(() => {
    expect(root.children).toHaveLength(2)
    const [field, actions] = Array.from(root.children).map(child => child.getBoundingClientRect())
    expect(actions.top).toBe(field.top)
    expect(actions.width).toBe(200)
  })
})

it('observes an external grid and supports collapsible query form fields', async () => {
  const grid = createFormGrid({
    minColumns: 2,
    maxColumns: 2,
    maxRows: 1,
    shouldVisible: (node, grid) => node.index === grid.childSize - 1 || (node.shadowRow ?? 1) <= grid.maxRows,
  })
  const Status = observer(() => <span>{useFormGrid()?.maxRows === Infinity ? 'expanded' : 'collapsed'}</span>)
  const { container } = await render(
    <StrictMode>
      <FormGrid grid={grid} minColumns={8} style={{ width: 600 }}>
        <FormGrid.GridColumn>A</FormGrid.GridColumn>
        <FormGrid.GridColumn>B</FormGrid.GridColumn>
        <FormGrid.GridColumn>C</FormGrid.GridColumn>
        <FormGrid.GridColumn gridSpan={-1}><Status /></FormGrid.GridColumn>
      </FormGrid>
    </StrictMode>,
  )
  const root = container.firstElementChild as HTMLElement
  await vi.waitFor(() => {
    expect(grid.columns).toBe(2)
    expect(getComputedStyle(root.children[2]).display).toBe('none')
    expect(root.textContent).toContain('collapsed')
  })
  grid.maxRows = Infinity
  await vi.waitFor(() => {
    expect(getComputedStyle(root.children[2]).display).not.toBe('none')
    expect(root.textContent).toContain('expanded')
  })
})

it('disconnects replaced and unmounted grid instances', async () => {
  const first = createFormGrid()
  const second = createFormGrid()
  const firstDispose = vi.fn()
  const secondDispose = vi.fn()
  vi.spyOn(first, 'connect').mockReturnValue(firstDispose)
  vi.spyOn(second, 'connect').mockReturnValue(secondDispose)
  const { rerender, unmount } = await render(<FormGrid grid={first}><div>A</div></FormGrid>)
  await rerender(<FormGrid grid={second}><div>B</div></FormGrid>)
  expect(firstDispose).toHaveBeenCalledOnce()
  await unmount()
  expect(secondDispose).toHaveBeenCalledOnce()
})
