import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { Cascader, Checkbox, PickerSelect, Radio, Segmented, Select, SelectTable, TreeSelect } from '../index'
import 'element-plus/theme-chalk/index.css'

const options = [{ value: 0, label: 'Zero', extra: 'keep in source' }, { value: 1, label: 'One', extra: 'other' }]

describe('projected option values', () => {
  for (const [name, Component, multiple] of [['Radio', Radio.Group, false], ['Checkbox', Checkbox.Group, true], ['Segmented', Segmented, false]] as const) {
    it(`${name}: projects output, accepts external values and resets`, async () => {
      const form = createForm()
      const page = render(() => (
        <FormProvider form={form}>
          <Field name="choice" dataSource={options} component={[Component, { optionAsValue: true, optionValueKeys: ['value'] }]} />
        </FormProvider>
      ))
      await page.getByText('Zero', { exact: true }).click()
      expect(form.values.choice).toEqual(multiple ? [{ value: 0 }] : { value: 0 })
      form.setValues({ choice: multiple ? [{ value: 1 }] : { value: 1 } })
      await expect.element(page.getByRole(multiple ? 'checkbox' : 'radio', { name: 'One' })).toBeChecked()
      await form.reset()
      await expect.element(page.getByRole(multiple ? 'checkbox' : 'radio', { name: 'One' })).not.toBeChecked()
      expect(options[0].extra).toBe('keep in source')
    })
  }

  it('select: grouped options, multiple selection and removal retain only selected keys', async () => {
    const form = createForm({ initialValues: { choice: [{ value: 0 }] } })
    const changed = vi.fn()
    const page = render(() => (
      <FormProvider form={form}>
        <Field name="choice" dataSource={[{ label: 'Group', options }]} component={[Select, { multiple: true, optionAsValue: true, optionValueKeys: ['value'], onChange: changed }]} />
      </FormProvider>
    ))
    await vi.waitFor(() => expect(document.querySelector('.el-select__selection')?.textContent).toContain('Zero'))
    await userEvent.click(document.querySelector('.el-select')!)
    await page.getByRole('option', { name: 'One', exact: true }).click()
    expect(form.values.choice).toEqual([{ value: 0 }, { value: 1 }])
    expect(changed).toHaveBeenLastCalledWith([{ value: 0 }, { value: 1 }])
    await page.getByRole('option', { name: 'Zero', exact: true }).click()
    expect(form.values.choice).toEqual([{ value: 1 }])
  })

  it('treeSelect: custom identities and children support projected initial and selected values', async () => {
    const form = createForm({ initialValues: { choice: { id: 0 } } })
    const page = render(() => (
      <FormProvider form={form}>
        <Field name="choice" dataSource={[{ id: 2, name: 'Parent', nodes: [{ id: 0, name: 'Zero' }, { id: 1, name: 'One' }] }]} component={[TreeSelect, { nodeKey: 'id', props: { label: 'name', children: 'nodes' }, defaultExpandAll: true, optionAsValue: true, optionValueKeys: ['id'] }]} />
      </FormProvider>
    ))
    await vi.waitFor(() => expect(document.querySelector('.el-select__selection')?.textContent).toContain('Zero'))
    await userEvent.click(document.querySelector('.el-select')!)
    await page.getByText('One', { exact: true }).click()
    expect(form.values.choice).toEqual({ id: 1 })
  })

  for (const multiple of [false, true]) {
    for (const emitPath of [false, true]) {
      it(`Cascader: multiple=${multiple}, emitPath=${emitPath}`, async () => {
        const form = createForm()
        const page = render(() => (
          <FormProvider form={form}>
            <Field name="choice" dataSource={[{ value: 2, label: 'Parent', children: options }]} component={[Cascader, { props: { multiple, emitPath }, optionAsValue: true, optionValueKeys: ['value'] }]} />
          </FormProvider>
        ))
        await userEvent.click(document.querySelector('.el-cascader')!)
        await page.getByText('Parent', { exact: true }).click()
        if (multiple) {
          const label = page.getByText('Zero', { exact: true }).element()
          await userEvent.click(label.parentElement!.querySelector('.el-checkbox')!)
        }
        else {
          await page.getByText('Zero', { exact: true }).click()
        }
        const selection = emitPath ? [{ value: 2 }, { value: 0 }] : { value: 0 }
        await vi.waitFor(() => expect(form.values.choice).toEqual(multiple ? [selection] : selection))
      })
    }
  }

  it('pickerSelect: projects raw without losing label or removal identity', async () => {
    const form = createForm()
    render(() => (
      <FormProvider form={form}>
        <Field name="choice" component={[PickerSelect, { optionAsValue: true, optionValueKeys: ['id'], multiple: true, openPicker: () => [{ value: 0, label: 'Zero', raw: { id: 0, name: 'Zero', extra: true } }] }]} />
      </FormProvider>
    ))
    await userEvent.click(document.querySelector('.el-select')!)
    await vi.waitFor(() => expect(form.values.choice).toEqual([{ id: 0 }]))
    await vi.waitFor(() => expect(document.querySelector('.el-select__selection')?.textContent).toContain('Zero'))
    await userEvent.click(document.querySelector('.el-tag__close')!)
    expect(form.values.choice).toEqual([])
  })

  it('selectTable: projected initial values resolve complete rows', async () => {
    const form = createForm({ initialValues: { choice: [{ value: 0 }] } })
    const page = render(() => (
      <FormProvider form={form}>
        <Field name="choice" dataSource={options} component={[SelectTable, { rowKey: 'value', optionAsValue: true, optionValueKeys: ['value'], columns: [{ prop: 'label', label: 'Label' }] }]} />
      </FormProvider>
    ))
    await page.getByText('One', { exact: true }).click()
    await vi.waitFor(() => expect(form.values.choice).toEqual([{ value: 0 }, { value: 1 }]))
    await page.getByText('Zero', { exact: true }).click()
    await vi.waitFor(() => expect(form.values.choice).toEqual([{ value: 1 }]))
  })

  it('select: late data resolves projected values without rewriting the form', async () => {
    const form = createForm({ initialValues: { choice: { value: 0 } } })
    render(() => (
      <FormProvider form={form}>
        <Field name="choice" dataSource={[]} component={[Select, { optionAsValue: true, optionValueKeys: ['value'] }]} />
      </FormProvider>
    ))
    form.setFieldState('choice', (state) => {
      state.dataSource = options
    })
    await vi.waitFor(() => expect(document.querySelector('.el-select__selection')?.textContent).toContain('Zero'))
    expect(form.values.choice).toEqual({ value: 0 })
    form.setValues({ choice: { value: 1 } })
    await vi.waitFor(() => expect(document.querySelector('.el-select__selection')?.textContent).toContain('One'))
  })

  it('selectTable: external projected values survive paging and another selection', async () => {
    const form = createForm()
    const page = render(() => (
      <FormProvider form={form}>
        <Field name="choice" dataSource={options.slice(0, 1)} component={[SelectTable, { rowKey: 'value', optionAsValue: true, optionValueKeys: ['value'], columns: [{ prop: 'label', label: 'Label' }] }]} />
      </FormProvider>
    ))
    form.setValues({ choice: [{ value: 0 }] })
    await vi.waitFor(() => expect(document.querySelector('tbody .el-checkbox')).toHaveClass('is-checked'))
    form.setFieldState('choice', (state) => {
      state.dataSource = options.slice(1)
    })
    await page.getByText('One', { exact: true }).click()
    await vi.waitFor(() => expect(form.values.choice).toEqual([{ value: 0 }, { value: 1 }]))
  })

  it('cascader: duplicate leaf values resolve within the selected path', async () => {
    const form = createForm()
    const source = [
      { value: 1, label: 'First', children: [{ value: 0, label: 'Wrong leaf' }] },
      { value: 2, label: 'Second', children: [{ value: 0, label: 'Right leaf' }] },
    ]
    const page = render(() => (
      <FormProvider form={form}>
        <Field name="choice" dataSource={source} component={[Cascader, { optionAsValue: true, optionValueKeys: ['value', 'label'] }]} />
      </FormProvider>
    ))
    await userEvent.click(document.querySelector('.el-cascader')!)
    await page.getByText('Second', { exact: true }).click()
    await page.getByText('Right leaf', { exact: true }).click()
    await vi.waitFor(() => expect(form.values.choice).toEqual([{ value: 2, label: 'Second' }, { value: 0, label: 'Right leaf' }]))
    form.setFieldState('choice', (state) => {
      state.pattern = 'readPretty'
    })
    await expect.element(page.getByText('Second / Right leaf', { exact: true })).toBeVisible()
  })

  for (const Component of [TreeSelect, Cascader]) {
    it(`${Component.name}: lazy loaded options provide the projected object`, async () => {
      const form = createForm()
      const lazyLoad = (node: any, resolve: (items: any[]) => void) => resolve(node.level === 0 ? [{ value: 1, label: 'Lazy choice', leaf: true, isLeaf: true, extra: 'data' }] : [])
      const page = render(() => (
        <FormProvider form={form}>
          <Field
            name="choice"
            component={[Component, {
              optionAsValue: true,
              optionValueKeys: ['value', 'extra'],
              ...(Component === TreeSelect ? { lazy: true, load: lazyLoad } : { props: { lazy: true, lazyLoad, emitPath: false } }),
            }]}
          />
        </FormProvider>
      ))
      await userEvent.click(document.querySelector(Component === TreeSelect ? '.el-select' : '.el-cascader')!)
      await page.getByText('Lazy choice', { exact: true }).click()
      await vi.waitFor(() => expect(form.values.choice).toEqual({ value: 1, extra: 'data' }))
    })
  }

  for (const Component of [Select, TreeSelect, Cascader, Radio.Group, Checkbox.Group, Segmented]) {
    it(`${Component.name}: readPretty resolves labels from full dataSource`, async () => {
      const form = createForm({ initialValues: { choice: Component === Checkbox.Group ? [{ value: 0 }] : { value: 0 } } })
      const page = render(() => (
        <FormProvider form={form}>
          <Field name="choice" pattern="readPretty" dataSource={options} component={[Component, { optionAsValue: true, optionValueKeys: ['value'], props: { emitPath: false } }]} />
        </FormProvider>
      ))
      await expect.element(page.getByText('Zero', { exact: true })).toBeVisible()
    })
  }
})

