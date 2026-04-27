import type { Field as FormilyField } from '@formily/core'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import Upload from '../index'
import 'vant/lib/index.css'

function getInput(container: Element) {
  return container.querySelector<HTMLInputElement>('input[type="file"]')
}

async function uploadFile(container: Element, file: File) {
  await vi.waitFor(() => {
    expect(getInput(container)).toBeTruthy()
  })

  const input = getInput(container)!

  Object.defineProperty(input, 'files', {
    configurable: true,
    value: [file],
  })

  input.dispatchEvent(new Event('change', { bubbles: true }))
}

function createDeferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void

  const promise = new Promise<T>((innerResolve, innerReject) => {
    resolve = innerResolve
    reject = innerReject
  })

  return {
    promise,
    resolve,
    reject,
  }
}

describe('upload', () => {
  it('应该正常渲染上传按钮文案', async () => {
    render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="attachments"
          component={[Upload, {
            textContent: '上传附件',
          }]}
        />
      </FormProvider>
    ))

    await vi.waitFor(() => {
      expect(document.body.textContent).toContain('上传附件')
    })
  })

  it('应该在仅选择文件模式下把 fileList 经过 formatValue 写回字段值', async () => {
    const form = createForm()
    const file = new File(['hello'], 'avatar.png', { type: 'image/png' })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="attachments"
          component={[Upload, {
            formatValue: fileList => fileList?.map(item => item.file?.name),
            textContent: '上传文件',
          }]}
        />
      </FormProvider>
    ))

    await uploadFile(container, file)

    await vi.waitFor(() => {
      expect(form.values.attachments).toEqual(['avatar.png'])
    })

    const field = form.query('attachments').take() as FormilyField

    expect(field.dataSource).toHaveLength(1)
    expect(field.dataSource?.[0]?.file?.name).toBe('avatar.png')
  })

  it('应该在自动上传成功后再写回格式化后的字段值', async () => {
    const deferred = createDeferred<{ url: string }>()
    const httpRequest = vi.fn(() => deferred.promise)
    const form = createForm()
    const file = new File(['hello'], 'contract.pdf', { type: 'application/pdf' })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="attachments"
          component={[Upload, {
            action: '/api/upload',
            formatValue: fileList => fileList?.map(item => item.url),
            httpRequest,
            textContent: '上传文件',
          }]}
        />
      </FormProvider>
    ))

    await uploadFile(container, file)

    await vi.waitFor(() => {
      expect(httpRequest).toHaveBeenCalledOnce()
    })

    expect(form.values.attachments).toBeUndefined()

    deferred.resolve({
      url: 'https://cdn.example.com/contract.pdf',
    })

    await vi.waitFor(() => {
      expect(form.values.attachments).toEqual(['https://cdn.example.com/contract.pdf'])
    })

    const field = form.query('attachments').take() as FormilyField

    expect(field.dataSource?.[0]?.status).toBe('done')
    expect(field.dataSource?.[0]?.url).toBe('https://cdn.example.com/contract.pdf')
    expect(field.selfErrors).toEqual([])
    expect(container.textContent).not.toContain('上传失败')
  })

  it('应该在上传失败时写入字段错误并展示失败状态', async () => {
    const httpRequest = vi.fn(async () => {
      throw new Error('上传失败')
    })
    const form = createForm()
    const file = new File(['hello'], 'broken.png', { type: 'image/png' })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="attachments"
          component={[Upload, {
            action: '/api/upload',
            httpRequest,
            textContent: '上传文件',
          }]}
        />
      </FormProvider>
    ))

    await uploadFile(container, file)

    await vi.waitFor(() => {
      expect((form.query('attachments').take() as FormilyField).selfErrors).toContain('上传失败')
    })

    await vi.waitFor(() => {
      expect(container.textContent).toContain('上传失败')
    })
  })

  it('应该支持通过 field.invoke 获取 Uploader 实例', async () => {
    const form = createForm()

    render(() => (
      <FormProvider form={form}>
        <Field
          name="attachments"
          component={[Upload, {
            textContent: '上传文件',
          }]}
        />
      </FormProvider>
    ))

    const uploaderRef = form.query('attachments').take().invoke('getUploaderRef')

    expect(uploaderRef?.value).toBeTruthy()
    expect(typeof uploaderRef?.value?.chooseFile).toBe('function')
  })

  it('应该在 readPretty 模式下展示文件列表', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="attachments"
          initialValue={[
            { name: '营业执照.pdf', url: 'https://cdn.example.com/license.pdf' },
            '现场照片.jpg',
          ]}
          readPretty={true}
          component={[Upload]}
        />
      </FormProvider>
    ))

    expect(container.textContent).toContain('营业执照.pdf')
    expect(container.textContent).toContain('现场照片.jpg')
    expect(container.querySelector('a')?.getAttribute('href')).toBe('https://cdn.example.com/license.pdf')
  })
})
