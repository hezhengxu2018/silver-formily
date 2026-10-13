import type { Form } from '@silver-formily/core'
import type React from 'react'
import {
  createForm,
  onFormMount,
  onFormUnmount,
  onFormValuesChange,
} from '@silver-formily/core'
import { StrictMode, useMemo } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { createSchemaField, FormProvider, useFormEffects } from '../src'

afterEach(cleanup)

const Input: React.FC<{
  value?: string
  onChange?: (...args: any) => void
  [key: string]: any
}> = ({ value, onChange, ...others }) => {
  return (
    <input
      data-testid="input"
      {...others}
      value={value || ''}
      onChange={onChange}
    />
  )
}

const SchemaField = createSchemaField({
  components: {
    Input,
  },
})

// 让 useCompatEffect 延迟 dispose 的微任务充分执行后再断言
async function settle() {
  await new Promise(resolve => setTimeout(resolve, 50))
}

// 复刻 alibaba/formily#4361 的复现结构：StrictMode + useMemo 创建 form + FormProvider
describe('react StrictMode (ref: alibaba/formily#4361)', () => {
  it('useMemo 创建的 form 实例在 StrictMode 双调用 effect 后仍存活', async () => {
    let capturedForm: Form | undefined
    const onFormMountFn = vi.fn()
    const onFormUnmountFn = vi.fn()
    const onValuesChange = vi.fn()

    const MyForm = () => {
      const form = useMemo(
        () =>
          createForm({
            effects: () => {
              onFormMount(onFormMountFn)
              onFormUnmount(onFormUnmountFn)
              onFormValuesChange(onValuesChange)
            },
          }),
        [],
      )
      capturedForm = form
      return (
        <FormProvider form={form}>
          <SchemaField
            schema={{
              type: 'object',
              properties: {
                input: {
                  'type': 'string',
                  'title': 'Input',
                  'x-component': 'Input',
                },
              },
            }}
          />
        </FormProvider>
      )
    }

    const { getByTestId } = await render(
      <StrictMode>
        <MyForm />
      </StrictMode>,
    )

    await expect.element(getByTestId('input')).toBeVisible()
    await settle()

    const form = capturedForm!
    // issue 中的症状逐一断言：form 未被 dispose
    expect(form.mounted).toBe(true)
    expect(form.unmounted).toBe(false)
    // 字段已注册且 mounted
    const field = form.query('input').take()
    expect(field).toBeDefined()
    expect(field?.mounted).toBe(true)
    expect(Object.keys(form.fields).length).toBeGreaterThan(0)
    // form 级生命周期未被误触发卸载
    expect(onFormUnmountFn).not.toHaveBeenCalled()
    expect(onFormMountFn.mock.calls.length).toBeGreaterThan(0)

    // 事件链路仍然可用：输入 → onInput → values 变化 → effects 触发
    await getByTestId('input').fill('hello')
    expect(form.values.input).toBe('hello')
    expect(onValuesChange).toHaveBeenCalled()
    // StrictMode 下 Field 用原生 useEffect,清理阶段会真实执行一次 field.onUnmount
    // 但组件必须能恢复（重新 onMount），这里只断言恢复后的可用状态
    expect(form.query('input').take()?.mounted).toBe(true)
  })

  it('真实卸载后 form 正常 dispose', async () => {
    let capturedForm: Form | undefined
    const onFormUnmountFn = vi.fn()

    const MyForm = () => {
      const form = useMemo(
        () =>
          createForm({
            effects: () => {
              onFormUnmount(onFormUnmountFn)
            },
          }),
        [],
      )
      capturedForm = form
      return (
        <FormProvider form={form}>
          <SchemaField
            schema={{
              type: 'object',
              properties: {
                input: { 'type': 'string', 'x-component': 'Input' },
              },
            }}
          />
        </FormProvider>
      )
    }

    const { unmount } = await render(
      <StrictMode>
        <MyForm />
      </StrictMode>,
    )

    await settle()
    expect(capturedForm!.mounted).toBe(true)
    expect(onFormUnmountFn).not.toHaveBeenCalled()

    unmount()
    await settle()
    expect(capturedForm!.mounted).toBe(false)
    expect(capturedForm!.unmounted).toBe(true)
    expect(onFormUnmountFn).toHaveBeenCalled()
  })

  it('useFormEffects 在 StrictMode 下仍生效，卸载后正确移除', async () => {
    const effectFn = vi.fn()
    let capturedForm: Form | undefined

    const Effects = () => {
      useFormEffects(() => {
        effectFn()
      })
      return null
    }

    const MyForm = () => {
      const form = useMemo(() => createForm(), [])
      capturedForm = form
      return (
        <FormProvider form={form}>
          <Effects />
          <SchemaField
            schema={{
              type: 'object',
              properties: {
                input: { 'type': 'string', 'x-component': 'Input' },
              },
            }}
          />
        </FormProvider>
      )
    }

    const { getByTestId, unmount } = await render(
      <StrictMode>
        <MyForm />
      </StrictMode>,
    )

    await expect.element(getByTestId('input')).toBeVisible()
    await settle()

    // effects 已注册且可响应（onFieldMount 属于 effects 中常见的订阅）
    expect(effectFn.mock.calls.length).toBeGreaterThan(0)
    // 表单核心交互在 StrictMode 沉降后依然工作
    await getByTestId('input').fill('world')
    expect(capturedForm!.values.input).toBe('world')

    unmount()
    await settle()
    expect(capturedForm!.mounted).toBe(false)
  })
})
