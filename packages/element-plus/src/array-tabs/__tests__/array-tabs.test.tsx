import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { ArrayTabs, DatePicker, FormItem, Input } from '../../index'
import 'element-plus/theme-chalk/index.css'

// 添加新的测试工厂函数
function ArrayTabsWithArrayItemsTestFactory(form = createForm()) {
  return () => {
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        Input,
        DatePicker,
        ArrayTabs,
      },
    })

    const schema = {
      type: 'object',
      properties: {
        string_array: {
          'type': 'array',
          'title': '字符串数组',
          'x-decorator': 'FormItem',
          'x-component': 'ArrayTabs',
          'items': [
            {
              'type': 'string',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '输入字符串',
              },
            },
            {
              'type': 'string',
              'x-decorator': 'FormItem',
              'x-component': 'DatePicker',
              'x-component-props': {
                placeholder: '选择日期',
              },
            },
          ],
        },
      },
    }

    return (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    )
  }
}

describe('arrayTabs', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayTabs,
        },
      })

      const form = createForm()
      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'title': '字符串数组',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayTabs',
            'items': {
              'type': 'string',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
          },
        },
      }

      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      ))

      // 验证组件正常渲染
      await expect.element(container.querySelector('.formily-element-plus-array-tabs')).toBeInTheDocument()
      await expect.element(getByText('字符串数组 1')).toBeInTheDocument()
    })

    it('应该支持字符串数组输入', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayTabs,
        },
      })

      const form = createForm()
      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'title': '字符串数组',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayTabs',
            'items': {
              'type': 'string',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
          },
        },
      }

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      ))

      // 输入文本并验证表单值
      await getByRole('textbox').fill('测试文本')
      expect(form.values.string_array).toEqual(['测试文本'])
    })

    it('应该支持对象数组输入', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayTabs,
        },
      })

      const form = createForm()
      const schema = {
        type: 'object',
        properties: {
          array: {
            'type': 'array',
            'title': '对象数组',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayTabs',
            'items': {
              type: 'object',
              properties: {
                aaa: {
                  'type': 'string',
                  'x-decorator': 'FormItem',
                  'title': 'AAA',
                  'required': true,
                  'x-component': 'Input',
                },
                bbb: {
                  'type': 'string',
                  'x-decorator': 'FormItem',
                  'title': 'BBB',
                  'required': true,
                  'x-component': 'Input',
                },
              },
            },
          },
        },
      }

      const { getByLabelText, getByText } = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      ))

      // 验证对象数组的字段正确渲染
      await expect.element(getByText('AAA')).toBeInTheDocument()
      await expect.element(getByText('BBB')).toBeInTheDocument()

      await getByLabelText('AAA').fill('AAA值')
      await getByLabelText('BBB').fill('BBB值')

      expect(form.values.array).toEqual([{
        aaa: 'AAA值',
        bbb: 'BBB值',
      }])
    })
  })

  describe('交互功能', () => {
    it('应该支持添加新标签页', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayTabs,
        },
      })

      const form = createForm()
      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'title': '字符串数组',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayTabs',
            'items': {
              'type': 'string',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
          },
        },
      }

      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      ))

      // 点击添加按钮
      const addButton = container.querySelector('.el-tabs__new-tab')
      await userEvent.click(addButton)

      // 验证新标签页已添加
      await expect.element(getByText('字符串数组 2')).toBeInTheDocument()
      expect(form.values.string_array.length).toBe(2)
    })

    it('应该支持删除标签页', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayTabs,
        },
      })

      const form = createForm()
      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'title': '字符串数组',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayTabs',
            'items': {
              'type': 'string',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
          },
        },
      }

      const { container } = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      ))

      // 先添加一个新标签页
      const addButton = container.querySelector('.el-tabs__new-tab')
      await userEvent.click(addButton)

      // 获取关闭按钮并点击
      const closeButtons = container.querySelectorAll('.is-icon-close')
      await userEvent.click(closeButtons[0])

      expect(form.values.string_array.length).toBe(1)
    })

    it('应该支持切换标签页', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayTabs,
        },
      })

      const form = createForm()
      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'title': '字符串数组',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayTabs',
            'items': {
              'type': 'string',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
          },
        },
      }

      const { container, getByRole } = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      ))
      // 在第一个标签页输入内容
      await getByRole('textbox').fill('标签页1内容')
      // 先添加一个新标签页
      const addButton = container.querySelector('.el-tabs__new-tab')
      await userEvent.click(addButton)

      // 切换到第二个标签页
      const tabs = container.querySelectorAll('.el-tabs__item')
      await userEvent.click(tabs[1])

      // 在第二个标签页输入内容
      await getByRole('textbox').fill('标签页2内容')

      // 验证表单值
      expect(form.values.string_array).toEqual(['标签页1内容', '标签页2内容'])
    })
  })

  describe('错误处理', () => {
    it('应该显示错误提示', async () => {
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayTabs,
        },
      })

      const form = createForm()
      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'title': '字符串数组',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayTabs',
            'items': {
              'type': 'string',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
          },
        },
      }

      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} />
        </FormProvider>
      ))
      try {
        await form.validate()
      }
      catch {
        // 验证错误信息
      }

      // 验证错误徽标显示
      await expect.element(container.querySelector('.el-badge')).toBeInTheDocument()
      await expect.element(getByText('1')).toBeInTheDocument() // 错误数量
    })
  })

  describe('属性传递', () => {
    it('应该支持自定义属性', async () => {
      const onTabAdd = vi.fn()
      const onTabRemove = vi.fn()

      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
          ArrayTabs,
        },
      })

      const form = createForm()
      const schema = {
        type: 'object',
        properties: {
          string_array: {
            'type': 'array',
            'title': '字符串数组',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayTabs',
            'x-component-props': {
              'tab-add': '{{onTabAdd}}',
              'tab-remove': '{{onTabRemove}}',
            },
            'items': {
              'type': 'string',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
          },
        },
      }

      const { container } = render(() => (
        <FormProvider form={form}>
          <SchemaField schema={schema} scope={{ onTabAdd, onTabRemove }} />
        </FormProvider>
      ))

      // 点击添加按钮
      const addButton = container.querySelector('.el-tabs__new-tab')
      await userEvent.click(addButton)
      expect(onTabAdd).toHaveBeenCalled()

      // 获取关闭按钮并点击
      const closeButtons = container.querySelectorAll('.is-icon-close')
      await userEvent.click(closeButtons[0]) // 点击第二个标签的关闭按钮
      expect(onTabRemove).toHaveBeenCalled()
    })
  })

  describe('items数组功能', () => {
    it('应该支持items为数组时，按顺序渲染不同控件', async () => {
      const form = createForm({
        initialValues: {
          string_array: ['', ''],
        },
      })
      const { getByPlaceholder } = render(ArrayTabsWithArrayItemsTestFactory(form))

      // 验证第一个标签页包含输入框
      await expect.element(getByPlaceholder('输入字符串')).toBeInTheDocument()
      // 验证第二个标签页包含日期选择器
      await expect.element(getByPlaceholder('选择日期')).toBeInTheDocument()
    })

    it('应该支持items数组时的循环渲染', async () => {
      const { container, getByPlaceholder } = render(ArrayTabsWithArrayItemsTestFactory())

      // 添加第一个标签页（使用第一个模板）
      const addButton = container.querySelector('.el-tabs__new-tab')
      await expect.element(getByPlaceholder('输入字符串')).toBeInTheDocument()

      // 添加第二个标签页（使用第二个模板）
      await userEvent.click(addButton)
      await expect.element(getByPlaceholder('选择日期')).toBeInTheDocument()

      // 添加第三个标签页（循环回第一个模板）
      await userEvent.click(addButton)
      expect(getByPlaceholder('输入字符串').elements()).toHaveLength(2)

      // 验证标签页数量
      const tabs = container.querySelectorAll('.el-tabs__item')
      expect(tabs.length).toBe(3)
    })

    it('应该支持items数组时的删除标签页功能', async () => {
      const form = createForm()
      const { container } = render(ArrayTabsWithArrayItemsTestFactory(form))

      // 添加三个标签页
      const addButton = container.querySelector('.el-tabs__new-tab')
      await userEvent.click(addButton)
      await userEvent.click(addButton)

      // 删除第二个标签页
      const closeButtons = container.querySelectorAll('.is-icon-close')
      await userEvent.click(closeButtons[1])

      // 验证剩余标签页数量
      expect(form.values.string_array.length).toBe(2)

      // 验证剩余的标签页类型正确（第一个是输入框，第三个变成第二个是日期选择器）
      const tabs = container.querySelectorAll('.el-tabs__item')
      expect(tabs.length).toBe(2)
    })
  })
})
