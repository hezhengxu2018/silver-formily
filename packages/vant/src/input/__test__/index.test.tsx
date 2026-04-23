import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { ref } from 'vue'
import FormItem from '../../form-item'
import Input from '../index'
import 'vant/lib/index.css'

function getNativeInputs(container: Element) {
  return Array.from(container.querySelectorAll<HTMLInputElement>('input.van-field__control'))
}

describe('input', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const page = render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input]} />
        </FormProvider>
      ))

      await expect.element(page.getByRole('textbox')).toBeInTheDocument()
    })

    it('应该支持输入文本', async () => {
      const form = createForm()

      render(() => (
        <FormProvider form={form}>
          <Field name="input" component={[Input]} />
        </FormProvider>
      ))

      const input = document.querySelector('input')
      await userEvent.type(input!, 'Hello Vant')

      expect(form.values.input).toBe('Hello Vant')
    })
  })

  describe('属性传递', () => {
    it('应该支持禁用状态', async () => {
      const { getByRole } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { disabled: true }]} />
        </FormProvider>
      ))

      await expect.element(getByRole('textbox')).toBeDisabled()
    })

    it('应该支持只读状态', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { readonly: true }]} />
        </FormProvider>
      ))

      expect(document.querySelector('input')).toHaveAttribute('readonly')
    })

    it('应该支持透传输入类型', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { type: 'password' }]} />
        </FormProvider>
      ))

      expect(document.querySelector('input')).toHaveAttribute('type', 'password')
    })

    it('应该在 attrs 更新后同步透传到原生输入框', async () => {
      const disabled = ref(false)
      const placeholder = ref('初始占位')

      const { getByRole } = render(() => (
        <Input disabled={disabled.value} placeholder={placeholder.value} />
      ))

      const input = getByRole('textbox')

      await expect.element(input).toBeInTheDocument()
      await expect.element(input).not.toBeDisabled()
      expect(document.querySelector('input')).toHaveAttribute('placeholder', '初始占位')

      disabled.value = true
      placeholder.value = '更新占位'

      await vi.waitFor(() => {
        expect(document.querySelector('input')).toBeDisabled()
        expect(document.querySelector('input')).toHaveAttribute('placeholder', '更新占位')
      })
    })

    it('应该让 FormItem 读取并应用 Input 的桥接属性', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="description"
            title="详细描述"
            initialValue="hello"
            decorator={[FormItem]}
            component={[Input.TextArea, {
              rows: 4,
              maxlength: 10,
              showWordLimit: true,
              clearable: true,
            }]}
          />
        </FormProvider>
      ))

      const textarea = container.querySelector('textarea')

      expect(textarea).toHaveAttribute('rows', '4')
      expect(container.querySelector('.van-field__clear')).not.toBeNull()
      expect(container.querySelector('.van-field__word-limit')?.textContent).toContain('5/10')
    })

    it('应该在 formatTrigger 默认为 onChange 时格式化输入值', async () => {
      const form = createForm()

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field
            name="input"
            component={[Input, {
              formatter: (value: string) => value.replace(/\d/g, ''),
            }]}
          />
        </FormProvider>
      ))

      const input = getByRole('textbox')

      await userEvent.type(input, 'a1b2')

      await vi.waitFor(() => {
        expect(form.values.input).toBe('ab')
        expect(document.querySelector('input')).toHaveValue('ab')
      })
    })

    it('应该在 formatTrigger 为 onBlur 时延迟到失焦再格式化', async () => {
      const form = createForm()

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <div>
            <Field
              name="input"
              component={[Input, {
                formatter: (value: string) => value.replace(/\d/g, ''),
                formatTrigger: 'onBlur',
              }]}
            />
            <button type="button">blur target</button>
          </div>
        </FormProvider>
      ))

      const input = getByRole('textbox')

      await userEvent.type(input, 'a1b2')

      expect(form.values.input).toBe('a1b2')
      expect(document.querySelector('input')).toHaveValue('a1b2')

      await userEvent.click(document.querySelector('button')!)

      await vi.waitFor(() => {
        expect(form.values.input).toBe('ab')
        expect(document.querySelector('input')).toHaveValue('ab')
      })
    })
  })

  describe('事件处理', () => {
    it('应该支持聚焦事件', async () => {
      const onFocus = vi.fn()

      render(() => (
        <FormProvider form={createForm()}>
          <Field name="input" component={[Input, { onFocus }]} />
        </FormProvider>
      ))

      await userEvent.click(document.querySelector('input')!)

      expect(onFocus).toHaveBeenCalled()
    })

    it('应该支持失焦事件', async () => {
      const onBlur = vi.fn()

      render(() => (
        <FormProvider form={createForm()}>
          <div>
            <Field name="input" component={[Input, { onBlur }]} />
            <button type="button">blur target</button>
          </div>
        </FormProvider>
      ))

      await userEvent.click(document.querySelector('input')!)
      await userEvent.click(document.querySelector('button')!)

      expect(onBlur).toHaveBeenCalled()
    })
  })
})

