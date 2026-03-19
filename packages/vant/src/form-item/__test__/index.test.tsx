import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { Input } from '../../input'
import FormItem, { FormBaseItem } from '../index'
import 'vant/lib/index.css'

function getHtmlElement(container: Element, selector: string) {
  return container.querySelector<HTMLElement>(selector)!
}

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

      await expect.element(getHtmlElement(container, '.van-field')).toBeInTheDocument()
      await expect.element(getHtmlElement(container, '.van-field__label')).toHaveTextContent('用户名')
      await expect.element(getHtmlElement(container, '.van-field__control')).toBeInTheDocument()
    })

    it('应该支持反馈信息展示', async () => {
      const { container } = render(() => (
        <FormBaseItem label="用户名" feedbackStatus="error" feedbackText="校验失败">
          <Input modelValue="hello" />
        </FormBaseItem>
      ))

      await expect.element(getHtmlElement(container, '.van-field--error')).toBeInTheDocument()
      await expect.element(getHtmlElement(container, '.van-field__error-message')).toHaveTextContent('校验失败')
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

      await expect.element(getHtmlElement(container, '.custom-label')).toBeInTheDocument()
      await expect.element(getHtmlElement(container, '.custom-extra')).toBeInTheDocument()
      await expect.element(getHtmlElement(container, '.custom-error')).toBeInTheDocument()
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

      await expect.element(getHtmlElement(container, '.van-field__label')).toHaveClass('van-field__label--required')
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
  })
})
