import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { defineComponent } from 'vue'
import { ArrayTable, Editable, FormItem, Input, Space } from '../../index'
import 'element-plus/theme-chalk/index.css'

// JSON Schema 测试组件
export function ArrayTableJSONSchemaTestFactory(form = createForm()) {
  return defineComponent({
    name: 'ArrayTableJSONSchemaTest',
    setup() {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          ArrayTable,
          Input,
          Editable,
          Space,
        },
      })

      const schema = {
        type: 'object',
        properties: {
          array: {
            'type': 'array',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayTable',
            'items': {
              type: 'object',
              properties: {
                column1: {
                  'type': 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    width: 80,
                    title: 'Index',
                    align: 'center',
                  },
                  'properties': {
                    index: {
                      'type': 'void',
                      'x-component': 'ArrayTable.Index',
                    },
                  },
                },
                column2: {
                  'type': 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': { width: 200, title: 'A1' },
                  'properties': {
                    a1: {
                      'type': 'string',
                      'x-decorator': 'Editable',
                      'x-component': 'Input',
                    },
                  },
                },
                column3: {
                  'type': 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': { width: 200, title: 'A2' },
                  'properties': {
                    a2: {
                      'type': 'string',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                    },
                  },
                },
                column4: {
                  'type': 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    title: 'Operations',
                    prop: 'operations',
                    width: 200,
                    fixed: 'right',
                  },
                  'properties': {
                    item: {
                      'type': 'void',
                      'x-component': 'FormItem',
                      'properties': {
                        space: {
                          'type': 'void',
                          'x-component': 'Space',
                          'x-component-props': {
                            style: 'height: 100%',
                          },
                          'properties': {
                            remove: {
                              'type': 'void',
                              'x-component': 'ArrayTable.Remove',
                            },
                            moveDown: {
                              'type': 'void',
                              'x-component': 'ArrayTable.MoveDown',
                            },
                            moveUp: {
                              'type': 'void',
                              'x-component': 'ArrayTable.MoveUp',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            'properties': {
              add: {
                'type': 'void',
                'x-component': 'ArrayTable.Addition',
                'title': '添加条目',
              },
            },
          },
        },
      }

      return () => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      )
    },
  })
}

// Markup Schema 测试组件
export const ArrayTableMarkupSchemaTest = defineComponent({
  name: 'ArrayTableMarkupSchemaTest',
  setup() {
    const {
      SchemaField,
      SchemaArrayField,
      SchemaObjectField,
      SchemaVoidField,
      SchemaStringField,
    } = createSchemaField({
      components: {
        FormItem,
        ArrayTable,
        Input,
        Editable,
        Space,
      },
    })

    const form = createForm()

    return () => (
      <FormProvider form={form}>
        <SchemaField>
          <SchemaArrayField
            name="array"
            x-decorator="FormItem"
            x-component="ArrayTable"
            x-component-props={{
              stripe: true,
              paginationProps: { pageSize: 10 },
            }}
          >
            <SchemaObjectField>
              <SchemaVoidField
                x-component="ArrayTable.Column"
                x-component-props={{ width: 80, title: 'Index' }}
              >
                <SchemaVoidField
                  x-decorator="FormItem"
                  x-component="ArrayTable.Index"
                />
              </SchemaVoidField>
              <SchemaVoidField
                x-component="ArrayTable.Column"
                x-component-props={{ prop: 'a1', title: 'A1', width: 200 }}
              >
                <SchemaStringField
                  x-decorator="Editable"
                  name="a1"
                  x-component="Input"
                />
              </SchemaVoidField>
              <SchemaVoidField
                x-component="ArrayTable.Column"
                x-component-props={{ title: 'A2', width: 200 }}
              >
                <SchemaStringField
                  x-decorator="FormItem"
                  x-decorator-props={{
                    feedbackLayout: 'popover',
                  }}
                  name="a2"
                  required={true}
                  x-component="Input"
                />
              </SchemaVoidField>
              <SchemaVoidField
                x-component="ArrayTable.Column"
                x-component-props={{
                  title: 'Operations',
                  prop: 'operations',
                  width: 200,
                  fixed: 'right',
                }}
              >
                <SchemaVoidField x-component="FormItem">
                  <SchemaVoidField x-component="Space" x-component-props={{ style: 'height: 100%' }}>
                    <SchemaVoidField x-component="ArrayTable.Remove" />
                    <SchemaVoidField x-component="ArrayTable.MoveUp" />
                    <SchemaVoidField x-component="ArrayTable.MoveDown" />
                  </SchemaVoidField>
                </SchemaVoidField>
              </SchemaVoidField>
            </SchemaObjectField>
            <SchemaVoidField x-component="ArrayTable.Addition" x-component-props={{ defaultValue: { a1: null, a2: '', a3: '' } }} title="添加条目" />
          </SchemaArrayField>
        </SchemaField>
      </FormProvider>
    )
  },
})

// 带分页的测试组件
export const ArrayTableWithPaginationTest = defineComponent({
  name: 'ArrayTableWithPaginationTest',
  setup() {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        ArrayTable,
        Input,
        Editable,
        Space,
      },
    })

    const form = createForm({
      initialValues: {
        array: Array.from({ length: 15 }, (_, i) => ({ a1: `Item ${i + 1}` })),
      },
    })

    const schema = {
      type: 'object',
      properties: {
        array: {
          'type': 'array',
          'x-decorator': 'FormItem',
          'x-component': 'ArrayTable',
          'x-component-props': {
            paginationProps: {
              pageSize: 5,
              pageSizes: [5, 10, 15, 20],
              background: false,
              size: 'small',
            },
          },
          'items': {
            type: 'object',
            properties: {
              column1: {
                'type': 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': {
                  width: 80,
                  title: 'Index',
                  align: 'center',
                },
                'properties': {
                  index: {
                    'type': 'void',
                    'x-component': 'ArrayTable.Index',
                  },
                },
              },
              column2: {
                'type': 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': { title: 'A1' },
                'properties': {
                  a1: {
                    'type': 'string',
                    'x-decorator': 'Editable',
                    'x-component': 'Input',
                  },
                },
              },
              column3: {
                'type': 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': {
                  title: 'Operations',
                  prop: 'operations',
                  width: 200,
                  fixed: 'right',
                },
                'properties': {
                  item: {
                    'type': 'void',
                    'x-component': 'FormItem',
                    'properties': {
                      space: {
                        'type': 'void',
                        'x-component': 'Space',
                        'x-component-props': {
                          style: 'height: 100%',
                        },
                        'properties': {
                          remove: {
                            'type': 'void',
                            'x-component': 'ArrayTable.Remove',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          'properties': {
            add: {
              'type': 'void',
              'x-component': 'ArrayTable.Addition',
              'title': '添加条目',
            },
          },
        },
      },
    }

    return () => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    )
  },
})

// 无分页的测试组件
export const ArrayTableNoPaginationTest = defineComponent({
  name: 'ArrayTableNoPaginationTest',
  props: {
    form: {
      type: Object,
      default: () => createForm(),
    },
  },
  setup(props) {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        ArrayTable,
        Input,
        Editable,
        Space,
      },
    })

    const schema = {
      type: 'object',
      properties: {
        array: {
          'type': 'array',
          'x-decorator': 'FormItem',
          'x-component': 'ArrayTable',
          'x-component-props': {
            pagination: false,
            height: 300,
          },
          'items': {
            type: 'object',
            properties: {
              sortHandle: {
                'type': 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': { title: '' },
                'properties': {
                  sortHandle: {
                    'type': 'void',
                    'x-component': 'ArrayTable.SortHandle',
                  },
                },
              },
              column1: {
                'type': 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': { title: 'A1' },
                'properties': {
                  a1: {
                    'type': 'string',
                    'x-decorator': 'Editable',
                    'x-component': 'Input',
                  },
                },
              },
              column2: {
                'type': 'void',
                'x-component': 'ArrayTable.Column',
                'x-component-props': {
                  title: 'Operations',
                  prop: 'operations',
                  width: 200,
                },
                'properties': {
                  item: {
                    'type': 'void',
                    'x-component': 'FormItem',
                    'properties': {
                      space: {
                        'type': 'void',
                        'x-component': 'Space',
                        'properties': {
                          remove: {
                            'type': 'void',
                            'x-component': 'ArrayTable.Remove',
                          },
                          moveUp: {
                            'type': 'void',
                            'x-component': 'ArrayTable.MoveUp',
                          },
                          moveDown: {
                            'type': 'void',
                            'x-component': 'ArrayTable.MoveDown',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          'properties': {
            add: {
              'type': 'void',
              'x-component': 'ArrayTable.Addition',
              'title': '添加条目',
            },
          },
        },
      },
    }

    return () => (
      <FormProvider form={props.form}>
        <SchemaField schema={schema} />
      </FormProvider>
    )
  },
})

describe('arrayTable', async () => {
  it('应该渲染', async () => {
    const screen = render(ArrayTableJSONSchemaTestFactory())
    await expect.element(screen.container.querySelector('.formily-element-plus-array-table')).toBeInTheDocument()
  })

  it('应该支持添加条目功能', async () => {
    const screen = render(ArrayTableJSONSchemaTestFactory())

    // 初始状态应该没有数据行
    const initialRows = screen.container.querySelectorAll('.el-table__row')
    expect(initialRows).toHaveLength(0)
    const addItemButton = screen.container.querySelector('.formily-element-plus-array-base-addition')
    await userEvent.click(addItemButton)
    const rows = screen.container.querySelectorAll('.el-table__row')
    expect(rows).toHaveLength(1)
  })

  it('应该支持拖拽功能', async () => {
    const form = createForm({
      initialValues: {
        array: [{ a1: '一' }, { a1: '二' }, { a1: '三' }],
      },
    })
    const screen = render(ArrayTableNoPaginationTest, {
      props: {
        form,
      },
      global: {
        stubs: {
          Transition: false,
          TransitionGroup: false,
        },
      },
    })

    await vi.waitFor(() => {
      expect(screen.container.querySelectorAll('.formily-element-plus-array-base-sort-handle')).toHaveLength(3)
    })
    const dragHandles = screen.container.querySelectorAll('.formily-element-plus-array-base-sort-handle')
    await userEvent.dragAndDrop(dragHandles[0], dragHandles[2])

    // // 验证拖拽后数据顺序
    await vi.waitFor(() => {
      expect(form.values.array).toEqual([
        { a1: '二' },
        { a1: '三' },
        { a1: '一' },
      ])
    })
  })

  it('应该支持分页功能', async () => {
    const screen = render(ArrayTableWithPaginationTest, {
      global: {
        stubs: {
          Transition: false,
          TransitionGroup: false,
        },
      },
    })
    await vi.waitFor(() => {
      expect(screen.container.querySelector('.el-pagination')).toBeInTheDocument()
      expect(screen.container.querySelector('.el-pagination__total').innerHTML.includes('15'))
    })

    // 检查当前页只显示5条数据（pageSize=5）
    await vi.waitFor(() => {
      const rows = screen.container.querySelectorAll('.el-table__row')
      expect(rows).toHaveLength(5)
    })

    // 点击下一页
    const nextButton = screen.container.querySelector('.btn-next')
    await userEvent.click(nextButton)

    // 验证页面切换后仍有数据
    await vi.waitFor(() => {
      const rows = screen.container.querySelectorAll('.el-table__row')
      expect(rows).toHaveLength(5)
    })

    // 验证页面切换后仍有数据
    await vi.waitFor(async () => {
      const pageSizeSelecter = screen.container.querySelector('.el-select')
      await userEvent.click(pageSizeSelecter)
      const lastLabel = document.querySelector('.el-select-dropdown__item:last-child')
      await userEvent.click(lastLabel)
      const rows = screen.container.querySelectorAll('.el-table__row')
      expect(rows).toHaveLength(15)
      expect(document.querySelectorAll('.el-pager li')).toHaveLength(1)
    })
  })

  it('应该在无分页模式下渲染所有数据', async () => {
    const form = createForm({
      initialValues: {
        array: Array.from({ length: 15 }, (_, i) => ({ a1: `Item ${i + 1}` })),
      },
    })
    const screen = render(ArrayTableNoPaginationTest, {
      props: {
        form,
      },
    })

    await vi.waitFor(() => {
      const rows = screen.container.querySelectorAll('.el-table__row')
      expect(rows).toHaveLength(15)
    })

    expect(screen.container.querySelector('.el-pagination')).toBeNull()

    // 检查所有数据都显示
    await vi.waitFor(() => {
      const rows = screen.container.querySelectorAll('.el-table__row')
      expect(rows).toHaveLength(15)
    })

    const addItemButton = screen.container.querySelector('.formily-element-plus-array-base-addition')
    await userEvent.click(addItemButton)
  })

  it('应该表格属性继承', async () => {
    const screen = render(ArrayTableMarkupSchemaTest)
    await userEvent.click(screen.container.querySelector('.formily-element-plus-array-base-addition'))
    await userEvent.click(screen.container.querySelector('.formily-element-plus-array-base-addition'))

    // 检查表格是否有条纹样式
    await vi.waitFor(() => {
      const table = screen.container.querySelector('.el-table--striped')
      expect(table).toBeInTheDocument()
    })
  })
})