describe('input reactions', () => {
  it('应该在 Field reactions 中动态修改 component props 后同步到 FormItem 和 Input', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm({
        values: {
          target: 'hello',
        },
      })}
      >
        <Field
          name="source"
          title="联动开关"
          decorator={[FormItem]}
          component={[Input, {
            placeholder: '输入 enable 激活联动',
          }]}
        />
        <Field
          name="target"
          title="目标输入框"
          decorator={[FormItem]}
          component={[Input, {
            placeholder: '默认占位',
            clearable: false,
            maxlength: 5,
            showWordLimit: false,
          }]}
          reactions={(field) => {
            const enabled = field.query('source').get('value') === 'enable'

            field.setComponentProps({
              placeholder: enabled ? '联动占位' : '默认占位',
              clearable: enabled,
              maxlength: enabled ? 10 : 5,
              showWordLimit: enabled,
            })
          }}
        />
      </FormProvider>
    ))

    const [sourceInput, targetInput] = getNativeInputs(container)

    expect(targetInput).toHaveAttribute('placeholder', '默认占位')
    expect(targetInput).toHaveAttribute('maxlength', '5')
    expect(container.querySelector('.van-field__clear')).toBeNull()
    expect(container.querySelector('.van-field__word-limit')).toBeNull()

    await userEvent.type(sourceInput, 'enable')

    await vi.waitFor(() => {
      expect(targetInput).toHaveAttribute('placeholder', '联动占位')
      expect(targetInput).toHaveAttribute('maxlength', '10')
      expect(container.querySelector('.van-field__clear')).not.toBeNull()
      expect(container.querySelector('.van-field__word-limit')?.textContent).toContain('5/10')
    })
  })

  it('应该在 Field reactions 中动态修改 pattern 并由 FormItem 正常应用', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm({
        values: {
          target: 'hello',
        },
      })}
      >
        <Field
          name="source"
          title="联动模式"
          decorator={[FormItem]}
          component={[Input, {
            placeholder: '输入 readonly 或 disabled',
          }]}
        />
        <Field
          name="target"
          title="目标输入框"
          decorator={[FormItem]}
          component={[Input, {
            clearable: true,
          }]}
          reactions={(field) => {
            const mode = field.query('source').get('value')

            if (mode === 'readonly') {
              field.setPattern('readOnly')
              return
            }

            if (mode === 'disabled') {
              field.setPattern('disabled')
              return
            }

            field.setPattern('editable')
          }}
        />
      </FormProvider>
    ))

    const [sourceInput, targetInput] = getNativeInputs(container)

    expect(targetInput).not.toHaveAttribute('readonly')
    expect(targetInput).not.toBeDisabled()
    expect(container.querySelector('.van-field__clear')).not.toBeNull()

    await userEvent.type(sourceInput, 'readonly')

    await vi.waitFor(() => {
      expect(targetInput).toHaveAttribute('readonly')
      expect(container.querySelector('.van-field__clear')).toBeNull()
    })

    await userEvent.clear(sourceInput)
    await userEvent.type(sourceInput, 'disabled')

    await vi.waitFor(() => {
      expect(targetInput).toBeDisabled()
      expect(container.querySelector('.van-field--disabled')).not.toBeNull()
    })
  })
})

describe('textArea', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const page = render(() => (
        <FormProvider form={createForm()}>
          <Field name="textarea" component={[Input.TextArea]} />
        </FormProvider>
      ))

      const textarea = page.getByRole('textbox')

      await expect.element(textarea).toBeInTheDocument()
      expect(textarea.element().tagName.toLowerCase()).toBe('textarea')
    })

    it('应该支持输入多行文本', async () => {
      const form = createForm()

      render(() => (
        <FormProvider form={form}>
          <Field name="textarea" component={[Input.TextArea]} />
        </FormProvider>
      ))

      const textarea = document.querySelector('textarea')
      await userEvent.type(textarea!, 'Line 1\nLine 2')

      expect(form.values.textarea).toBe('Line 1\nLine 2')
    })
  })

  describe('属性传递', () => {
    it('应该支持设置行数', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="textarea" component={[Input.TextArea, { rows: 5 }]} />
        </FormProvider>
      ))

      expect(document.querySelector('textarea')).toHaveAttribute('rows', '5')
    })
  })
})
