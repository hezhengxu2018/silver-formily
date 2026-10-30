import { createForm } from '@silver-formily/core'
import { ArrayField, Field, FormProvider } from '@silver-formily/react'
import { createRef } from 'react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { ArrayBase, Input } from '../src'

afterEach(cleanup)

it('addition pushes default value into array field', async () => {
  const form = createForm()
  const { getByText } = await render(
    <FormProvider form={form}>
      <ArrayField name="items">
        <ArrayBase>
          {form.values.items?.map((item: any, index: number) => (
            <div key={index} data-testid={`item-${index}`}>
              <Field
                name={`${index}`}
                component={[Input]}
                dataSource={[item]}
              />
            </div>
          ))}
          <ArrayBase.Addition title="新增" defaultValue="x" />
        </ArrayBase>
      </ArrayField>
    </FormProvider>,
  )

  expect(form.values.items).toEqual([])

  await getByText('新增').click()
  expect(form.values.items).toEqual(['x'])

  await getByText('新增').click()
  expect(form.values.items).toEqual(['x', 'x'])
})

it('remove and index mixins operate on the array field', async () => {
  const form = createForm({ initialValues: { items: ['a', 'b'] } })
  const { getByTestId } = await render(
    <FormProvider form={form}>
      <ArrayField name="items">
        <ArrayBase>
          {form.values.items.map((item: any, index: number) => (
            <ArrayBase.Item key={index} index={index} record={item}>
              <span data-testid={`item-${index}`}>
                <ArrayBase.Index />
                <ArrayBase.Remove data-testid={`remove-${index}`} />
              </span>
            </ArrayBase.Item>
          ))}
        </ArrayBase>
      </ArrayField>
    </FormProvider>,
  )

  await expect.element(getByTestId('item-0')).toHaveTextContent('#1.')
  await expect.element(getByTestId('item-1')).toHaveTextContent('#2.')

  await getByTestId('remove-0').click()
  expect(form.values.items).toEqual(['b'])
})

it('removes and moves records while preserving callbacks and span refs', async () => {
  const form = createForm({ initialValues: { items: [{ name: 'a' }, { name: 'discard' }, { name: 'b' }] } })
  const onRemove = vi.fn()
  const onMoveDown = vi.fn()
  const onMoveUp = vi.fn()
  const ref = createRef<HTMLSpanElement>()
  const screen = await render(
    <FormProvider form={form}>
      <ArrayField name="items">
        <ArrayBase onRemove={onRemove} onMoveDown={onMoveDown} onMoveUp={onMoveUp}>
          <ArrayBase.Remove index={1} ref={ref} data-testid="remove" />
          <ArrayBase.MoveDown index={0} data-testid="down" />
          <ArrayBase.MoveUp index={1} data-testid="up" />
        </ArrayBase>
      </ArrayField>
    </FormProvider>,
  )
  expect(ref.current).toBe(screen.getByTestId('remove').element())
  await screen.getByTestId('remove').click()
  expect(form.values.items).toEqual([{ name: 'a' }, { name: 'b' }])
  expect(onRemove).toHaveBeenCalledWith(1)
  await screen.getByTestId('down').click()
  expect(form.values.items).toEqual([{ name: 'b' }, { name: 'a' }])
  expect(onMoveDown).toHaveBeenCalledWith(0)
  await screen.getByTestId('up').click()
  expect(form.values.items).toEqual([{ name: 'a' }, { name: 'b' }])
  expect(onMoveUp).toHaveBeenCalledWith(1)
})


it('updates move boundaries when an array grows and shrinks without remounting operations', async () => {
  const form = createForm()
  const { container, getByTestId, getByRole } = await render(
    <FormProvider form={form}>
      <ArrayField name="items">
        <ArrayBase>
          <ArrayBase.MoveUp index={0} data-testid="up-0" />
          <ArrayBase.MoveDown index={0} data-testid="down-0" />
          <ArrayBase.MoveUp index={1} data-testid="up-1" />
          <ArrayBase.MoveDown index={1} data-testid="down-1" />
          <ArrayBase.Remove index={0} data-testid="remove" />
          <ArrayBase.Addition title="新增" defaultValue="a" />
        </ArrayBase>
      </ArrayField>
    </FormProvider>,
  )
  expect(container.querySelector('[data-testid="up-0"]')).toBeNull()
  expect(container.querySelector('[data-testid="down-0"]')).toBeNull()
  await getByRole('button', { name: '新增' }).click()
  expect(container.querySelector('[data-testid="up-0"]')).toBeNull()
  expect(container.querySelector('[data-testid="down-0"]')).toBeNull()
  await getByRole('button', { name: '新增' }).click()
  await expect.element(getByTestId('down-0')).toBeVisible()
  await expect.element(getByTestId('up-1')).toBeVisible()
  expect(container.querySelector('[data-testid="down-1"]')).toBeNull()
  await getByTestId('remove').click()
  await expect.element(getByTestId('down-0')).not.toBeInTheDocument()
  expect(container.querySelector('[data-testid="up-0"]')).toBeNull()
  await getByTestId('remove').click()
  expect(form.values.items).toEqual([])
  expect(container.querySelector('[data-testid="down-0"]')).toBeNull()
})
