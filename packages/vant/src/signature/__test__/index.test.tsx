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

function getCanvas(container: Element) {
  return container.querySelector<HTMLCanvasElement>('.van-signature canvas')
}

function getClearButton(container: Element) {
  return container.querySelectorAll<HTMLButtonElement>('.van-signature__footer .van-button')[0] ?? null
}

function getConfirmButton(container: Element) {
  return container.querySelectorAll<HTMLButtonElement>('.van-signature__footer .van-button')[1] ?? null
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

function getCanvasCenterPixelAlpha(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas context not found')
  }

  const centerX = Math.max(Math.floor((canvas.clientWidth || canvas.width) / 2), 1)
  const centerY = Math.max(Math.floor((canvas.clientHeight || canvas.height) / 2), 1)

  return context.getImageData(centerX, centerY, 1, 1).data[3]
}

describe('signature', () => {
  it('应该在确认签名后写回字段值', async () => {
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
    })
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
    })
  })

  it('应该在外部写入 modelValue 后同步回显到画布', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="signature" component={[Signature]} />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(getCanvas(container)?.width).toBeGreaterThan(0)
    })

    form.setValues({
      signature: blackSquareDataUrl,
    })

    await vi.waitFor(() => {
      expect(getCanvasCenterPixelAlpha(getCanvas(container)!)).toBeGreaterThan(0)
    })
  })

  it('应该在清空字段后忽略旧的异步签名回填', async () => {
    const drawImageSpy = vi.spyOn(CanvasRenderingContext2D.prototype, 'drawImage').mockImplementation(() => {})
    const OriginalImage = window.Image
    const createdImages: MockImage[] = []

    class MockImage {
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      naturalWidth = 120
      naturalHeight = 60
      width = 120
      height = 60
      private _src = ''

      set src(value: string) {
        this._src = value
        createdImages.push(this)
      }

      get src() {
        return this._src
      }

      triggerLoad() {
        this.onload?.()
      }
    }

    window.Image = MockImage as unknown as typeof Image

    try {
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
        expect(getCanvas(container)?.width).toBeGreaterThan(0)
        expect(createdImages.length).toBeGreaterThan(0)
      })

      form.setValues({
        signature: '',
      })

      await vi.waitFor(() => {
        expect(form.values.signature).toBe('')
      })

      createdImages.forEach(image => image.triggerLoad())

      await vi.waitFor(() => {
        expect(drawImageSpy).not.toHaveBeenCalled()
      })
    }
    finally {
      window.Image = OriginalImage
      drawImageSpy.mockRestore()
    }
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
      expect(getCanvasCenterPixelAlpha(getCanvas(container)!)).toBeGreaterThan(0)
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
      expect(getSignature(container)).not.toBeNull()
      expect(container.querySelector('.silver-formily-vant-signature__mask')).not.toBeNull()
    })

    getClearButton(container)?.click()

    await vi.waitFor(() => {
      expect(form.values.signature).toBe(blackSquareDataUrl)
    })
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
})
