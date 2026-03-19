import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import Input from '../index'
import 'vant/lib/index.css'

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
      await userEvent.type(input!, 'Hello Vant')

      expect(form.values.input).toBe('Hello Vant')
    })
  })

  describe('属性传递', () => {
    it('应该支持禁用状态', async () => {
      const { getByRole } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { disabled: true }]} />
        </FormProvider>
      ))

      await expect.element(getByRole('textbox')).toBeDisabled()
    })

    it('应该支持只读状态', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { readonly: true }]} />
        </FormProvider>
      ))

      expect(document.querySelector('input')).toHaveAttribute('readonly')
    })

    it('应该支持透传输入类型', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { type: 'password' }]} />
        </FormProvider>
      ))

      expect(document.querySelector('input')).toHaveAttribute('type', 'password')
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

      await userEvent.click(document.querySelector('input')!)

      expect(onFocus).toHaveBeenCalled()
    })

    it('应该支持失焦事件', async () => {
      const onBlur = vi.fn()

      render(() => (
        <FormProvider form={createForm()}>
          <div>
            <Field name="input" component={[Input, { onBlur }]} />
            <button type="button">blur target</button>
          </div>
        </FormProvider>
      ))

      await userEvent.click(document.querySelector('input')!)
      await userEvent.click(document.querySelector('button')!)

      expect(onBlur).toHaveBeenCalled()
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
      await userEvent.type(textarea!, 'Line 1\nLine 2')

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

      expect(document.querySelector('textarea')).toHaveAttribute('rows', '5')
    })
  })
})
