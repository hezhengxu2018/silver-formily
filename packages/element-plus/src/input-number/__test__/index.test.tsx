import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import InputNumber from '../index'
import 'element-plus/theme-chalk/index.css'

describe('inputNumber', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const page = render(() => (
        <FormProvider form={createForm()}>
          <Field name="number" component={[InputNumber]} />
        </FormProvider>
      ))
      await expect.element(page.getByRole('spinbutton')).toBeInTheDocument()
    })

    it('应该支持输入数字', async () => {
      const form = createForm()
      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field name="number" component={[InputNumber]} />
        </FormProvider>
      ))
      await expect.element(getByRole('spinbutton')).toBeInTheDocument()
      await getByRole('spinbutton').fill('123')
      expect(form.values.number).toBe(123)
    })

    it('应该支持增加按钮', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="number" initialValue={5} component={[InputNumber]} />
        </FormProvider>
      ))

      const increaseButton = document.querySelector('.el-input-number__increase')
      await userEvent.click(increaseButton)

      expect(form.values.number).toBe(6)
    })

    it('应该支持减少按钮', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="number" initialValue={5} component={[InputNumber]} />
        </FormProvider>
      ))

      const decreaseButton = document.querySelector('.el-input-number__decrease')
      await userEvent.click(decreaseButton)

      expect(form.values.number).toBe(4)
    })
  })

  describe('属性传递', () => {
    it('应该支持禁用状态', async () => {
      const { getByRole } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="number" component={[InputNumber, { disabled: true }]} />
        </FormProvider>
      ))

      const input = getByRole('spinbutton')
      await expect.element(input).toBeDisabled()
    })

    it('应该支持只读状态', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="number" component={[InputNumber, { readonly: true }]} />
        </FormProvider>
      ))

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('readonly')
    })

    it('应该支持最小值限制', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="number" initialValue={5} component={[InputNumber, { min: 3 }]} />
        </FormProvider>
      ))

      const decreaseButton = document.querySelector('.el-input-number__decrease')
      await userEvent.click(decreaseButton)
      await userEvent.click(decreaseButton)
      await userEvent.click(decreaseButton) // 尝试减到 2，但最小值是 3

      expect(form.values.number).toBe(3)
    })

    it('应该支持最大值限制', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="number" initialValue={8} component={[InputNumber, { max: 10 }]} />
        </FormProvider>
      ))

      const increaseButton = document.querySelector('.el-input-number__increase')
      await userEvent.click(increaseButton)
      await userEvent.click(increaseButton)
      await userEvent.click(increaseButton) // 尝试增加到 11，但最大值是 10

      expect(form.values.number).toBe(10)
    })

    it('应该支持步长设置', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="number" initialValue={5} component={[InputNumber, { step: 2 }]} />
        </FormProvider>
      ))

      const increaseButton = document.querySelector('.el-input-number__increase')
      await userEvent.click(increaseButton)

      expect(form.values.number).toBe(7) // 步长为 2，所以 5 + 2 = 7
    })

    it('应该支持精度设置', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="number" initialValue={5} component={[InputNumber, { precision: 2, step: 0.1 }]} />
        </FormProvider>
      ))

      const increaseButton = document.querySelector('.el-input-number__increase')
      await userEvent.click(increaseButton)

      expect(form.values.number).toBe(5.1)
    })

    it('应该支持控制按钮位置设置', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="number" component={[InputNumber, { controlsPosition: 'right' }]} />
        </FormProvider>
      ))

      const inputNumber = document.querySelector('.el-input-number')
      expect(inputNumber).toHaveClass('is-controls-right')
    })
  })

  describe('事件处理', () => {
    it('应该支持聚焦事件', async () => {
      const onFocus = vi.fn()
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="number" component={[InputNumber, { onFocus }]} />
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
          <Field name="number" component={[InputNumber, { onBlur }]} />
        </FormProvider>
      ))

      const input = document.querySelector('input')
      await userEvent.click(input)
      await userEvent.tab()
      expect(onBlur).toHaveBeenCalled()
    })
  })
})
