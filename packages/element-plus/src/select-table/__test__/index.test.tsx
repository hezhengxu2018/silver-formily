import type { ArrayField, FieldDataSource } from '@formily/core'
import { createForm } from '@formily/core'
import { createSchemaField, Field, FormProvider } from '@silver-formily/vue'
import { ElTableColumn } from 'element-plus'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent, Fragment } from 'vue'
import SelectTable from '../index'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-table.css'
import 'element-plus/theme-chalk/el-link.css'
import 'element-plus/theme-chalk/el-loading.css'
import '../style.scss'

function formilyWrapperFactory(fieldProps = {}, selectTableProps = {}) {
  return defineComponent({
    props: {
      form: {
        type: Object,
        default: () => createForm(),
      },
    },
    setup(props) {
      return () => (
        <FormProvider form={props.form}>
          <Field
            name="selectTable"
            title="selectTable"
            dataSource={[
              { key: '1', name: 'title-1', description: 'description-1' },
              { key: '2', name: 'title-2', description: 'description-2' },
              { key: '3', name: 'title-3', description: 'description-3' },
            ]}
            {...fieldProps}
            component={[
              SelectTable,
              {
                columns: [
                  { prop: 'name', label: 'Title' },
                  { prop: 'description', label: 'Description' },
                ],
                ...selectTableProps,
              },
            ]}
          />
        </FormProvider>
      )
    },
  })
}

function formilyWrapperWithSlotFactory(fieldProps = {}, selectTableProps = {}) {
  return defineComponent({
    props: {
      form: {
        type: Object,
        default: () => createForm(),
      },
    },
    setup(props) {
      return () => (
        <FormProvider form={props.form}>
          <Field
            name="selectTable"
            title="selectTable"
            dataSource={[
              { key: '1', name: 'title-1', description: 'description-1' },
              { key: '2', name: 'title-2', description: 'description-2' },
              { key: '3', name: 'title-3', description: 'description-3' },
            ]}
            {...fieldProps}
            component={[SelectTable, { ...selectTableProps }]}
          >
            <ElTableColumn prop="name" label="Title" />
            <ElTableColumn
              prop="description"
              label="Description"
              v-slots={{
                default: ({ row }) => (
                  <div>{`${row.description}-${row.name}`}</div>
                ),
              }}
            />
          </Field>
        </FormProvider>
      )
    },
  })
}

function formilyWrapperWithSlotBySchemaFactory(
  fieldProps = {},
  selectTableProps = {},
) {
  return defineComponent({
    setup() {
      const form = createForm()
      const { SchemaArrayField } = createSchemaField({
        components: {
          SelectTable,
        },
      })
      return () => (
        <FormProvider form={form}>
          <SchemaArrayField
            name="selectTable"
            title="selectTable"
            dataSource={[
              { key: '1', name: 'title-1', description: 'description-1' },
              { key: '2', name: 'title-2', description: 'description-2' },
              { key: '3', name: 'title-3', description: 'description-3' },
            ]}
            x-component="SelectTable"
            x-component-props={{
              ...selectTableProps,
            }}
            x-content={(
              <Fragment>
                <ElTableColumn prop="name" label="Title" />
                <ElTableColumn prop="description" label="Description">
                  {{
                    default: ({ row }) => {
                      return <div>{`${row.description}-${row.name}`}</div>
                    },
                  }}
                </ElTableColumn>
              </Fragment>
            )}
          />
          <Field
            name="selectTable"
            title="selectTable"
            dataSource={[
              { key: '1', name: 'title-1', description: 'description-1' },
              { key: '2', name: 'title-2', description: 'description-2' },
              { key: '3', name: 'title-3', description: 'description-3' },
            ]}
            {...fieldProps}
            component={[SelectTable, { ...selectTableProps }]}
          >
            <ElTableColumn prop="name" label="Title" />
            <ElTableColumn prop="description" label="Description">
              {{
                default: ({ row }) => {
                  return <div>{`${row.description}-${row.name}`}</div>
                },
              }}
            </ElTableColumn>
          </Field>
        </FormProvider>
      )
    },
  })
}

