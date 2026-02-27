import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { DatePicker, Editable, FormItem, Input, Submit } from '../../index'
import 'element-plus/theme-chalk/index.css'

describe('editable.Popover', () => {
  let form
  let SchemaField

  beforeEach(() => {
    document.body.innerHTML = ''
    form = createForm()
    const { SchemaField: _SchemaField } = createSchemaField({
      components: {
        FormItem,
        Input,
        DatePicker,
        Editable,
        Submit,
      },
    })
    SchemaField = _SchemaField
  })

  it('应该正确渲染 Editable.Popover 组件', async () => {
    const schema = {
      type: 'object',
      properties: {
        void: {
          'type': 'void',
          'title': '虚拟节点容器',
          'x-component': 'Editable.Popover',
          'properties': {
            date: {
              'type': 'string',
              'title': '日期',
              'x-decorator': 'FormItem',
              'x-component': 'DatePicker',
            },
            input: {
              'type': 'string',
              'title': '输入框',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))

    // 检查是否渲染了 Editable.Popover 组件
    expect(container.querySelector('.formily-element-plus-editable')).not.toBeNull()

    // 检查是否渲染了编辑按钮
    expect(container.querySelector('.formily-element-plus-editable-edit-btn')).not.toBeNull()
  })

  it('应该在点击 Editable.Popover 触发器时显示弹出层', async () => {
    const schema = {
      type: 'object',
      properties: {
        void: {
          'type': 'void',
          'title': '虚拟节点容器',
          'x-component': 'Editable.Popover',
          'properties': {
            date: {
              'type': 'string',
              'title': '日期',
              'x-decorator': 'FormItem',
              'x-component': 'DatePicker',
            },
            input: {
              'type': 'string',
              'title': '输入框',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))

    const trigger = container.querySelector('.formily-element-plus-editable-trigger')
    await userEvent.click(trigger)

    expect(document.querySelector('.el-popover')).not.toBeNull()
  })

  it('应该在点击弹出层外部时关闭弹出层', async () => {
    const schema = {
      type: 'object',
      properties: {
        object: {
          'type': 'object',
          'title': '对象节点容器',
          'x-component': 'Editable.Popover',
          'x-data': {
            test: 'test',
          },
          'properties': {
            date: {
              'type': 'string',
              'title': '日期',
              'x-decorator': 'FormItem',
              'x-component': 'DatePicker',
            },
            input: {
              'type': 'string',
              'title': '输入框',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },

        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))
    const trigger = container.querySelector('.formily-element-plus-editable-trigger')
    await userEvent.click(trigger)

    await userEvent.click(document.body)
    await vi.waitFor(() => {
      expect(document.querySelector('.el-popover')).not.toBeVisible()
    })
    expect(form.getFieldState('object').data.test).toEqual('test')
  })

  it('应该在表单校验失败时popover弹出', async () => {
    const fn = vi.fn()
    const schema = {
      type: 'object',
      properties: {
        void: {
          'type': 'void',
          'title': '虚拟节点容器',
          'x-component': 'Editable.Popover',
          'properties': {
            input: {
              'type': 'string',
              'title': '输入框',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-validator': [
                { required: true, message: '输入框不能为空' },
                { max: 10, message: '输入内容不能超过10个字符' },
              ],
            },
          },
        },
      },
    }

    const { container, getByRole, getByLabelText } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
        <Submit onSubmit={fn}>提交</Submit>
      </FormProvider>
    ))
    const trigger = container.querySelector('.el-tooltip__trigger')
    await userEvent.click(trigger)
    // 输入不符合校验规则的内容
    const input = getByLabelText('输入框')
    await expect.element(input).toBeVisible()
    await input.fill('超过十个字符的内容内容内容内容内容')

    const errorMessage = document.querySelector('.formily-element-plus-form-item-feedback.is-error')
    expect(errorMessage).not.toBeNull()
    expect(errorMessage.textContent).toContain('输入内容不能超过10个字符')
    await vi.waitFor(() => {
      expect(document.querySelector('.el-popover')).toBeVisible()
    })
    await userEvent.click(document.body)
    await vi.waitFor(() => {
      expect(document.querySelector('.el-popover')).not.toBeVisible()
    })

    // 点击提交按钮，校验失败时不触发提交
    await getByRole('button', { name: '提交' }).click()
    expect(errorMessage).not.toBeNull()
    expect(errorMessage.textContent).toContain('输入内容不能超过10个字符')
    await vi.waitFor(() => {
      expect(document.querySelector('.el-popover')).toBeVisible()
    })
    expect(fn).not.toHaveBeenCalled()
  })
})
