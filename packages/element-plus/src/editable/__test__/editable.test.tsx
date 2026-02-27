import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { Editable, FormItem, Input, Submit } from '../../index'
import 'element-plus/theme-chalk/index.css'

describe('editable', () => {
  let form
  let SchemaField

  beforeEach(() => {
    document.body.innerHTML = ''
    form = createForm()
    const { SchemaField: _SchemaField } = createSchemaField({
      components: {
        FormItem,
        Input,
        Editable,
      },
    })
    SchemaField = _SchemaField
  })

  it('应该正确渲染 Editable 组件', async () => {
    const schema = {
      type: 'object',
      properties: {
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'Editable',
          'x-component': 'Input',
        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))
    expect(container.querySelector('.formily-element-plus-editable')).not.toBeNull()
    expect(container.querySelector('.formily-element-plus-editable-edit-btn')).not.toBeNull()
  })

  it('应该在点击Editable组件时进入编辑模式', async () => {
    const schema = {
      type: 'object',
      properties: {
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'Editable',
          'x-component': 'Input',
        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))
    const editBtn = container.querySelector('.formily-element-plus-editable-edit-btn')
    await userEvent.click(editBtn)
    expect(container.querySelector('.formily-element-plus-editable-close-btn')).not.toBeNull()
  })

  it('应该在点击Editable组件外部时退出编辑模式', async () => {
    const schema = {
      type: 'object',
      properties: {
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'Editable',
          'x-component': 'Input',
        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))

    // 点击编辑按钮进入编辑模式
    const editBtn = container.querySelector('.formily-element-plus-editable-edit-btn')
    await userEvent.click(editBtn)

    // 确认进入编辑模式
    expect(container.querySelector('.formily-element-plus-editable-close-btn')).not.toBeNull()

    // 点击外部区域
    await userEvent.click(document.body)

    // 检查是否退出编辑模式（关闭按钮消失，编辑按钮出现）
    await vi.waitFor(() => {
      expect(container.querySelector('.formily-element-plus-editable-close-btn')).toBeNull()
      expect(container.querySelector('.formily-element-plus-editable-edit-btn')).not.toBeNull()
    })
  })

  it('应该在点击关闭按钮时退出编辑模式', async () => {
    const schema = {
      type: 'object',
      properties: {
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'Editable',
          'x-component': 'Input',
          'x-data': {
            test: 'test',
          },
        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))

    // 点击编辑按钮进入编辑模式
    const editBtn = container.querySelector('.formily-element-plus-editable-edit-btn')
    await userEvent.click(editBtn)

    // 确认进入编辑模式
    const closeBtn = container.querySelector('.formily-element-plus-editable-close-btn')
    expect(closeBtn).not.toBeNull()

    // 点击关闭按钮
    await userEvent.click(closeBtn)

    // 检查是否退出编辑模式
    await vi.waitFor(() => {
      expect(container.querySelector('.formily-element-plus-editable-close-btn')).toBeNull()
      expect(container.querySelector('.formily-element-plus-editable-edit-btn')).not.toBeNull()
    })

    expect(form.getFieldState('input').data.test).toEqual('test')
  })

  it('应该正确触发表单校验', async () => {
    const fn = vi.fn()
    const schema = {
      type: 'object',
      properties: {
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'Editable',
          'x-component': 'Input',
          'x-validator': [
            { required: true, message: '输入框不能为空' },
            { max: 10, message: '输入内容不能超过10个字符' },
          ],
        },
      },
    }

    const { container, getByRole } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
        <Submit onSubmit={fn}>
          提交
        </Submit>
      </FormProvider>
    ))

    const editBtn = container.querySelector('.formily-element-plus-editable-edit-btn')
    await userEvent.click(editBtn)
    const input = container.querySelector('input')
    expect(input).not.toBeNull()
    await userEvent.type(input, '超过十个字符的内容内容内容内容内容')
    await userEvent.click(document.body)
    await getByRole('button', { name: '提交' }).click()
    const errorMessage = document.querySelector('.formily-element-plus-form-item-feedback.is-error')
    expect(errorMessage).not.toBeNull()
    expect(errorMessage.textContent).toContain('输入内容不能超过10个字符')
    expect(fn).not.toHaveBeenCalled()
  })

  it('应该正确应用 editProps 配置', async () => {
    const schema = {
      type: 'object',
      properties: {
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'Editable',
          'x-decorator-props': {
            editProps: {
              size: 'small',
              style: {
                width: '80px',
              },
            },
          },
          'x-component': 'Input',
        },
      },
    }
    const form = createForm()
    const { SchemaField } = createSchemaField({
      components: {
        FormItem,
        Input,
        Editable,
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))

    const editBtn = container.querySelector('.formily-element-plus-editable-edit-btn')
    await userEvent.click(editBtn)

    const input = container.querySelector('input')
    expect(input).not.toBeNull()

    const inputWrapper = input.closest('.formily-element-plus-form-item')
    expect(inputWrapper).toHaveClass('el-form-item--small')
    expect(inputWrapper).toHaveStyle({ width: '80px' })
  })

  it('应该在字段被禁用时添加is-disabled类名', async () => {
    const schema = {
      type: 'object',
      properties: {
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'Editable',
          'x-component': 'Input',
          'x-disabled': true,
        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))

    const editableElement = container.querySelector('.formily-element-plus-editable')
    expect(editableElement).toHaveClass('is-disabled')
  })

  it('应该在字段被禁用时不显示编辑按钮', async () => {
    const schema = {
      type: 'object',
      properties: {
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'Editable',
          'x-component': 'Input',
          'x-disabled': true,
        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))

    // 禁用状态下不应该显示编辑按钮
    expect(container.querySelector('.formily-element-plus-editable-edit-btn')).toBeNull()
    // 也不应该显示关闭按钮
    expect(container.querySelector('.formily-element-plus-editable-close-btn')).toBeNull()
  })

  it('应该在字段被禁用时点击组件不进入编辑模式', async () => {
    const schema = {
      type: 'object',
      properties: {
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'Editable',
          'x-component': 'Input',
          'x-disabled': true,
        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))

    const editableElement = container.querySelector('.formily-element-plus-editable')

    // 点击禁用的组件
    await userEvent.click(editableElement)

    // 确认没有进入编辑模式（没有关闭按钮出现）
    expect(container.querySelector('.formily-element-plus-editable-close-btn')).toBeNull()
    // 确认没有编辑按钮（因为被禁用）
    expect(container.querySelector('.formily-element-plus-editable-edit-btn')).toBeNull()
  })

  it('应该在字段从启用状态变为禁用状态时正确更新', async () => {
    const schema = {
      type: 'object',
      properties: {
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'Editable',
          'x-component': 'Input',
        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))

    // 初始状态应该有编辑按钮
    expect(container.querySelector('.formily-element-plus-editable-edit-btn')).not.toBeNull()
    expect(container.querySelector('.formily-element-plus-editable')).not.toHaveClass('is-disabled')

    // 禁用字段
    form.setFieldState('input', (state) => {
      state.disabled = true
    })

    await vi.waitFor(() => {
      // 禁用后应该添加 is-disabled 类名
      expect(container.querySelector('.formily-element-plus-editable')).toHaveClass('is-disabled')
      // 编辑按钮应该消失
      expect(container.querySelector('.formily-element-plus-editable-edit-btn')).toBeNull()
    })
  })

  it('应该在字段从禁用状态变为启用状态时正确更新', async () => {
    const schema = {
      type: 'object',
      properties: {
        input: {
          'type': 'string',
          'title': '输入框',
          'x-decorator': 'Editable',
          'x-component': 'Input',
          'x-disabled': true,
        },
      },
    }

    const { container } = render(() => (
      <FormProvider form={form}>
        <SchemaField schema={schema} />
      </FormProvider>
    ))

    // 初始禁用状态
    expect(container.querySelector('.formily-element-plus-editable')).toHaveClass('is-disabled')
    expect(container.querySelector('.formily-element-plus-editable-edit-btn')).toBeNull()

    // 启用字段
    form.setFieldState('input', (state) => {
      state.disabled = false
    })

    await vi.waitFor(() => {
      // 启用后应该移除 is-disabled 类名
      expect(container.querySelector('.formily-element-plus-editable')).not.toHaveClass('is-disabled')
      // 编辑按钮应该出现
      expect(container.querySelector('.formily-element-plus-editable-edit-btn')).not.toBeNull()
    })
  })
})
