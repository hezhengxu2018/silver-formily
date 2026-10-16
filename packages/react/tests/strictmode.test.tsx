import type { Form } from '@silver-formily/core'
import type React from 'react'
import {
  createForm,
  onFieldMount,
  onFieldUnmount,
  onFormMount,
  onFormUnmount,
  onFormValuesChange,
} from '@silver-formily/core'
import { StrictMode, useMemo } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { createSchemaField, Field, FormProvider, useFormEffects } from '../src'

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
    // Field 与其他字段统一通过 useAttach 保留 StrictMode 重放期间的挂载状态
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

    await unmount()
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

    await unmount()
    await settle()
    expect(capturedForm!.mounted).toBe(false)
  })
})


it('field retains its lifecycle through StrictMode replay and cleans up replaced or removed fields', async () => {
  const mounted = vi.fn()
  const unmounted = vi.fn()
  const form = createForm({
    effects() {
      onFieldMount('*', mounted)
      onFieldUnmount('*', unmounted)
    },
  })
  function App({ name }: { name?: string }) {
    return (
      <StrictMode>
        <FormProvider form={form}>
          {name && <Field name={name} component={[Input]} />}
        </FormProvider>
      </StrictMode>
    )
  }
  const screen = await render(<App name="first" />)
  await settle()
  const first = form.query('first').take()!
  expect(mounted).toHaveBeenCalledTimes(1)
  expect(unmounted).not.toHaveBeenCalled()
  expect(first.mounted).toBe(true)
  await screen.getByTestId('input').fill('value')
  expect(form.values.first).toBe('value')

  await screen.rerender(<App name="second" />)
  await vi.waitFor(() => expect(unmounted).toHaveBeenCalledTimes(1))
  expect(unmounted.mock.calls[0][0]).toBe(first)
  expect(first.unmounted).toBe(true)
  expect(form.query('second').take()!.mounted).toBe(true)
  expect(mounted).toHaveBeenCalledTimes(2)

  await screen.rerender(<App />)
  await vi.waitFor(() => expect(unmounted).toHaveBeenCalledTimes(2))
  expect(form.query('second').take()!.unmounted).toBe(true)

  await screen.rerender(<App name="third" />)
  const third = form.query('third').take()!
  const cleanup = vi.spyOn(third, 'onUnmount')
  expect(mounted).toHaveBeenCalledTimes(3)
  expect(unmounted).toHaveBeenCalledTimes(2)
  await screen.unmount()
  await vi.waitFor(() => expect(cleanup).toHaveBeenCalledTimes(1))
  expect(third.unmounted).toBe(true)
})
