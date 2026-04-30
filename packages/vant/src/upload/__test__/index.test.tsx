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

describe('upload', () => {
  it('应该正常渲染上传按钮文案', async () => {
    render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="attachments"
          component={[Upload, {
            uploadText: '上传附件',
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
            uploadText: '上传文件',
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

  it('应该在 afterRead 异步处理后重新同步格式化后的字段值', async () => {
    const afterRead = vi.fn(async (item: any) => {
      item.status = 'uploading'
      await Promise.resolve()
      item.status = 'done'
      item.url = 'https://cdn.example.com/contract.pdf'
    })
    const form = createForm()
    const file = new File(['hello'], 'contract.pdf', { type: 'application/pdf' })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="attachments"
          component={[Upload, {
            afterRead,
            formatValue: fileList => fileList?.map(item => item.url),
            uploadText: '上传文件',
          }]}
        />
      </FormProvider>
    ))

    await uploadFile(container, file)

    await vi.waitFor(() => {
      expect(afterRead).toHaveBeenCalledOnce()
    })

    await vi.waitFor(() => {
      expect(form.values.attachments).toEqual(['https://cdn.example.com/contract.pdf'])
    })

    const field = form.query('attachments').take() as FormilyField

    expect(field.dataSource?.[0]?.status).toBe('done')
    expect(field.dataSource?.[0]?.url).toBe('https://cdn.example.com/contract.pdf')
  })

  it('应该在 afterRead 失败时移除本次选择的文件', async () => {
    const afterRead = vi.fn(async (item: any) => {
      item.status = 'uploading'
      throw new Error('上传失败')
    })
    const form = createForm()
    const file = new File(['hello'], 'broken.png', { type: 'image/png' })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="attachments"
          component={[Upload, {
            afterRead,
            formatValue: fileList => fileList?.map(item => item.url),
            uploadText: '上传文件',
          }]}
        />
      </FormProvider>
    ))

    await uploadFile(container, file)

    await vi.waitFor(() => {
      expect(afterRead).toHaveBeenCalledOnce()
      expect(form.values.attachments).toEqual([])
    })

    const field = form.query('attachments').take() as FormilyField

    expect(field.dataSource).toEqual([])
    expect(container.textContent).not.toContain('上传失败')
  })

  it('应该支持通过 field.invoke 获取 Uploader 实例', async () => {
    const form = createForm()

    render(() => (
      <FormProvider form={form}>
        <Field
          name="attachments"
          component={[Upload, {
            uploadText: '上传文件',
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
    expect(container.querySelector('.van-uploader__wrapper--disabled')).toBeFalsy()
    expect(container.querySelector<HTMLElement>('.van-uploader__upload')?.style.display).toBe('none')
    expect(container.querySelector('.van-uploader__preview-delete')).toBeFalsy()
  })

  it('应该支持在 readPretty 模式下配置文件打开逻辑', async () => {
    const previewFile = vi.fn()
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="attachments"
          initialValue={[
            { name: '营业执照.pdf', url: 'https://cdn.example.com/license.pdf' },
          ]}
          readPretty={true}
          component={[Upload, { previewFile }]}
        />
      </FormProvider>
    ))

    container.querySelector<HTMLElement>('.van-uploader__preview')?.click()

    await vi.waitFor(() => {
      expect(previewFile).toHaveBeenCalledOnce()
    })

    expect(previewFile).toHaveBeenCalledWith(
      expect.objectContaining({
        name: '营业执照.pdf',
        url: 'https://cdn.example.com/license.pdf',
      }),
      expect.objectContaining({
        fileList: [
          expect.objectContaining({
            name: '营业执照.pdf',
            url: 'https://cdn.example.com/license.pdf',
          }),
        ],
        index: 0,
      }),
    )
  })
})
