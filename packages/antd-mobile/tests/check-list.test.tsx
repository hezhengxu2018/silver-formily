import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'
import { afterEach, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { CheckList } from '../src'

afterEach(cleanup)

it('binds numeric single selection, deselection, programmatic changes and reset', async () => {
  const form = createForm({ initialValues: { choice: [0] } })
  const onChange = vi.fn()
  const screen = await render(
    <FormProvider form={form}>
      <Field name="choice" component={[CheckList, { options: [0, 1], onChange }]} />
    </FormProvider>,
  )
  const zero = screen.getByText('0')
  const one = screen.getByText('1')
  await expect.element(zero.element().closest<HTMLElement>('.adm-check-list-item')!).toHaveClass('adm-check-list-item-active')
  await one.click()
  expect(form.values.choice).toEqual([1])
  expect(onChange).toHaveBeenLastCalledWith([1])
  await one.click()
  expect(form.values.choice).toEqual([])
  form.setValuesIn('choice', [1])
  await expect.element(one.element().closest<HTMLElement>('.adm-check-list-item')!).toHaveClass('adm-check-list-item-active')
  await form.reset()
  await expect.element(zero.element().closest<HTMLElement>('.adm-check-list-item')!).toHaveClass('adm-check-list-item-active')
})

it('observes dataSource changes and falls back to options then custom children', async () => {
  const form = createForm()
  const screen = await render(
    <FormProvider form={form}>
      <Field name="choice" dataSource={[{ label: '数据源', value: 'source' }]} component={[CheckList, { options: ['备选'] }]}>
        <CheckList.Item value="child">子项</CheckList.Item>
      </Field>
    </FormProvider>,
  )
  await expect.element(screen.getByText('数据源')).toBeInTheDocument()
  await expect.element(screen.getByText('备选')).not.toBeInTheDocument()
  await expect.element(screen.getByText('子项')).not.toBeInTheDocument()
  form.setFieldState('choice', (field) => {
    field.dataSource = [{ label: '新数据', value: 'new' }]
  })
  await expect.element(screen.getByText('新数据')).toBeInTheDocument()
  await expect.element(screen.getByText('数据源')).not.toBeInTheDocument()
  form.setFieldState('choice', (field) => {
    field.dataSource = []
  })
  await screen.getByText('备选').click()
  expect(form.values.choice).toEqual(['备选'])
  form.setFieldState('choice', (field) => {
    field.componentProps = { ...field.componentProps, options: [] }
  })
  await screen.getByText('子项').click()
  expect(form.values.choice).toEqual(['child'])
})

it('supports mixed options, rich labels, item props and native multiple selection', async () => {
  const onClick = vi.fn()
  const onChange = vi.fn()
  const screen = await render(
    <CheckList
      multiple
      defaultValue={[0]}
      onChange={onChange}
      options={[0, '文字', { label: <strong>富文本</strong>, value: 'rich', description: '描述', title: '标题', prefix: '前缀', onClick }]}
    />,
  )
  await expect.element(screen.getByText('描述')).toBeInTheDocument()
  await expect.element(screen.getByText('标题')).toBeInTheDocument()
  await expect.element(screen.getByText('前缀')).toBeInTheDocument()
  await screen.getByText('富文本').click()
  expect(onChange).toHaveBeenLastCalledWith([0, 'rich'])
  expect(onClick).toHaveBeenCalledOnce()
  await screen.getByText('文字').click()
  expect(onChange).toHaveBeenLastCalledWith([0, 'rich', '文字'])
  await screen.getByText('0').click()
  expect(onChange).toHaveBeenLastCalledWith(['rich', '文字'])
})

it('keeps native controlled values until the caller updates them', async () => {
  const onChange = vi.fn()
  const screen = await render(<CheckList value={['甲']} options={['甲', '乙']} onChange={onChange} />)
  await screen.getByText('乙').click()
  expect(onChange).toHaveBeenLastCalledWith(['乙'])
  await expect.element(screen.getByText('甲').element().closest<HTMLElement>('.adm-check-list-item')!).toHaveClass('adm-check-list-item-active')
  await screen.rerender(<CheckList value={['乙']} options={['甲', '乙']} onChange={onChange} />)
  await expect.element(screen.getByText('乙').element().closest<HTMLElement>('.adm-check-list-item')!).toHaveClass('adm-check-list-item-active')
})

it.each(['disabled', 'readOnly', 'readPretty'] as const)('respects dynamic field %s state with custom children', async (pattern) => {
  const form = createForm({ initialValues: { choice: ['a'] } })
  const screen = await render(
    <FormProvider form={form}>
      <Field name="choice" component={[CheckList]}>
        <CheckList.Item value="a">甲</CheckList.Item>
        <CheckList.Item value="b">乙</CheckList.Item>
      </Field>
    </FormProvider>,
  )
  form.setFieldState('choice', (field) => {
    field.pattern = pattern
  })
  const stateClass = pattern === 'readOnly' ? 'adm-check-list-item-readonly' : 'adm-list-item-disabled'
  await expect.poll(() => screen.getByText('乙').element().closest<HTMLElement>('.adm-check-list-item')!.classList.contains(stateClass)).toBe(true)
  screen.getByText('乙').element().closest<HTMLElement>('.adm-check-list-item')!.click()
  expect(form.values.choice).toEqual(['a'])
  form.setFieldState('choice', (field) => {
    field.pattern = 'editable'
  })
  await screen.getByText('乙').click()
  expect(form.values.choice).toEqual(['b'])
})

it('respects option disabled and readOnly flags', async () => {
  const onChange = vi.fn()
  const screen = await render(
    <CheckList
      onChange={onChange}
      options={[
        { label: '禁用', value: 'disabled', disabled: true },
        { label: '只读', value: 'readonly', readOnly: true },
      ]}
    />,
  )
  const disabled = screen.getByText('禁用').element().closest<HTMLElement>('.adm-check-list-item')!
  await expect.element(disabled).toHaveClass('adm-list-item-disabled')
  disabled.click()
  await screen.getByText('只读').click()
  expect(onChange).not.toHaveBeenCalled()
})

it.each([true, false])('applies native styles and attributes to the same root with options=%s', async (useOptions) => {
  const screen = await render(
    <CheckList
      className="custom-list"
      style={{ 'color': 'rgb(255, 0, 0)', '--border-top': '0' } as React.CSSProperties}
      aria-label="选择列表"
      mode="card"
      options={useOptions ? ['选项'] : undefined}
    >
      <CheckList.Item value="child">选项</CheckList.Item>
    </CheckList>,
  )
  const root = screen.getByLabelText('选择列表').element() as HTMLElement
  await expect.element(root).toHaveClass('adm-check-list', 'adm-formily-check-list', 'custom-list', 'adm-list-card')
  expect(root.style.color).toBe('rgb(255, 0, 0)')
  expect(root.style.getPropertyValue('--border-top')).toBe('0')
  expect(root.querySelectorAll('.adm-check-list-item')).toHaveLength(1)
})
