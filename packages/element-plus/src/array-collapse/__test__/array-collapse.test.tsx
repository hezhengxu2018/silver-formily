import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { defineComponent } from 'vue'
import { ArrayCollapse, FormItem, Input, Submit } from '../../index'
import 'element-plus/theme-chalk/index.css'

// 字符串数组测试组件
export function ArrayCollapseStringTestFactory(form = createForm()) {
  return defineComponent({
    name: 'ArrayCollapseStringTest',
    setup() {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayCollapse,
        },
      })

      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'x-component': 'ArrayCollapse',
            'maxItems': 3,
            'x-decorator': 'FormItem',
            'items': {
              'type': 'object',
              'x-component': 'ArrayCollapse.Item',
              'x-component-props': {
                title: '字符串数组',
              },
              'properties': {
                index: {
                  'type': 'void',
                  'x-component': 'ArrayCollapse.Index',
                },
                input: {
                  'type': 'string',
                  'x-decorator': 'FormItem',
                  'title': 'Input',
                  'required': true,
                  'x-component': 'Input',
                },
                remove: {
                  'type': 'void',
                  'x-component': 'ArrayCollapse.Remove',
                },
                moveUp: {
                  'type': 'void',
                  'x-component': 'ArrayCollapse.MoveUp',
                },
                moveDown: {
                  'type': 'void',
                  'x-component': 'ArrayCollapse.MoveDown',
                },
              },
            },
            'properties': {
              addition: {
                'type': 'void',
                'title': '添加条目',
                'x-component': 'ArrayCollapse.Addition',
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

// 对象数组测试组件
export const ArrayCollapseObjectTest = defineComponent({
  name: 'ArrayCollapseObjectTest',
  setup() {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        Input,
        ArrayCollapse,
      },
    })

    const form = createForm()
    const schema = {
      type: 'object',
      properties: {
        array: {
          'type': 'array',
          'x-component': 'ArrayCollapse',
          'maxItems': 3,
          'x-decorator': 'FormItem',
          'items': {
            'type': 'object',
            'x-component': 'ArrayCollapse.Item',
            'x-component-props': {
              title: '对象数组',
            },
            'properties': {
              index: {
                'type': 'void',
                'x-component': 'ArrayCollapse.Index',
              },
              input: {
                'type': 'string',
                'x-decorator': 'FormItem',
                'title': 'Input',
                'required': true,
                'x-component': 'Input',
              },
              remove: {
                'type': 'void',
                'x-component': 'ArrayCollapse.Remove',
              },
              moveUp: {
                'type': 'void',
                'x-component': 'ArrayCollapse.MoveUp',
              },
              moveDown: {
                'type': 'void',
                'x-component': 'ArrayCollapse.MoveDown',
              },
            },
          },
          'properties': {
            addition: {
              'type': 'void',
              'title': '添加条目',
              'x-component': 'ArrayCollapse.Addition',
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

// 测试unshift添加方法
export const ArrayCollapseUnshiftTest = defineComponent({
  name: 'ArrayCollapseUnshiftTest',
  setup() {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        Input,
        ArrayCollapse,
      },
    })

    const form = createForm()
    const schema = {
      type: 'object',
      properties: {
        array_unshift: {
          'type': 'array',
          'x-component': 'ArrayCollapse',
          'maxItems': 3,
          'x-decorator': 'FormItem',
          'items': {
            'type': 'object',
            'x-component': 'ArrayCollapse.Item',
            'x-component-props': {
              title: '对象数组',
            },
            'properties': {
              index: {
                'type': 'void',
                'x-component': 'ArrayCollapse.Index',
              },
              input: {
                'type': 'string',
                'x-decorator': 'FormItem',
                'title': 'Input',
                'required': true,
                'x-component': 'Input',
              },
              remove: {
                'type': 'void',
                'x-component': 'ArrayCollapse.Remove',
              },
              moveUp: {
                'type': 'void',
                'x-component': 'ArrayCollapse.MoveUp',
              },
              moveDown: {
                'type': 'void',
                'x-component': 'ArrayCollapse.MoveDown',
              },
            },
          },
          'properties': {
            addition: {
              'type': 'void',
              'title': '添加条目(unshift)',
              'x-component': 'ArrayCollapse.Addition',
              'x-component-props': {
                method: 'unshift',
              },
            },
          },
        },
      },
    }

    return () => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
        <Submit onSubmit={console.error}>提交</Submit>
      </FormProvider>
    )
  },
})

// 测试默认展开面板数量
export function ArrayCollapseDefaultOpenTest(form = createForm()) {
  return defineComponent({
    name: 'ArrayCollapseDefaultOpenTest',
    setup() {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayCollapse,
        },
      })

      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'x-component': 'ArrayCollapse',
            'x-component-props': {
              defaultOpenPanelCount: 2,
            },
            'x-decorator': 'FormItem',
            'items': {
              'type': 'object',
              'x-component': 'ArrayCollapse.Item',
              'x-component-props': {
                title: '字符串数组',
              },
              'properties': {
                index: {
                  'type': 'void',
                  'x-component': 'ArrayCollapse.Index',
                },
                input: {
                  'type': 'string',
                  'x-decorator': 'FormItem',
                  'title': 'Input',
                  'required': true,
                  'x-component': 'Input',
                },
                remove: {
                  'type': 'void',
                  'x-component': 'ArrayCollapse.Remove',
                },
              },
            },
            'properties': {
              addition: {
                'type': 'void',
                'title': '添加条目',
                'x-component': 'ArrayCollapse.Addition',
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

describe('arrayCollapse', async () => {
  it('应该字符串数组渲染', async () => {
    const screen = render(ArrayCollapseStringTestFactory())
    await expect.element(screen.getByText('添加条目')).toBeInTheDocument()
    await screen.getByText('添加条目').click()
    await expect.element(screen.getByText('字符串数组')).toBeInTheDocument()
  })

  it('应该对象数组渲染', async () => {
    const screen = render(ArrayCollapseObjectTest)
    await expect.element(screen.getByText('添加条目')).toBeInTheDocument()
    await screen.getByText('添加条目').click()
    await expect.element(screen.getByText('对象数组')).toBeInTheDocument()
  })

  it('应该支持添加条目功能', async () => {
    const screen = render(ArrayCollapseStringTestFactory())
    await screen.getByText('添加条目').click()
    await expect.element(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('应该支持添加多个条目', async () => {
    const screen = render(ArrayCollapseObjectTest)
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()

    const inputs = screen.getByRole('textbox')
    expect(inputs.elements()).toHaveLength(3)
  })

  it('应该支持删除条目功能', async () => {
    const screen = render(ArrayCollapseStringTestFactory())
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()
    let inputs = screen.getByRole('textbox')
    expect(inputs.elements()).toHaveLength(2)

    const removeButtons = screen.getByRole('button', { name: /移除条目/ })
    await removeButtons.nth(0).click()

    inputs = screen.getByRole('textbox')
    expect(inputs.elements()).toHaveLength(1)
  })

  it('应该支持上移下移功能', async () => {
    const form = createForm()
    const screen = render(ArrayCollapseStringTestFactory(form))
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()

    const inputs = screen.getByRole('textbox')
    await inputs.nth(0).fill('第一项')
    await inputs.nth(1).fill('第二项')

    const moveDownButtons = screen.getByRole('button', { name: '下移条目', exact: true })
    await moveDownButtons.nth(0).click()

    expect(form.values.string_array[0].input).toEqual('第二项')
    expect(form.values.string_array[1].input).toEqual('第一项')

    const moveUpButtons = screen.getByRole('button', { name: '上移条目', exact: true })
    await moveUpButtons.nth(1).click()
    expect(form.values.string_array[0].input).toEqual('第一项')
    expect(form.values.string_array[1].input).toEqual('第二项')
  })

  it('应该unshift添加方法', async () => {
    const form = createForm()
    const screen = render(ArrayCollapseUnshiftTest, { props: { form } })
    await screen.getByText('添加条目(unshift)').click()
    await screen.getByText('添加条目(unshift)').click()

    const inputs = screen.getByRole('textbox')
    await inputs.nth(0).fill('第一项')
    await inputs.nth(1).fill('第二项')

    await screen.getByText('添加条目(unshift)').click()

    expect(form.values.array_unshift.length).toBe(3)

    await screen.getByRole('textbox').nth(0).fill('第三项')

    await vi.waitFor(() => {
      expect(form.values.array_unshift[0].input).toBe('第三项')
      expect(form.values.array_unshift[1].input).toBe('第一项')
      expect(form.values.array_unshift[2].input).toBe('第二项')
    })
  })

  it('应该支持默认展开面板数量', async () => {
    const form = createForm({
      initialValues: {
        string_array: [
          { input: '第一项' },
          { input: '第二项' },
          { input: '第三项' },
        ],
      },
    })
    const screen = render(ArrayCollapseDefaultOpenTest(form))
    const collapseItems = screen.container.querySelectorAll('.el-collapse-item__header.is-active')
    expect(collapseItems.length).toBe(2)
  })

  it('应该支持折叠/展开功能', async () => {
    const screen = render(ArrayCollapseStringTestFactory())
    await screen.getByText('添加条目').click()

    // 验证面板是展开的
    let collapseItem = screen.container.querySelector('.el-collapse-item__header.is-active')
    expect(collapseItem).toBeInTheDocument()
    await screen.getByText('字符串数组').click()
    await vi.waitFor(() => {
      collapseItem = screen.container.querySelector('.el-collapse-item__header.is-active')
      expect(collapseItem).not.toBeInTheDocument()
    })
  })

  it('应该在非手风琴模式下 defaultOpenPanelCount 与数据源长度的联动', async () => {
    const formLess = createForm({
      initialValues: {
        string_array: [
          { input: '第一项' },
          { input: '第二项' },
        ],
      },
    })

    const screenLess = render(defineComponent({
      name: 'ArrayCollapseDefaultOpenLessTest',
      setup() {
        const { SchemaField } = createSchemaField({
          components: {
            FormItem,
            Input,
            ArrayCollapse,
          },
        })

        const schema = {
          type: 'object',
          properties: {
            string_array: {
              'type': 'array',
              'x-component': 'ArrayCollapse',
              'x-component-props': {
                defaultOpenPanelCount: 3, // 设置为3，大于数据源长度2
              },
              'x-decorator': 'FormItem',
              'items': {
                'type': 'object',
                'x-component': 'ArrayCollapse.Item',
                'x-component-props': {
                  title: '字符串数组',
                },
                'properties': {
                  index: {
                    'type': 'void',
                    'x-component': 'ArrayCollapse.Index',
                  },
                  input: {
                    'type': 'string',
                    'x-decorator': 'FormItem',
                    'title': 'Input',
                    'required': true,
                    'x-component': 'Input',
                  },
                  remove: {
                    'type': 'void',
                    'x-component': 'ArrayCollapse.Remove',
                  },
                },
              },
            },
          },
        }

        return () => (
          <FormProvider form={formLess}>
            <SchemaField schema={schema} />
          </FormProvider>
        )
      },
    }))

    // 验证所有面板都展开（数据源长度为2，小于defaultOpenPanelCount=3）
    const collapseItemsLess = screenLess.container.querySelectorAll('.el-collapse-item__header.is-active')
    expect(collapseItemsLess.length).toBe(2) // 应该有2个展开的面板

    // 测试数据源长度大于 defaultOpenPanelCount 的情况
    const formMore = createForm({
      initialValues: {
        string_array: [
          { input: '第一项' },
          { input: '第二项' },
          { input: '第三项' },
          { input: '第四项' },
          { input: '第五项' },
        ],
      },
    })

    const screenMore = render(defineComponent({
      name: 'ArrayCollapseDefaultOpenMoreTest',
      setup() {
        const { SchemaField } = createSchemaField({
          components: {
            FormItem,
            Input,
            ArrayCollapse,
          },
        })

        const schema = {
          type: 'object',
          properties: {
            string_array: {
              'type': 'array',
              'x-component': 'ArrayCollapse',
              'x-component-props': {
                defaultOpenPanelCount: 3, // 设置为3，小于数据源长度5
              },
              'x-decorator': 'FormItem',
              'items': {
                'type': 'object',
                'x-component': 'ArrayCollapse.Item',
                'x-component-props': {
                  title: '字符串数组',
                },
                'properties': {
                  index: {
                    'type': 'void',
                    'x-component': 'ArrayCollapse.Index',
                  },
                  input: {
                    'type': 'string',
                    'x-decorator': 'FormItem',
                    'title': 'Input',
                    'required': true,
                    'x-component': 'Input',
                  },
                  remove: {
                    'type': 'void',
                    'x-component': 'ArrayCollapse.Remove',
                  },
                },
              },
            },
          },
        }

        return () => (
          <FormProvider form={formMore}>
            <SchemaField schema={schema} />
          </FormProvider>
        )
      },
    }))

    // 验证只有前3个面板展开（数据源长度为5，大于defaultOpenPanelCount=3）
    const collapseItemsMore = screenMore.container.querySelectorAll('.el-collapse-item__header.is-active')
    expect(collapseItemsMore.length).toBe(3) // 应该有3个展开的面板
  })
})

// 测试手风琴模式
it('应该在手风琴模式下的面板展开行为', async () => {
  // 创建带有初始值的表单
  const form = createForm({
    initialValues: {
      string_array: [
        { input: '第一项' },
        { input: '第二项' },
        { input: '第三项' },
      ],
    },
  })

  const screen = render(defineComponent({
    name: 'ArrayCollapseAccordionTest',
    setup() {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayCollapse,
        },
      })

      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'x-component': 'ArrayCollapse',
            'x-component-props': {
              accordion: true,
              defaultOpenPanelCount: 3, // 即使设置了较大的默认展开数，在手风琴模式下也只会展开一个
            },
            'x-decorator': 'FormItem',
            'items': {
              'type': 'object',
              'x-component': 'ArrayCollapse.Item',
              'x-component-props': {
                title: '字符串数组',
              },
              'properties': {
                index: {
                  'type': 'void',
                  'x-component': 'ArrayCollapse.Index',
                },
                input: {
                  'type': 'string',
                  'x-decorator': 'FormItem',
                  'title': 'Input',
                  'required': true,
                  'x-component': 'Input',
                },
                remove: {
                  'type': 'void',
                  'x-component': 'ArrayCollapse.Remove',
                },
              },
            },
            'properties': {
              addition: {
                'type': 'void',
                'title': '添加条目',
                'x-component': 'ArrayCollapse.Addition',
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
  }))

  // 验证初始状态只有第一个面板展开
  const collapseItems = screen.container.querySelectorAll('.el-collapse-item__header.is-active')
  expect(collapseItems.length).toBe(1)

  // 点击第二个面板标题
  const panelHeaders = screen.container.querySelectorAll('.el-collapse-item__header')
  await userEvent.click(panelHeaders[1])

  // 验证只有第二个面板展开
  await vi.waitFor(() => {
    const activeItems = screen.container.querySelectorAll('.el-collapse-item__header.is-active')
    expect(activeItems.length).toBe(1)
  })

  // 添加新面板
  await screen.getByText('添加条目').click()

  // 验证只有新添加的面板（第四个）展开
  await vi.waitFor(() => {
    const activeItems = screen.container.querySelectorAll('.el-collapse-item__header.is-active')
    expect(activeItems.length).toBe(1)
  })
})
