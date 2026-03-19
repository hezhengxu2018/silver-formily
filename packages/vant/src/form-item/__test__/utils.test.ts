import { describe, expect, it } from 'vitest'
import { Input } from '../../input'
import { determineFeedbackStatus, getFeedbackMessage, getVanFieldBridgedProps } from '../utils'

describe('form-item utils', () => {
  it('应该按 errors > warnings > successes 的优先级返回反馈文案', () => {
    expect(getFeedbackMessage({
      selfErrors: ['错误信息'],
      selfWarnings: ['警告信息'],
      selfSuccesses: ['成功信息'],
    } as any)).toBe('错误信息')

    expect(getFeedbackMessage({
      selfErrors: [],
      selfWarnings: ['警告信息'],
      selfSuccesses: ['成功信息'],
    } as any)).toBe('警告信息')

    expect(getFeedbackMessage({
      selfErrors: [],
      selfWarnings: [],
      selfSuccesses: ['成功信息'],
    } as any)).toBe('成功信息')
  })

  it('应该优先使用 decorator 上覆盖的 feedbackStatus', () => {
    expect(determineFeedbackStatus({
      decorator: ['FormItem', { feedbackStatus: 'warning' }],
      validateStatus: 'error',
    } as any)).toBe('warning')

    expect(determineFeedbackStatus({
      decorator: 'FormItem',
      validateStatus: 'success',
    } as any)).toBe('success')
  })

  it('应该只桥接允许的 Vant Field 属性，并兼容 readOnly', () => {
    const onClear = () => {}
    const onUpdateModelValue = () => {}

    const bridgedProps = getVanFieldBridgedProps({
      component: [Input, {
        'clearable': true,
        'maxlength': 20,
        'readOnly': true,
        onClear,
        'onUpdate:modelValue': onUpdateModelValue,
        'unrelated': 'should-not-pass',
      }],
    } as any)

    expect(bridgedProps).toMatchObject({
      'clearable': true,
      'clearTrigger': 'always',
      'maxlength': 20,
      'readonly': true,
      onClear,
      'onUpdate:modelValue': onUpdateModelValue,
    })
    expect(bridgedProps).not.toHaveProperty('unrelated')
  })

  it('应该从组件静态标记推导类型，并允许显式 type 覆盖', () => {
    expect(getVanFieldBridgedProps({
      component: [Input.TextArea, { rows: 4 }],
    } as any)).toMatchObject({
      rows: 4,
      type: 'textarea',
    })

    expect(getVanFieldBridgedProps({
      component: [Input.TextArea, { type: 'digit' }],
    } as any).type).toBe('digit')
  })
})
