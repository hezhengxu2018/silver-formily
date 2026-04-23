import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { getElement } from '../../__test__/dom'
import { Input } from '../../input'
import { FormBaseItem } from '../index'
import 'vant/lib/index.css'

describe('formBaseItem', () => {
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
})
