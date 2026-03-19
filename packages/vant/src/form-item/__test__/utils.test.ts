import { createForm } from '@formily/core'
import { describe, expect, it, vi } from 'vitest'
import { Input } from '../../input'
import { fieldFeedbackMapper } from '../index'
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

  it('应该兼容非数组 component 与非对象 component props', () => {
    expect(getVanFieldBridgedProps({
      component: Input,
    } as any)).toEqual({})

    expect(getVanFieldBridgedProps({
      component: [Input, 'not-an-object'],
    } as any)).toEqual({})
  })
})

describe('fieldFeedbackMapper', () => {
  it('应该在 field 为空或 void field 时直接返回原始 props', () => {
    const props = { label: '测试项' }
    const voidField = createForm().createVoidField({ name: 'voidField' })

    expect(fieldFeedbackMapper(props, null as any)).toBe(props)
    expect(fieldFeedbackMapper(props, voidField as any)).toBe(props)
  })

  it('应该组合字段值、反馈状态、禁用只读和事件监听器', () => {
    const fieldOnInput = vi.fn()
    const componentOnUpdate = vi.fn()
    const decoratorListenerA = vi.fn()
    const decoratorListenerB = vi.fn()

    const mapped = fieldFeedbackMapper({
      'asterisk': false,
      'onUpdate:modelValue': [decoratorListenerA, decoratorListenerB],
    }, {
      component: [Input, {
        'clearable': true,
        'disabled': true,
        'readOnly': true,
        'onUpdate:modelValue': componentOnUpdate,
      }],
      decorator: ['FormItem', { feedbackStatus: 'warning' }],
      validateStatus: 'error',
      selfErrors: [],
      selfWarnings: ['提示信息'],
      selfSuccesses: [],
      value: 'initial-value',
      required: true,
      pattern: 'editable',
      onInput: fieldOnInput,
    } as any)

    expect(mapped).toMatchObject({
      modelValue: 'initial-value',
      feedbackStatus: 'warning',
      feedbackText: '提示信息',
      asterisk: false,
      disabled: true,
      readonly: true,
      clearable: true,
      clearTrigger: 'always',
    })

    mapped['onUpdate:modelValue']('next-value')

    expect(fieldOnInput).toHaveBeenCalledWith('next-value')
    expect(decoratorListenerA).toHaveBeenCalledWith('next-value')
    expect(decoratorListenerB).toHaveBeenCalledWith('next-value')
    expect(componentOnUpdate).toHaveBeenCalledWith('next-value')
  })

  it('应该根据字段 pattern 推导星号、禁用和只读状态', () => {
    const disabledMapped = fieldFeedbackMapper({}, {
      component: [Input],
      decorator: ['FormItem'],
      validateStatus: 'success',
      selfErrors: [],
      selfWarnings: [],
      selfSuccesses: ['通过'],
      value: 'value',
      required: true,
      pattern: 'disabled',
      onInput: vi.fn(),
    } as any)

    expect(disabledMapped.asterisk).toBe(true)
    expect(disabledMapped.disabled).toBe(true)
    expect(disabledMapped.readonly).toBe(false)
    expect(disabledMapped.feedbackText).toBeUndefined()

    const readOnlyMapped = fieldFeedbackMapper({}, {
      component: [Input],
      decorator: ['FormItem'],
      validateStatus: 'success',
      selfErrors: [],
      selfWarnings: [],
      selfSuccesses: ['通过'],
      value: 'value',
      required: true,
      pattern: 'readOnly',
      onInput: vi.fn(),
    } as any)

    expect(readOnlyMapped.asterisk).toBe(true)
    expect(readOnlyMapped.readonly).toBe(true)

    const readPrettyMapped = fieldFeedbackMapper({}, {
      component: [Input],
      decorator: ['FormItem'],
      validateStatus: 'success',
      selfErrors: [],
      selfWarnings: [],
      selfSuccesses: ['通过'],
      value: 'value',
      required: true,
      pattern: 'readPretty',
      onInput: vi.fn(),
    } as any)

    expect(readPrettyMapped.asterisk).toBe(false)
  })

  it('应该忽略非函数监听器', () => {
    const fieldOnInput = vi.fn()
    const decoratorListener = vi.fn()

    const mapped = fieldFeedbackMapper({
      'onUpdate:modelValue': [decoratorListener, 'noop'],
    }, {
      component: [Input, {
        'onUpdate:modelValue': null,
      }],
      decorator: ['FormItem'],
      validateStatus: 'success',
      selfErrors: [],
      selfWarnings: [],
      selfSuccesses: [],
      value: 'value',
      required: false,
      pattern: 'editable',
      onInput: fieldOnInput,
    } as any)

    mapped['onUpdate:modelValue']('next-value')

    expect(fieldOnInput).toHaveBeenCalledWith('next-value')
    expect(decoratorListener).toHaveBeenCalledWith('next-value')
  })
})