describe('基础数据展示', async () => {
  it('应该显示为空数据', async () => {
    const screen = render(SelectTable)
    await expect.element(screen.getByText('No Data')).toBeInTheDocument()
    await expect.element(screen.getByText('已选择')).not.toBeInTheDocument()
  })

  it('应该显示数据', async () => {
    const screen = render(formilyWrapperFactory())
    await expect.element(screen.getByText('title-1')).toBeInTheDocument()
    await expect.element(screen.getByText('description-1')).toBeInTheDocument()
    await expect.element(screen.getByText('title-2')).toBeInTheDocument()
    await expect.element(screen.getByText('description-2')).toBeInTheDocument()
  })

  it('应该支持反显表单数据', async () => {
    const form = createForm({
      initialValues: {
        selectTable: ['1'],
      },
    })
    const screen = render(formilyWrapperFactory({ rowKey: 'key' }), {
      props: {
        form,
      },
    })

    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .toBeChecked()
  })

  it('应该支持异步表单数据的反显', async () => {
    const form = createForm({
      initialValues: {
        selectTable: ['1'],
      },
    })
    const screen = render(() => (
      <FormProvider form={form}>
        <Field
          name="selectTable"
          title="selectTable"
          component={[
            SelectTable,
            {
              rowKey: 'key',
              columns: [
                { prop: 'name', label: 'Title' },
                { prop: 'description', label: 'Description' },
              ],
            },
          ]}
        />
      </FormProvider>
    ))
    await expect.element(screen.getByText('No Data')).toBeInTheDocument()
    const field = form.query('selectTable').take() as ArrayField
    field.loading = true
    const httpRequest = new Promise<FieldDataSource>((resolve) => {
      setTimeout(() => {
        resolve([
          { key: '1', name: 'title-1', description: 'description-1' },
          { key: '2', name: 'title-2', description: 'description-2' },
          { key: '3', name: 'title-3', description: 'description-3' },
        ])
      }, 500)
    })

    const res = await httpRequest
    field.dataSource = res
    field.loading = false

    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .toBeChecked()
  })

  it('应该包含多选框', async () => {
    const form = createForm()
    const screen = render(formilyWrapperFactory({ rowKey: 'key' }), {
      props: {
        form,
      },
    })
    await expect
      .element(
        screen
          .getByRole('row', { name: 'title-1 description-' })
          .getByRole('checkbox'),
      )
      .toBeInTheDocument()
  })

  it('应该正常展示插槽内容', async () => {
    const screen = render(formilyWrapperWithSlotFactory({ rowKey: 'key' }))
    await expect
      .element(screen.getByText('description-1-title-1'))
      .toBeInTheDocument()
    await expect
      .element(screen.getByText('description-2-title-2'))
      .toBeInTheDocument()
  })

  it('应该在schema模式下正常展示', async () => {
    const screen = render(
      formilyWrapperWithSlotBySchemaFactory({ rowKey: 'key' }),
    )
    await expect
      .element(screen.getByText('description-1-title-1'))
      .toBeInTheDocument()
    await expect
      .element(screen.getByText('description-2-title-2'))
      .toBeInTheDocument()
  })

  it('应该在dataSource改变时同步更新显示内容', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({ rowKey: 'key', dataSource: [] }),
      {
        props: {
          form,
        },
      },
    )
    await expect
      .poll(() => screen.getByRole('table').getByRole('checkbox').elements())
      .toHaveLength(1)
    const field = form
      .query('selectTable')
      .take<ArrayField>((field: ArrayField) => field)
    field.setDataSource([
      { key: '4', name: 'title-4', description: 'description-4' },
    ])
    await expect
      .poll(() => screen.getByRole('table').getByRole('checkbox').elements())
      .toHaveLength(2)
    await expect.element(screen.getByText('title-4')).toBeInTheDocument()
    await expect.element(screen.getByText('description-4')).toBeInTheDocument()
  })
})

