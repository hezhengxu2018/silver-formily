import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import Input from '../index'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-input.css'

describe('password', () => {
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
          <Field name="input" component={[Input, { placeholder: '请输入密码' }]} />
        </FormProvider>
      ))

      await expect.element(getByPlaceholder('请输入密码')).toBeInTheDocument()
    })
  })
})
