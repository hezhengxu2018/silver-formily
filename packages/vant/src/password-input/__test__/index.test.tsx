import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import PasswordInput from '../index'
import 'vant/lib/index.css'

function getPasswordInputRoot(container: Element) {
  return container.querySelector('.van-password-input')
}

function getPasswordInputItems(container: Element) {
  return Array.from(container.querySelectorAll('.van-password-input__item'))
}

function getPasswordInputSecurity(container: Element) {
  const security = container.querySelector('.van-password-input__security')

  if (!security) {
    throw new Error('PasswordInput security element not found')
  }

  return security
}

function triggerFocus(container: Element) {
  getPasswordInputSecurity(container).dispatchEvent(new Event('touchstart', {
    bubbles: true,
    cancelable: true,
  }))
}

function getKeyboard() {
  return document.querySelector<HTMLElement>('.van-number-keyboard')
}

function isKeyboardVisible() {
  const keyboard = getKeyboard()

  if (!keyboard) {
    return false
  }

  return window.getComputedStyle(keyboard).display !== 'none'
}

function getKeyboardKey(text: string) {
  const keyboard = getKeyboard()

  if (!keyboard) {
    throw new Error('NumberKeyboard not found')
  }

  const key = Array.from(keyboard.querySelectorAll<HTMLElement>('.van-key__wrapper')).find((element) => {
    return element.textContent?.trim() === text
  })

  if (!key) {
    throw new Error(`NumberKeyboard key "${text}" not found`)
  }

  return key
}

function createTouchEvent(type: string) {
  const event = new Event(type, {
    bubbles: true,
    cancelable: true,
  })

  Object.defineProperty(event, 'touches', {
    configurable: true,
    value: [{ clientX: 0, clientY: 0 }],
  })

  return event
}

async function pressKeyboardKey(text: string) {
  const key = getKeyboardKey(text)

  key.dispatchEvent(createTouchEvent('touchstart'))
  key.dispatchEvent(createTouchEvent('touchend'))

  await vi.waitFor(() => {
    expect(key).toBeInTheDocument()
  })
}

describe('password-input', () => {
  it('应该把字段值映射到 PasswordInput 的 value 展示', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="password"
          initialValue="123"
          component={[PasswordInput, {
            mask: false,
            length: 4,
          }]}
        />
      </FormProvider>
    ))

    expect(getPasswordInputRoot(container)).not.toBeNull()
    expect(getPasswordInputItems(container)).toHaveLength(4)
    expect(container.textContent).toContain('123')
  })

  it('应该响应外部字段值更新', async () => {
    const form = createForm({
      values: {
        password: '12',
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="password"
          component={[PasswordInput, {
            mask: false,
          }]}
        />
      </FormProvider>
    ))

    expect(container.textContent).toContain('12')

    form.setValues({
      password: '6789',
    })

    await vi.waitFor(() => {
      expect(container.textContent).toContain('6789')
    })
  })

  it('应该在可编辑时透出 focus 事件', async () => {
    const onFocus = vi.fn()
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="password"
          component={[PasswordInput, {
            onFocus,
          }]}
        />
      </FormProvider>
    ))

    triggerFocus(container)

    await vi.waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1)
    })
  })

  it('应该在 disabled 或 readonly 时阻止 focus 事件继续透出', async () => {
    const onDisabledFocus = vi.fn()
    const onReadonlyFocus = vi.fn()

    const disabledRender = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="disabledPassword"
          component={[PasswordInput, {
            disabled: true,
            onFocus: onDisabledFocus,
          }]}
        />
      </FormProvider>
    ))

    triggerFocus(disabledRender.container)
    expect(onDisabledFocus).not.toHaveBeenCalled()

    const readonlyRender = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="readonlyPassword"
          component={[PasswordInput, {
            readonly: true,
            onFocus: onReadonlyFocus,
          }]}
        />
      </FormProvider>
    ))

    triggerFocus(readonlyRender.container)
    expect(onReadonlyFocus).not.toHaveBeenCalled()
  })

  it('应该在 keyboard 为 false 时只透出 focus 事件而不展开内置键盘', async () => {
    const onFocus = vi.fn()
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="password"
          component={[PasswordInput, {
            keyboard: false,
            onFocus,
          }]}
        />
      </FormProvider>
    ))

    triggerFocus(container)

    await vi.waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(isKeyboardVisible()).toBe(false)
    })
  })

  it('应该在显式传入 focused 时使用受控焦点状态驱动内置键盘显隐', async () => {
    render(() => (
      <PasswordInput
        focused
        length={6}
        mask
        keyboard={{
          transition: false,
        }}
      />
    ))

    await vi.waitFor(() => {
      expect(isKeyboardVisible()).toBe(true)
    })
  })

  it('应该在 keyboard 开启时由组件内部管理数字键盘的展开、输入和收起', async () => {
    const form = createForm()
    const onShow = vi.fn()
    const onHide = vi.fn()

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="password"
          component={[PasswordInput, {
            keyboard: {
              transition: false,
            },
            length: 2,
            onShow,
            onHide,
          }]}
        />
      </FormProvider>
    ))

    expect(isKeyboardVisible()).toBe(false)

    triggerFocus(container)

    await vi.waitFor(() => {
      expect(isKeyboardVisible()).toBe(true)
      expect(onShow).toHaveBeenCalledTimes(1)
    })

    await pressKeyboardKey('1')
    await vi.waitFor(() => {
      expect(form.values.password).toBe('1')
    })

    await pressKeyboardKey('2')
    await vi.waitFor(() => {
      expect(form.values.password).toBe('12')
      expect(isKeyboardVisible()).toBe(false)
      expect(onHide).toHaveBeenCalledTimes(1)
    })
  })

  it('应该在 keyboard 开启时支持点击外部关闭键盘', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="password"
          component={[PasswordInput, {
            keyboard: {
              transition: false,
            },
          }]}
        />
      </FormProvider>
    ))

    triggerFocus(container)

    await vi.waitFor(() => {
      expect(isKeyboardVisible()).toBe(true)
    })

    document.body.dispatchEvent(new Event('touchstart', {
      bubbles: true,
      cancelable: true,
    }))

    await vi.waitFor(() => {
      expect(isKeyboardVisible()).toBe(false)
    })
  })
})
