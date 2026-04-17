import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { getElement } from '../../__test__/dom'
import { Input } from '../../input'
import FormItem, { FormBaseItem } from '../index'
import 'vant/lib/index.css'

describe('formItem', () => {
  describe('基础功能', () => {
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
        <FormBaseItem label="用户名">
          <Input modelValue="hello" />
        </FormBaseItem>
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
        <FormBaseItem label="用户名">
          <Input modelValue="hello" />
        </FormBaseItem>
      ))

      const label = container.querySelector('label')
      const input = container.querySelector('input')

      expect(label).not.toBeNull()
      expect(input).not.toBeNull()

      await userEvent.click(label!)
      expect(input).toHaveFocus()
    })

    it('应该支持反馈信息展示', async () => {
      const { container } = render(() => (
        <FormBaseItem label="用户名" feedbackStatus="error" feedbackText="校验失败" showError={true}>
          <Input modelValue="hello" />
        </FormBaseItem>
      ))

      await expect.element(getElement(container, '.van-field--error')).toBeInTheDocument()
      await expect.element(getElement(container, '.van-field__error-message')).toHaveTextContent('校验失败')
    })

    it('应该支持自定义标签、补充信息和错误内容节点', async () => {
      const { container } = render(() => (
        <FormBaseItem
          label={<span class="custom-label">自定义标签</span>}
          extra={<span class="custom-extra">补充说明</span>}
          feedbackStatus="error"
          feedbackText={<span class="custom-error">自定义错误</span>}
        >
          <Input modelValue="hello" />
        </FormBaseItem>
      ))

      await expect.element(getElement(container, '.custom-label')).toBeInTheDocument()
      await expect.element(getElement(container, '.custom-extra')).toBeInTheDocument()
      expect(container.querySelector('.van-cell .custom-extra')).toBeNull()
      await expect.element(getElement(container, '.silver-formily-vant-form-item__extra-wrapper')).toBeInTheDocument()
      await expect.element(getElement(container, '.silver-formily-vant-form-item__extra')).toBeInTheDocument()
      await expect.element(getElement(container, '.custom-error')).toBeInTheDocument()
    })

    it('应该支持通过插槽自定义结构', async () => {
      const { container } = render(() => (
        <FormBaseItem feedbackStatus="error" feedbackText="插槽错误">
          {{
            'label': () => <span class="slot-label">插槽标签</span>,
            'left-icon': () => <span class="slot-left-icon">左图标</span>,
            'input': () => <span class="slot-input">自定义输入</span>,
            'button': () => <span class="slot-button">操作按钮</span>,
            'right-icon': () => <span class="slot-right-icon">右图标</span>,
            'extra': () => <span class="slot-extra">额外说明</span>,
            'error-message': ({ message }: { message: string }) => <span class="slot-error">{`错误:${message}`}</span>,
          }}
        </FormBaseItem>
      ))

      await expect.element(getElement(container, '.slot-label')).toBeInTheDocument()
      await expect.element(getElement(container, '.slot-left-icon')).toBeInTheDocument()
      await expect.element(getElement(container, '.slot-input')).toBeInTheDocument()
      await expect.element(getElement(container, '.van-field__control')).toHaveClass('van-field__control--custom')
      await expect.element(getElement(container, '.slot-button')).toBeInTheDocument()
      await expect.element(getElement(container, '.slot-right-icon')).toBeInTheDocument()
      await expect.element(getElement(container, '.slot-extra')).toBeInTheDocument()
      expect(container.querySelector('.van-cell .slot-extra')).not.toBeNull()
      expect(container.querySelector('.silver-formily-vant-form-item__extra .slot-extra')).toBeNull()
      await expect.element(getElement(container, '.slot-error')).toHaveTextContent('错误:插槽错误')
    })

    it('应该支持纯文本补充信息', async () => {
      const { container } = render(() => (
        <FormBaseItem label="标题" extra="文本说明">
          <Input modelValue="hello" />
        </FormBaseItem>
      ))

      await expect.element(getElement(container, '.silver-formily-vant-form-item__extra')).toHaveTextContent('文本说明')
    })

    it('应该让 extra 属性和 extra 插槽互不影响', async () => {
      const { container } = render(() => (
        <FormBaseItem label="标题" extra="属性说明">
          {{
            default: () => <Input modelValue="hello" />,
            extra: () => <span class="slot-extra">插槽说明</span>,
          }}
        </FormBaseItem>
      ))

      await expect.element(getElement(container, '.silver-formily-vant-form-item__extra')).toHaveTextContent('属性说明')
      await expect.element(getElement(container, '.slot-extra')).toBeInTheDocument()
      expect(container.querySelector('.van-cell .slot-extra')).not.toBeNull()
      expect(container.querySelector('.silver-formily-vant-form-item__extra .slot-extra')).toBeNull()
    })

    it('应该在未显式传入 asterisk 时回退到 required attrs', async () => {
      const { container } = render(() => (
        <FormBaseItem label="标题" required={true}>
          <Input modelValue="hello" />
        </FormBaseItem>
      ))

      await expect.element(getElement(container, '.van-field__label')).toHaveClass('van-field__label--required')
    })

    it('应该在没有 extra 时仍然显示原生分割线', async () => {
      const { container } = render(() => (
        <FormBaseItem label="标题">
          <Input modelValue="hello" />
        </FormBaseItem>
      ))

      const field = getElement(container, '.van-cell')
      const style = window.getComputedStyle(field, '::after')
      expect(style.display).toBe('block')
      expect(style.borderBottomStyle).toBe('solid')
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

      expect(label).toHaveAttribute('for', 'custom-input-id')
      expect(input).toHaveAttribute('id', 'custom-input-id')
      expect(input).toHaveAttribute('aria-labelledby', label!.id)
    })
  })

  describe('字段集成', () => {
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

    it('应该在点击清除图标时触发 modelValue 更新', async () => {
      const onUpdateModelValue = vi.fn()
      const { container } = render(() => (
        <FormBaseItem
          clearable={true}
          clearTrigger="always"
          modelValue="已有内容"
          {...{
            'onUpdate:modelValue': onUpdateModelValue,
          }}
        >
          <Input />
        </FormBaseItem>
      ))

      await vi.waitFor(() => {
        expect(container.querySelector('.van-field__clear')).not.toBeNull()
      })

      await userEvent.click(container.querySelector('.van-field__clear')!)
      expect(onUpdateModelValue).toHaveBeenCalledWith('')
    })
  })
})
