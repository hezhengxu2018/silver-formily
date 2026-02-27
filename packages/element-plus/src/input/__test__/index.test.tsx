import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import Input from '../index'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-input.css'

describe('input', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const page = render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input]} />
        </FormProvider>
      ))
      await expect.element(page.getByRole('textbox')).toBeInTheDocument()
    })

    it('应该支持输入文本', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="input" component={[Input]} />
        </FormProvider>
      ))

      const input = document.querySelector('input')
      await userEvent.type(input, 'Hello World')

      expect(form.values.input).toBe('Hello World')
    })
  })

  describe('属性传递', () => {
    it('应该支持禁用状态', async () => {
      const { getByRole } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { disabled: true }]} />
        </FormProvider>
      ))

      const input = getByRole('textbox')
      await expect.element(input).toBeDisabled()
    })

    it('应该支持只读状态', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { readonly: true }]} />
        </FormProvider>
      ))

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('readonly')
    })

    it('应该支持占位符', async () => {
      const { getByPlaceholder } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { placeholder: '请输入内容' }]} />
        </FormProvider>
      ))

      await expect.element(getByPlaceholder('请输入内容')).toBeInTheDocument()
    })
  })

  describe('事件处理', () => {
    it('应该支持聚焦事件', async () => {
      const onFocus = vi.fn()
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { onFocus }]} />
        </FormProvider>
      ))

      const input = document.querySelector('input')
      await userEvent.click(input)

      expect(onFocus).toHaveBeenCalled()
    })

    it('应该支持失焦事件', async () => {
      const onBlur = vi.fn()
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { onBlur }]} />
        </FormProvider>
      ))

      const input = document.querySelector('input')
      await userEvent.click(input)
      await userEvent.tab()

      expect(onBlur).toHaveBeenCalled()
    })
  })

  describe('插槽支持', () => {
    it('应该支持前缀插槽', async () => {
      const { getByText } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input]}>
            {{
              prefix: () => <span class="custom-prefix">前缀</span>,
            }}
          </Field>
        </FormProvider>
      ))

      await expect.element(getByText('前缀')).toBeInTheDocument()
      await expect.element(document.querySelector('.custom-prefix')).toBeInTheDocument()
    })

    it('应该支持后缀插槽', async () => {
      const { getByText } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input]}>
            {{
              suffix: () => <span class="custom-suffix">后缀</span>,
            }}
          </Field>
        </FormProvider>
      ))

      await expect.element(getByText('后缀')).toBeInTheDocument()
      await expect.element(document.querySelector('.custom-suffix')).toBeInTheDocument()
    })

    it('应该支持前置插槽', async () => {
      const { getByText } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input]}>
            {{
              prepend: () => <div class="custom-prepend">前置</div>,
            }}
          </Field>
        </FormProvider>
      ))

      await expect.element(getByText('前置')).toBeInTheDocument()
      await expect.element(document.querySelector('.custom-prepend')).toBeInTheDocument()
    })

    it('应该支持后置插槽', async () => {
      const { getByText } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input]}>
            {{
              append: () => <div class="custom-append">后置</div>,
            }}
          </Field>
        </FormProvider>
      ))

      await expect.element(getByText('后置')).toBeInTheDocument()
      await expect.element(document.querySelector('.custom-append')).toBeInTheDocument()
    })

    it('应该支持多个插槽同时使用', async () => {
      const { getByText } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input]}>
            {{
              prefix: () => <span>前缀</span>,
              suffix: () => <span>后缀</span>,
              prepend: () => <div>前置</div>,
              append: () => <div>后置</div>,
            }}
          </Field>
        </FormProvider>
      ))

      await expect.element(getByText('前缀')).toBeInTheDocument()
      await expect.element(getByText('后缀')).toBeInTheDocument()
      await expect.element(getByText('前置')).toBeInTheDocument()
      await expect.element(getByText('后置')).toBeInTheDocument()
    })
  })
})

describe('textArea', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const page = render(() => (
        <FormProvider form={createForm()}>
          <Field name="textarea" component={[Input.TextArea]} />
        </FormProvider>
      ))

      const textarea = page.getByRole('textbox')
      await expect.element(textarea).toBeInTheDocument()
      expect(textarea.element().tagName.toLowerCase()).toBe('textarea')
    })

    it('应该支持输入多行文本', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="textarea" component={[Input.TextArea]} />
        </FormProvider>
      ))

      const textarea = document.querySelector('textarea')
      await userEvent.type(textarea, 'Line 1\nLine 2')

      expect(form.values.textarea).toBe('Line 1\nLine 2')
    })
  })

  describe('属性传递', () => {
    it('应该支持设置行数', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="textarea" component={[Input.TextArea, { rows: 5 }]} />
        </FormProvider>
      ))

      const textarea = document.querySelector('textarea')
      expect(textarea).toHaveAttribute('rows', '5')
    })
  })

  describe('表单交互', () => {
    it('应该在表单中正确更新值', async () => {
      const form = createForm()

      render(() => (
        <FormProvider form={form}>
          <Field name="textarea" initialValue="Initial value" component={[Input.TextArea]} />
        </FormProvider>
      ))

      const textarea = document.querySelector('textarea')
      expect(textarea).toHaveValue('Initial value')

      await userEvent.clear(textarea)
      await userEvent.type(textarea, 'Updated value')

      expect(form.values.textarea).toBe('Updated value')
    })
  })
})