describe('多选框交互', async () => {
  it('应该在点击多选框后更新form表单值', async () => {
    const form = createForm()
    const screen = render(formilyWrapperFactory({ rowKey: 'key' }), {
      props: {
        form,
      },
    })
    await screen
      .getByRole('row', { name: 'title-1' })
      .getByRole('checkbox')
      .click()
    expect(form.query('selectTable').get('value')).toEqual(['1'])
    await screen
      .getByRole('row', { name: 'title-1' })
      .getByRole('checkbox')
      .click()
    expect(form.query('selectTable').get('value')).toEqual([])
  })

  it('应该在开启optionAsValue后form表单值为整行数据', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({ rowKey: 'key', optionAsValue: true }),
      {
        props: {
          form,
        },
      },
    )
    await screen
      .getByRole('row', { name: 'title-1' })
      .getByRole('checkbox')
      .click()
    expect(form.query('selectTable').get('value')).toEqual([
      {
        description: 'description-1',
        key: '1',
        name: 'title-1',
      },
    ])
    await screen
      .getByRole('row', { name: 'title-1' })
      .getByRole('checkbox')
      .click()
    expect(form.query('selectTable').get('value')).toEqual([])
  })

  it('应该支持多选框选择两项且可取消选择', async () => {
    const form = createForm()
    const screen = render(formilyWrapperFactory({ rowKey: 'key' }), {
      props: {
        form,
      },
    })
    await screen
      .getByRole('row', { name: 'title-1' })
      .getByRole('checkbox')
      .click()
    expect(form.query('selectTable').get('value')).toEqual(['1'])
    await screen
      .getByRole('row', { name: 'title-2' })
      .getByRole('checkbox')
      .click()
    expect(form.query('selectTable').get('value')).toEqual(['1', '2'])
    await screen
      .getByRole('row', { name: 'title-2' })
      .getByRole('checkbox')
      .click()
    expect(form.query('selectTable').get('value')).toEqual(['1'])
  })

  it('应该在dataSource改变后保持已选中项的勾选状态', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({
        rowKey: 'key',
        dataSource: [
          { key: '1', name: 'title-1', description: 'description-1' },
          { key: '2', name: 'title-2', description: 'description-2' },
          { key: '3', name: 'title-3', description: 'description-3' },
        ],
      }),
      {
        props: {
          form,
        },
      },
    )
    await screen
      .getByRole('row', { name: 'title-1' })
      .getByRole('checkbox')
      .click()
    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .toBeChecked()
    const field = form
      .query('selectTable')
      .take<ArrayField>((field: ArrayField) => field)
    field.setDataSource([
      { key: '4', name: 'title-4', description: 'description-4' },
    ])
    await screen
      .getByRole('row', { name: 'title-4' })
      .getByRole('checkbox')
      .click()
    field.setDataSource([
      { key: '1', name: 'title-1', description: 'description-1' },
    ])
    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .toBeChecked()
    field.setDataSource([
      { key: '1', name: 'title-1', description: 'description-1' },
      { key: '2', name: 'title-2', description: 'description-2' },
      { key: '4', name: 'title-4', description: 'description-4' },
    ])
    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .toBeChecked()
    await expect
      .element(
        screen.getByRole('row', { name: 'title-4' }).getByRole('checkbox'),
      )
      .toBeChecked()
  })

  it('应该在组件有默认值时正确勾选对应项', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({
        rowKey: 'key',
        initialValue: ['1'],
        dataSource: [
          { key: '1', name: 'title-1', description: 'description-1' },
          { key: '2', name: 'title-2', description: 'description-2' },
          { key: '3', name: 'title-3', description: 'description-3' },
        ],
      }),
      {
        props: {
          form,
        },
      },
    )
    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .toBeChecked()
  })

  it('应该点击行触发多选框选中事件', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({ rowKey: 'key', clickRowToSelect: true }),
      {
        props: { form },
      },
    )

    await screen.getByRole('row', { name: 'title-1' }).click()
    expect(form.query('selectTable').get('value')).toEqual(['1'])
    await screen.getByRole('row', { name: 'title-1' }).click()
    expect(form.query('selectTable').get('value')).toEqual([])
  })

  it('应该在关闭配置项后无法通过点击行触发多选框选中事件', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({ rowKey: 'key', clickRowToSelect: false }),
      {
        props: { form },
      },
    )
    await screen.getByRole('row', { name: 'title-1' }).click()
    expect(form.query('selectTable').get('value')).toEqual(undefined)
    await screen.getByRole('row', { name: 'title-1' }).click()
    expect(form.query('selectTable').get('value')).toEqual(undefined)
  })

  it('应该在多选时点击取消选择清空选中项', async () => {
    const form = createForm()
    const screen = render(formilyWrapperFactory({ rowKey: 'key' }), {
      props: { form },
    })
    // 点击第一行
    await screen.getByRole('row', { name: 'title-1' }).click()
    expect(form.query('selectTable').get('value')).toEqual(['1'])
    // 点击取消选择
    await screen.getByText('取消选择').click()
    expect(form.query('selectTable').get('value')).toEqual([])
  })

  it('应该在optionAsValue为true且有默认值时正确勾选', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({
        rowKey: 'key',
        initialValue: [{ key: '1' }, { key: '2' }],
        optionAsValue: true,
        dataSource: [
          { key: '1', name: 'title-1', description: 'description-1' },
          { key: '2', name: 'title-2', description: 'description-2' },
          { key: '3', name: 'title-3', description: 'description-3' },
        ],
      }),
      {
        props: {
          form,
        },
      },
    )
    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .toBeChecked()
  })

  it('应该在多选时form表单值改动后与选中项保持一致', async () => {
    const form = createForm()
    const screen = render(formilyWrapperFactory({ rowKey: 'key' }), {
      props: {
        form,
      },
    })
    form.setInitialValues({ selectTable: ['1'] })
    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .toBeChecked()
    form.setValues({ selectTable: ['2'] })
    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .not
      .toBeChecked()
    await expect
      .element(
        screen.getByRole('row', { name: 'title-2' }).getByRole('checkbox'),
      )
      .toBeChecked()
  })

  it('应该在表单值置空时取消原本选中的项', async () => {
    const form = createForm({
      initialValues: { selectTable: ['1'] },
    })
    const screen = render(formilyWrapperFactory({ rowKey: 'key' }), {
      props: {
        form,
      },
    })

    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .toBeChecked()
    form.setValues({ selectTable: [] })
    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .not
      .toBeChecked()
    const field = form
      .query('selectTable')
      .take<ArrayField>((field: ArrayField) => field)
    field.setDataSource([
      { key: '1', name: 'title-1', description: 'description-1' },
    ])
    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .toBeInTheDocument()
    await expect
      .element(
        screen.getByRole('row', { name: 'title-1' }).getByRole('checkbox'),
      )
      .not
      .toBeChecked()
  })

  it('should respect selectable option when disabling rows', async () => {
    const form = createForm()
    const selectable = vi.fn(row => row.key !== '2')
    const screen = render(
      formilyWrapperFactory(
        { rowKey: 'key' },
        { selectable },
      ),
      {
        props: {
          form,
        },
      },
    )

    await screen
      .getByRole('row', { name: 'title-1' })
      .getByRole('checkbox')
      .click()
    expect(form.query('selectTable').get('value')).toEqual(['1'])

    const disabledRow = screen.getByRole('row', { name: 'title-2' })
    const disabledCheckbox = disabledRow.getByRole('checkbox')

    await expect.element(disabledCheckbox).toBeDisabled()

    await disabledRow.click()
    expect(form.query('selectTable').get('value')).toEqual(['1'])
    expect(selectable).toHaveBeenCalled()
  })

  it('should sync selections when ignoreSelectable is true', async () => {
    const form = createForm()
    form.setInitialValues({ selectTable: ['2'] })
    const screen = render(
      formilyWrapperFactory(
        { rowKey: 'key' },
        {
          selectable: row => row.key !== '2',
          ignoreSelectable: true,
        },
      ),
      {
        props: {
          form,
        },
      },
    )

    await expect
      .element(
        screen.getByRole('row', { name: 'title-2' }).getByRole('checkbox'),
      )
      .toBeChecked()
  })

  it('should block syncing when ignoreSelectable is false', async () => {
    const form = createForm()
    form.setInitialValues({ selectTable: ['2'] })
    const screen = render(
      formilyWrapperFactory(
        { rowKey: 'key' },
        {
          selectable: row => row.key !== '2',
          ignoreSelectable: false,
        },
      ),
      {
        props: {
          form,
        },
      },
    )

    await expect
      .element(
        screen.getByRole('row', { name: 'title-2' }).getByRole('checkbox'),
      )
      .not
      .toBeChecked()
    expect(form.query('selectTable').get('value')).toEqual(['2'])
  })
})