describe('business option properties', () => {
  for (const [Component, multiple] of [[Radio.Group, false], [Checkbox.Group, true], [Segmented, false]] as const) {
    it(`${Component.name}: preserves options metadata in output and readPretty`, async () => {
      const form = createForm()
      const option = { value: 1, label: 'Business option', options: ['metadata'] }
      const page = render(() => (
        <FormProvider form={form}>
          <Field name="choice" dataSource={[option]} component={[Component, { optionAsValue: true }]} />
        </FormProvider>
      ))
      await page.getByText('Business option', { exact: true }).click()
      expect(form.values.choice).toEqual(multiple ? [option] : option)
      form.setFieldState('choice', (state) => {
        state.value = multiple ? [{ value: 1 }] : { value: 1 }
        state.pattern = 'readPretty'
      })
      await expect.element(page.getByText('Business option', { exact: true })).toBeVisible()
    })
  }

  it('select still resolves grouped options in readPretty', async () => {
    const form = createForm({ initialValues: { choice: { value: 1 } } })
    const page = render(() => (
      <FormProvider form={form}>
        <Field name="choice" pattern="readPretty" dataSource={[{ label: 'Group', options: [{ value: 1, label: 'Grouped option' }] }]} component={[Select, { optionAsValue: true }]} />
      </FormProvider>
    ))
    await expect.element(page.getByText('Grouped option', { exact: true })).toBeVisible()
  })
})
