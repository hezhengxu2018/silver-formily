import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { defineComponent } from 'vue'
import { ArrayCards, DatePicker, FormItem, Input } from '../../index'
import 'element-plus/theme-chalk/index.css'

export function ArrayCardsStringTestFactory(form = createForm()) {
  return defineComponent({
    name: 'ArrayCardsStringTest',
    setup() {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayCards,
        },
      })

      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'x-component': 'ArrayCards',
            'x-decorator': 'FormItem',
            'x-component-props': {
              title: '字符串数组',
            },
            'items': {
              type: 'void',
              properties: {
                index: {
                  'type': 'void',
                  'x-component': 'ArrayCards.Index',
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
                  'x-component': 'ArrayCards.Remove',
                },
                moveUp: {
                  'type': 'void',
                  'x-component': 'ArrayCards.MoveUp',
                },
                moveDown: {
                  'type': 'void',
                  'x-component': 'ArrayCards.MoveDown',
                },
              },
            },
            'properties': {
              addition: {
                'type': 'void',
                'title': '添加条目',
                'x-component': 'ArrayCards.Addition',
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

export const ArrayCardsObjectTest = defineComponent({
  name: 'ArrayCardsObjectTest',
  setup() {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        Input,
        ArrayCards,
      },
    })

    const form = createForm()
    const schema = {
      type: 'object',
      properties: {
        array: {
          'type': 'array',
          'x-component': 'ArrayCards',
          'x-decorator': 'FormItem',
          'x-component-props': {
            title: '对象数组',
          },
          'items': {
            type: 'object',
            properties: {
              index: {
                'type': 'void',
                'x-component': 'ArrayCards.Index',
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
                'x-component': 'ArrayCards.Remove',
              },
              moveUp: {
                'type': 'void',
                'x-component': 'ArrayCards.MoveUp',
              },
              moveDown: {
                'type': 'void',
                'x-component': 'ArrayCards.MoveDown',
              },
            },
          },
          'properties': {
            addition: {
              'type': 'void',
              'title': '添加条目',
              'x-component': 'ArrayCards.Addition',
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

function ArrayCardsWithArrayItemsTestFactory(form = createForm()) {
  return defineComponent({
    name: 'ArrayCardsWithArrayItemsTest',
    setup() {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          DatePicker,
          ArrayCards,
        },
      })

      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'x-component': 'ArrayCards',
            'x-decorator': 'FormItem',
            'x-component-props': {
              title: '字符串数组',
            },
            'items': [
              {
                type: 'void',
                title: '11111',
                properties: {
                  index: {
                    'type': 'void',
                    'x-component': 'ArrayCards.Index',
                  },
                  input: {
                    'type': 'string',
                    'x-decorator': 'FormItem',
                    'title': 'Input',
                    'x-component': 'Input',
                    'x-component-props': {
                      placeholder: '输入字符串',
                    },
                  },
                  remove: {
                    'type': 'void',
                    'x-component': 'ArrayCards.Remove',
                  },
                  moveUp: {
                    'type': 'void',
                    'x-component': 'ArrayCards.MoveUp',
                  },
                  moveDown: {
                    'type': 'void',
                    'x-component': 'ArrayCards.MoveDown',
                  },
                },
              },
              {
                type: 'void',
                title: '22222',
                properties: {
                  index: {
                    'type': 'void',
                    'x-component': 'ArrayCards.Index',
                  },
                  input: {
                    'type': 'string',
                    'x-decorator': 'FormItem',
                    'title': 'DatePicker',
                    'x-component': 'DatePicker',
                    'x-component-props': {
                      placeholder: '选择日期',
                    },
                  },
                  remove: {
                    'type': 'void',
                    'x-component': 'ArrayCards.Remove',
                  },
                },
              },
            ],
            'properties': {
              addition: {
                'type': 'void',
                'title': '添加条目',
                'x-component': 'ArrayCards.Addition',
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

describe('arrayCards', async () => {
  it('应该能使用字符串数组渲染', async () => {
    const screen = render(ArrayCardsStringTestFactory())
    await expect.element(screen.getByText('添加条目')).toBeInTheDocument()
    await screen.getByText('添加条目').click()
    await expect.element(screen.getByText('字符串数组')).toBeInTheDocument()
    const card = screen.container.querySelector('.el-card')
    expect(card).toBeInTheDocument()
  })

  it('应该能使用对象数组渲染', async () => {
    const screen = render(ArrayCardsObjectTest)
    await expect.element(screen.getByText('添加条目')).toBeInTheDocument()
    const empty = screen.container.querySelector('.el-empty')
    expect(empty).toBeInTheDocument()
    await screen.getByText('添加条目').click()
    await expect.element(screen.getByText('对象数组')).toBeInTheDocument()
  })

  it('应该支持添加条目功能', async () => {
    const screen = render(ArrayCardsStringTestFactory())
    await screen.getByText('添加条目').click()
    await expect.element(screen.getByText('字符串数组')).toBeInTheDocument()
  })

  it('应该支持添加多个条目', async () => {
    const screen = render(ArrayCardsObjectTest)
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()

    const inputs = screen.getByRole('textbox')
    expect(inputs.elements()).toHaveLength(3)

    const cards = screen.container.querySelectorAll('.el-card')
    expect(cards.length).toBe(3)
  })

  it('应该支持删除条目功能', async () => {
    const screen = render(ArrayCardsStringTestFactory())
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()
    let inputs = screen.getByRole('textbox')
    expect(inputs.elements()).toHaveLength(2)

    const removeButtons = screen.getByRole('button', { name: /移除条目/ })
    await removeButtons.nth(0).click()

    inputs = screen.getByRole('textbox')
    expect(inputs.elements()).toHaveLength(1)

    const cards = screen.container.querySelectorAll('.el-card')
    expect(cards.length).toBe(1)
  })

  it('应该支持上移下移功能', async () => {
    const screen = render(ArrayCardsObjectTest)
    await screen.getByText('添加条目').click()
    await screen.getByText('添加条目').click()

    const inputs = screen.getByRole('textbox')
    await inputs.nth(0).fill('第一项')
    await inputs.nth(1).fill('第二项')

    const moveDownButtons = screen.getByRole('button', { name: '下移条目', exact: true })
    await moveDownButtons.nth(0).click()

    const updatedInputs = screen.getByRole('textbox')
    await expect.element(updatedInputs.nth(0)).toHaveValue('第二项')
    await expect.element(updatedInputs.nth(1)).toHaveValue('第一项')

    const moveUpButtons = screen.getByRole('button', { name: /上移/ })
    await moveUpButtons.nth(1).click()

    const finalInputs = screen.getByRole('textbox')
    await expect.element(finalInputs.nth(0)).toHaveValue('第一项')
    await expect.element(finalInputs.nth(1)).toHaveValue('第二项')
  })

  it('应该表单数据同步', async () => {
    const form = createForm()
    const screen = render(ArrayCardsStringTestFactory(form))

    expect(form.values.string_array).toHaveLength(0)

    await screen.getByText('添加条目').click()
    expect(form.values.string_array).toHaveLength(1)

    const input = screen.getByRole('textbox')
    await input.fill('测试数据')

    expect(form.values.string_array[0]).toBe('测试数据')

    const removeButton = screen.getByRole('button', { name: /移除条目/ })
    await removeButton.click()

    expect(form.values.string_array).toHaveLength(0)
  })

  it('应该items为数组时按顺序渲染不同控件', async () => {
    const form = createForm({
      initialValues: {
        string_array: ['', ''],
      },
    })
    const screen = render(ArrayCardsWithArrayItemsTestFactory(form))

    await expect.element(screen.getByPlaceholder('输入字符串')).toBeInTheDocument()
    await expect.element(screen.getByPlaceholder('选择日期')).toBeInTheDocument()

    await screen.getByText('添加条目').click()
    expect(screen.getByPlaceholder('输入字符串').elements()).toHaveLength(2)
  })

  it('应该支持items数组格式的递归渲染', async () => {
    const screen = render(ArrayCardsWithArrayItemsTestFactory())

    await screen.getByText('添加条目').click()
    await expect.element(screen.getByPlaceholder('输入字符串')).toBeInTheDocument()

    await screen.getByText('添加条目').click()
    await expect.element(screen.getByPlaceholder('选择日期')).toBeInTheDocument()

    await screen.getByText('添加条目').click()
    expect(screen.getByPlaceholder('输入字符串').elements()).toHaveLength(2)

    const cards = screen.container.querySelectorAll('.el-card')
    expect(cards.length).toBe(3)
  })
})