describe('单选框交互', async () => {
  it('应该在点击单选框后更新form表单值', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({
        rowKey: 'key',
        mode: 'single',
        highlightCurrentRow: true,
      }),
      {
        props: {
          form,
        },
      },
    )
    await screen
      .getByRole('row', { name: 'title-1' })
      .getByRole('radio')
      .click()
    expect(form.query('selectTable').get('value')).toEqual('1')
    await screen
      .getByRole('row', { name: 'title-2' })
      .getByRole('radio')
      .click()
    expect(form.query('selectTable').get('value')).toEqual('2')
  })

  it('应该在单选模式下有默认值时正确勾选', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({
        rowKey: 'key',
        mode: 'single',
        initialValue: '1',
        dataSource: [
          { key: '1', name: 'title-1', description: 'description-1' },
          { key: '2', name: 'title-2', description: 'description-2' },
          { key: '3', name: 'title-3', description: 'description-3' },
        ],
      }),
      {
        props: {
          form,
        },
      },
    )
    await expect
      .element(screen.getByRole('row', { name: 'title-1' }).getByRole('radio'))
      .toBeChecked()
  })

  it('应该在单选模式下optionAsValue为true且有默认值时正确勾选', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({
        rowKey: 'key',
        mode: 'single',
        initialValue: { key: '1' },
        optionAsValue: true,
        dataSource: [
          { key: '1', name: 'title-1', description: 'description-1' },
          { key: '2', name: 'title-2', description: 'description-2' },
          { key: '3', name: 'title-3', description: 'description-3' },
        ],
      }),
      {
        props: {
          form,
        },
      },
    )
    await expect
      .element(screen.getByRole('row', { name: 'title-1' }).getByRole('radio'))
      .toBeChecked()
  })

  it('应该点击行触发单选框选中事件', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({
        rowKey: 'key',
        mode: 'single',
        clickRowToSelect: true,
      }),
      {
        props: { form },
      },
    )

    await screen.getByRole('row', { name: 'title-1' }).click()
    expect(form.query('selectTable').get('value')).toEqual('1')

    await screen.getByRole('row', { name: 'title-2' }).click()
    expect(form.query('selectTable').get('value')).toEqual('2')
  })

  it('应该在单选时点击取消选择清空选中项', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({ rowKey: 'key', mode: 'single' }),
      {
        props: { form },
      },
    )
    // 点击第一行
    await screen.getByRole('row', { name: 'title-1' }).click()
    expect(form.query('selectTable').get('value')).toEqual('1')
    // 点击取消选择
    await screen.getByText('取消选择').click()
    expect(form.query('selectTable').get('value')).toEqual(null)
  })

  it('应该在单选时form表单值改动后与选中项保持一致', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({ rowKey: 'key', mode: 'single' }),
      {
        props: {
          form,
        },
      },
    )
    form.setInitialValues({ selectTable: '1' })
    await expect
      .element(screen.getByRole('row', { name: 'title-1' }).getByRole('radio'))
      .toBeChecked()
    form.setValues({ selectTable: '2' })
    await expect
      .element(screen.getByRole('row', { name: 'title-2' }).getByRole('radio'))
      .toBeChecked()
  })
})

