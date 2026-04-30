import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { getElement } from '../../__test__/dom'
import { Input } from '../../input'
import FormItem from '../index'
import 'vant/lib/index.css'

describe('formItem', () => {
  describe('formItem 集成', () => {
    it('应该正常渲染标签和内容', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="username"
            title="用户名"
            decorator={[FormItem]}
            component={[Input]}
          />
        </FormProvider>
      ))

      await expect.element(getElement(container, '.van-field')).toBeInTheDocument()
      await expect.element(getElement(container, '.van-field__label')).toHaveTextContent('用户名')
      await expect.element(getElement(container, '.van-field__control')).toBeInTheDocument()
    })

    it('应该补齐与官方 VanField 一致的标签和输入框关联属性', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="username"
            title="用户名"
            initialValue="hello"
            decorator={[FormItem]}
            component={[Input]}
          />
        </FormProvider>
      ))

      const label = container.querySelector('label')
      const input = container.querySelector('input')

      expect(label).not.toBeNull()
      expect(input).not.toBeNull()
      expect(label).toHaveAttribute('id')
      expect(label).toHaveAttribute('for', input!.id)
      expect(label).toHaveAttribute('data-allow-mismatch', 'attribute')
      expect(input).toHaveAttribute('id')
      expect(input).toHaveAttribute('aria-labelledby', label!.id)
      expect(input).toHaveAttribute('data-allow-mismatch', 'attribute')
    })

    it('应该在点击标签时聚焦输入框', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="username"
            title="用户名"
            initialValue="hello"
            decorator={[FormItem]}
            component={[Input]}
          />
        </FormProvider>
      ))

      const label = container.querySelector('label')
      const input = container.querySelector('input')

      expect(label).not.toBeNull()
      expect(input).not.toBeNull()

      await userEvent.click(label!)
      expect(input).toHaveFocus()
    })

    it('应该让 Input 的显式 id 回流到 FormItem 标签关联', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="username"
            title="用户名"
            decorator={[FormItem]}
            component={[Input, { id: 'custom-input-id' }]}
          />
        </FormProvider>
      ))

      const label = container.querySelector('label')
      const input = container.querySelector('input')

      await vi.waitFor(() => {
        expect(label).toHaveAttribute('for', 'custom-input-id')
        expect(input).toHaveAttribute('id', 'custom-input-id')
        expect(input).toHaveAttribute('aria-labelledby', label!.id)
      })
    })

    it('应该根据字段必填状态展示星号', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="requiredField"
            title="必填项"
            required={true}
            decorator={[FormItem]}
            component={[Input]}
          />
        </FormProvider>
      ))

      await expect.element(getElement(container, '.van-field__label')).toHaveClass('van-field__label--required')
    })

    it('应该通过 Formily decorator 参数透传展示层属性到表单项结构', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="username"
            title="用户名"
            decorator={[FormItem, {
              tag: 'section',
              titleClass: 'custom-title',
              titleStyle: { color: 'rgb(255, 0, 0)' },
              valueClass: 'custom-value',
            }]}
            component={[Input]}
          />
        </FormProvider>
      ))

      expect(getElement(container, '.silver-formily-vant-form-item').tagName).toBe('SECTION')
      await expect.element(getElement(container, '.van-cell__title')).toHaveClass('custom-title')
      await expect.element(getElement(container, '.van-cell__title')).toHaveStyle({
        color: 'rgb(255, 0, 0)',
      })
      await expect.element(getElement(container, '.van-cell__value')).toHaveClass('custom-value')
    })

    it('应该在 readPretty 阅读态下隐藏 isLink 箭头', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="username"
            title="用户名"
            readPretty={true}
            initialValue="hello"
            decorator={[FormItem, { isLink: true }]}
            component={[Input]}
          />
        </FormProvider>
      ))

      await expect.element(getElement(container, '.van-field')).not.toHaveClass('van-cell--clickable')
      expect(container.querySelector('.van-cell__right-icon')).toBeNull()
    })

    it('应该透传 clearable 并为自定义输入默认启用 always clearTrigger', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="clearable"
            title="可清除"
            initialValue="已有内容"
            decorator={[FormItem]}
            component={[Input, { clearable: true }]}
          />
        </FormProvider>
      ))

      await vi.waitFor(() => {
        expect(container.querySelector('.van-field__clear')).not.toBeNull()
      })
    })

    it('应该在点击清除图标时触发字段值更新', async () => {
      const form = createForm({
        values: {
          clearable: '已有内容',
        },
      })

      const { container } = render(() => (
        <FormProvider form={form}>
          <Field
            name="clearable"
            title="可清除"
            decorator={[FormItem]}
            component={[Input, { clearable: true }]}
          />
        </FormProvider>
      ))

      await vi.waitFor(() => {
        expect(container.querySelector('.van-field__clear')).not.toBeNull()
      })

      await userEvent.click(container.querySelector('.van-field__clear')!)

      await vi.waitFor(() => {
        expect(form.values.clearable).toBe('')
      })
    })
  })
})
