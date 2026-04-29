import type { FormPopupSlotProps } from '../../'
import { Field } from '@silver-formily/vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { defineComponent } from 'vue'
import { FormItem, FormPopup, Input } from '../../'
import 'vant/lib/index.css'

function waitForAnimationFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

function getVisiblePopup() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-popup')).find((popup) => {
    return window.getComputedStyle(popup).display !== 'none'
  }) ?? null
}

function getVisibleInput() {
  return getVisiblePopup()?.querySelector<HTMLInputElement>('input') ?? null
}

function getVisibleElement<T extends Element>(selector: string) {
  return getVisiblePopup()?.querySelector<T>(selector) ?? null
}

afterEach(async () => {
  document.body.innerHTML = ''
  vi.clearAllMocks()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
  await waitForAnimationFrame()
})

describe('form-popup', () => {
  it('应该支持把 defineComponent 组件作为表单内容传入', async () => {
    const onResolved = vi.fn()

    const PopupContent = defineComponent({
      name: 'FormPopupDefineComponentContent',
      setup() {
        return () => (
          <Field
            name="name"
            title="姓名"
            decorator={[FormItem]}
            component={[Input]}
          />
        )
      },
    })

    const TestComponent = () => {
      const handleOpen = () => {
        FormPopup<{ name: string }>('组件内容', PopupContent)
          .open({
            values: {
              name: '杭州',
            },
          })
          .then(onResolved)
      }

      return <button onClick={handleOpen}>打开组件内容弹层</button>
    }

    const { getByText } = render(() => <TestComponent />)

    await userEvent.click(getByText('打开组件内容弹层'))

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
      expect(getVisibleInput()).not.toBeNull()
    })

    const input = getVisibleInput() as HTMLInputElement
    await userEvent.clear(input)
    await userEvent.type(input, '苏州')
    await userEvent.click(getVisibleElement('.silver-formily-vant-form-popup__footer .van-button--primary') as HTMLElement)

    await vi.waitFor(() => {
      expect(onResolved).toHaveBeenCalledWith({ name: '苏州' })
      expect(getVisiblePopup()).toBeNull()
    })
  })

  it('应该支持打开表单弹层并在确认后返回 form.values', async () => {
    const onResolved = vi.fn()

    const TestComponent = () => {
      const handleOpen = () => {
        FormPopup<{ name: string }>('编辑信息', () => (
          <Field
            name="name"
            title="姓名"
            decorator={[FormItem]}
            component={[Input]}
          />
        ))
          .open({
            values: {
              name: '杭州',
            },
          })
          .then(onResolved)
      }

      return <button onClick={handleOpen}>打开表单弹层</button>
    }

    const { getByText } = render(() => <TestComponent />)

    await userEvent.click(getByText('打开表单弹层'))

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
      expect(document.body.textContent).toContain('编辑信息')
    })

    const input = getVisibleInput() as HTMLInputElement
    await userEvent.clear(input)
    await userEvent.type(input, '苏州')
    await userEvent.click(getVisibleElement('.silver-formily-vant-form-popup__footer .van-button--primary') as HTMLElement)

    await vi.waitFor(() => {
      expect(onResolved).toHaveBeenCalledWith({ name: '苏州' })
      expect(getVisiblePopup()).toBeNull()
    })
  })

  it('应该支持 forConfirm 改写返回值，并在动态 middleware 后返回 form.values', async () => {
    const onConfirmResolved = vi.fn()
    const onDraftResolved = vi.fn()
    const onSaveDraft = vi.fn()

    const renderContent = {
      default: () => (
        <Field
          name="name"
          title="姓名"
          decorator={[FormItem]}
          component={[Input]}
        />
      ),
      footer: ({ reject, resolve, saveDraft }: FormPopupSlotProps<{ name: string }>) => (
        <div class="custom-footer">
          <button class="form-popup-cancel" onClick={reject}>取消</button>
          <button class="form-popup-save-draft" onClick={() => saveDraft()}>保存草稿</button>
          <button class="form-popup-confirm" onClick={() => resolve()}>确认</button>
        </div>
      ),
    }

    const TestComponent = () => {
      const openConfirmPopup = () => {
        FormPopup<{ name: string }, ['save-draft']>('确认改值', renderContent, ['save-draft'])
          .forConfirm(form => `confirm:${form.values.name}`)
          .forSaveDraft(() => 'ignored')
          .open({
            values: {
              name: '杭州',
            },
          })
          .then(onConfirmResolved)
      }

      const openDraftPopup = () => {
        FormPopup<{ name: string }, ['save-draft']>('草稿改值', renderContent, ['save-draft'])
          .forConfirm(form => `confirm:${form.values.name}`)
          .forSaveDraft((form) => {
            onSaveDraft(form.values)
            return 'ignored'
          })
          .open({
            values: {
              name: '南京',
            },
          })
          .then(onDraftResolved)
      }

      return (
        <div>
          <button onClick={openConfirmPopup}>打开确认改值</button>
          <button onClick={openDraftPopup}>打开草稿改值</button>
        </div>
      )
    }

    const { getByText } = render(() => <TestComponent />)

    await userEvent.click(getByText('打开确认改值'))
    await vi.waitFor(() => expect(getVisiblePopup()).not.toBeNull())
    await userEvent.click(getVisibleElement('.form-popup-confirm') as HTMLElement)
    await vi.waitFor(() => {
      expect(onConfirmResolved).toHaveBeenCalledWith('confirm:杭州')
      expect(getVisiblePopup()).toBeNull()
    })

    await userEvent.click(getByText('打开草稿改值'))
    await vi.waitFor(() => expect(getVisiblePopup()).not.toBeNull())
    await userEvent.click(getVisibleElement('.form-popup-save-draft') as HTMLElement)
    await vi.waitFor(() => {
      expect(onSaveDraft).toHaveBeenCalledWith({ name: '南京' })
      expect(onDraftResolved).toHaveBeenCalledWith({ name: '南京' })
      expect(getVisiblePopup()).toBeNull()
    })
  })

  it('应该在提交过程中让确认按钮进入 loading 状态', async () => {
    const onResolved = vi.fn()
    let release: (() => void) | undefined

    const waitForConfirm = new Promise<void>((resolve) => {
      release = resolve
    })

    const TestComponent = () => {
      const handleOpen = () => {
        FormPopup<{ name: string }>('提交中状态', () => (
          <Field
            name="name"
            title="姓名"
            decorator={[FormItem]}
            component={[Input]}
          />
        ))
          .forConfirm(async (form) => {
            await waitForConfirm
            return {
              name: form.values.name,
            }
          })
          .open({
            values: {
              name: '无锡',
            },
          })
          .then(onResolved)
      }

      return <button onClick={handleOpen}>打开提交中状态</button>
    }

    const { getByText } = render(() => <TestComponent />)

    await userEvent.click(getByText('打开提交中状态'))

    await vi.waitFor(() => {
      expect(getVisiblePopup()).not.toBeNull()
    })

    await userEvent.click(getVisibleElement('.silver-formily-vant-form-popup__footer .van-button--primary') as HTMLElement)

    await vi.waitFor(() => {
      expect(document.querySelector('.silver-formily-vant-form-popup__footer .van-button--loading')).not.toBeNull()
    })

    release?.()

    await vi.waitFor(() => {
      expect(onResolved).toHaveBeenCalledWith({ name: '无锡' })
      expect(getVisiblePopup()).toBeNull()
    })
  })
})