describe.skip('树形选择', async () => {
  it('应该在点击多选框后更新form表单值', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({
        rowKey: 'id',
        dataSource: [
          {
            id: 1,
            date: '2016-05-02',
            name: 'title-1',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            id: 2,
            date: '2016-05-04',
            name: 'title-2',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            id: 3,
            date: '2016-05-01',
            name: 'title-3',
            address: 'No. 189, Grove St, Los Angeles',
            children: [
              {
                id: 31,
                date: '2016-05-01',
                name: 'title-3-1',
                address: 'No. 189, Grove St, Los Angeles',
              },
              {
                id: 32,
                date: '2016-05-01',
                name: 'title-3-2',
                address: 'No. 189, Grove St, Los Angeles',
              },
            ],
          },
          {
            id: 4,
            date: '2016-05-03',
            name: 'title-4',
            address: 'No. 189, Grove St, Los Angeles',
          },
        ],
        treeProps: {
          checkStrictly: false,
        },
      }),
      {
        props: {
          form,
        },
      },
    )
    await screen
      .getByRole('row', { name: 'title-1' })
      .getByRole('checkbox')
      .click()
    expect(form.query('selectTable').get('value')).toEqual([1])
    await screen
      .getByRole('row', { name: 'title-3' })
      .getByRole('checkbox')
      .click()
    expect(form.query('selectTable').get('value')).toEqual([1, 3, 31, 32])
  })

  it('应该在开启checkStrictly后点击多选框时form表单值不联动', async () => {
    const form = createForm()
    const screen = render(
      formilyWrapperFactory({
        rowKey: 'id',
        dataSource: [
          {
            id: 1,
            date: '2016-05-02',
            name: 'title-1',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            id: 2,
            date: '2016-05-04',
            name: 'title-2',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            id: 3,
            date: '2016-05-01',
            name: 'title-3',
            address: 'No. 189, Grove St, Los Angeles',
            children: [
              {
                id: 31,
                date: '2016-05-01',
                name: 'title-3-1',
                address: 'No. 189, Grove St, Los Angeles',
              },
              {
                id: 32,
                date: '2016-05-01',
                name: 'title-3-2',
                address: 'No. 189, Grove St, Los Angeles',
              },
            ],
          },
          {
            id: 4,
            date: '2016-05-03',
            name: 'title-4',
            address: 'No. 189, Grove St, Los Angeles',
          },
        ],
        treeProps: {
          checkStrictly: true,
        },
      }),
      {
        props: {
          form,
        },
      },
    )
    await screen
      .getByRole('row', { name: 'title-3' })
      .getByRole('checkbox')
      .click()
    expect(form.query('selectTable').get('value')).toEqual([3])
  })
})
