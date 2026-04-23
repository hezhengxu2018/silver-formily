import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import Signature from '../index'
import 'vant/lib/index.css'

const blackSquareDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60">
    <rect width="120" height="60" fill="#000" />
  </svg>
`)}`

function getSignature(container: Element) {
  return container.querySelector<HTMLElement>('.van-signature')
}

function getPreview(container: Element) {
  return container.querySelector<HTMLElement>('.silver-formily-vant-signature__preview')
}

function getPreviewImage(container: Element) {
  return container.querySelector<HTMLImageElement>('.silver-formily-vant-signature__image img')
}

function getCanvas(container: Element) {
  return container.querySelector<HTMLCanvasElement>('.van-signature canvas')
}

function getClearButton(container: Element) {
  return container.querySelectorAll<HTMLButtonElement>('.silver-formily-vant-signature__footer .van-button')[0] ?? null
}

function getConfirmButton(container: Element) {
  return container.querySelectorAll<HTMLButtonElement>('.silver-formily-vant-signature__footer .van-button')[1] ?? null
}

function createTouchEvent(type: string, clientX: number, clientY: number) {
  const event = new Event(type, {
    bubbles: true,
    cancelable: true,
  })

  Object.defineProperty(event, 'touches', {
    configurable: true,
    value: type === 'touchend'
      ? []
      : [{ clientX, clientY }],
  })

  return event
}

function drawLine(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect()
  const startX = rect.left + 16
  const startY = rect.top + 12
  const endX = rect.left + 64
  const endY = rect.top + 28

  canvas.dispatchEvent(createTouchEvent('touchstart', startX, startY))
  canvas.dispatchEvent(createTouchEvent('touchmove', endX, endY))
  canvas.dispatchEvent(createTouchEvent('touchend', endX, endY))
}

describe('signature', () => {
  it('应该在确认签名后切换到图片预览并写回字段值', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="signature" component={[Signature]} />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getCanvas(container)?.width).toBeGreaterThan(0)
    })

    drawLine(getCanvas(container)!)
    getConfirmButton(container)?.click()

    await vi.waitFor(() => {
      expect(form.values.signature).toMatch(/^data:image\/png;base64,/)
      expect(getPreviewImage(container)?.src).toContain('data:image/png;base64,')
    })

    expect(getConfirmButton(container)).toBeNull()
  })

  it('应该支持通过 field.invoke 获取实例并调用 submit', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="signature" component={[Signature]} />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getCanvas(container)?.width).toBeGreaterThan(0)
    })

    drawLine(getCanvas(container)!)

    const field = form.query('signature').take()
    const signatureRef = field.invoke('getSignatureRef')

    expect(signatureRef?.value).toBeTruthy()

    signatureRef.value?.submit()

    await vi.waitFor(() => {
      expect(form.values.signature).toMatch(/^data:image\/png;base64,/)
      expect(getPreviewImage(container)?.src).toContain('data:image/png;base64,')
    })
  })

  it('应该在外部写入 modelValue 后显示图片预览', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="signature" component={[Signature]} />
      </FormProvider>
    ))

    form.setValues({
      signature: blackSquareDataUrl,
    })

    await vi.waitFor(() => {
      expect(getPreviewImage(container)?.src).toContain('data:image/svg+xml')
    })

    expect(getConfirmButton(container)).toBeNull()
  })

  it('应该在清空后退出图片预览并重新显示签名面板', async () => {
    const form = createForm({
      values: {
        signature: blackSquareDataUrl,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="signature" component={[Signature]} />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getPreviewImage(container)?.src).toContain('data:image/svg+xml')
    })

    getClearButton(container)?.click()

    await vi.waitFor(() => {
      expect(form.values.signature).toBe('')
      expect(getPreview(container)).toBeNull()
      expect(getConfirmButton(container)).not.toBeNull()
      expect(getCanvas(container)).not.toBeNull()
    })
  })

  it('应该在点击清空后同步清空字段值', async () => {
    const form = createForm({
      values: {
        signature: blackSquareDataUrl,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="signature" component={[Signature]} />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getPreviewImage(container)?.src).toContain('data:image/svg+xml')
    })

    getClearButton(container)?.click()

    await vi.waitFor(() => {
      expect(form.values.signature).toBe('')
    })
  })

  it('应该同步 Field.disabled 到组件并阻止字段值变更', async () => {
    const form = createForm({
      values: {
        signature: blackSquareDataUrl,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="signature"
          disabled={true}
          component={[Signature]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getPreviewImage(container)?.src).toContain('data:image/svg+xml')
      expect(getSignature(container)).not.toBeNull()
    })

    expect(getClearButton(container)).toBeNull()
    expect(getConfirmButton(container)).toBeNull()
  })

  it('应该在未传入自定义 tips 插槽时保留降级文案', async () => {
    const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => null)

    try {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="signature"
            component={[Signature, {
              tips: '当前环境不支持签名',
            }]}
          />
        </FormProvider>
      ))

      await vi.waitFor(() => {
        expect(container.textContent).toContain('当前环境不支持签名')
      })
    }
    finally {
      getContextSpy.mockRestore()
    }
  })

  it('应该在 readPretty 模式下显示签名图片', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="signature"
          initialValue={blackSquareDataUrl}
          readPretty={true}
          component={[Signature]}
        />
      </FormProvider>
    ))

    const image = container.querySelector<HTMLImageElement>('img')

    expect(image).not.toBeNull()
    expect(image?.src).toContain('data:image/svg+xml')
    expect(getSignature(container)).toBeNull()
  })

  it('应该在 readonly 模式下只显示图片预览', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="signature"
          initialValue={blackSquareDataUrl}
          component={[Signature, {
            readonly: true,
          }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getPreviewImage(container)?.src).toContain('data:image/svg+xml')
    })

    expect(getClearButton(container)).toBeNull()
    expect(getConfirmButton(container)).toBeNull()
  })
})
