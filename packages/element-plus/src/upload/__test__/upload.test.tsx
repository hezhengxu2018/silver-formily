import type { UploadFiles } from 'element-plus'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { Upload } from '../index'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-upload.css'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-icon.css'
import 'element-plus/theme-chalk/el-image-viewer.css'

describe('upload', () => {
  describe('基础功能', async () => {
    it('应该正常渲染', async () => {
      const { getByText } = render(() => (
        <Upload action="#" textContent="上传" />
      ))
      await expect.element(getByText('上传')).toBeInTheDocument()
    })

    it('应该支持自定义文本内容', async () => {
      const { getByText } = render(() => (
        <Upload action="#" textContent="上传文件" />
      ))
      await expect.element(getByText('上传文件')).toBeInTheDocument()
    })

    it('应该支持拖拽上传模式', async () => {
      const { container } = render(() => (
        <Upload action="#" drag textContent="拖拽上传" />
      ))
      await expect.element(container.querySelector('.el-upload-dragger')).toBeInTheDocument()
      await expect.element(container.querySelector('.el-upload__text')).toHaveTextContent('拖拽上传')
    })

    it('应该支持卡片上传模式', async () => {
      const { container } = render(() => (
        <Upload action="#" listType="picture-card" />
      ))
      await expect.element(container.querySelector('.el-upload--picture-card')).toBeInTheDocument()
    })
  })

  describe('表单交互', async () => {
    it('应该在上传文件后表单的值经过formatValue的转化', async () => {
      const form = createForm()
      const file = new File(['file'], 'file.png', { type: 'image/png' })
      const file2 = new File(['file2'], 'file2.png', { type: 'image/png' })
      const httpRequest = vi.fn().mockImplementation(async (options) => {
        return `http://example.com/${options.file.name}`
      })

      const mockFormatValue = vi.fn((fileList: UploadFiles) => fileList.map(file => file.response))

      const { container } = render(() => (
        <FormProvider form={form}>
          <Field
            name="upload"
            component={[Upload, {
              action: '#',
              httpRequest,
              textContent: '上传文件',
              autoUpload: true,
              formatValue: mockFormatValue,
            }]}
          />
        </FormProvider>
      ))
      const input = container.querySelector('input')
      await userEvent.upload(input, file)
      expect(httpRequest).toHaveBeenCalled()
      expect(form.values.upload).toEqual(['http://example.com/file.png'])
      await userEvent.upload(input, file2)
      expect(form.values.upload).toEqual(['http://example.com/file.png', 'http://example.com/file2.png'])
    })

    it('应该在limit = 1时新选择的值替换原有文件', async () => {
      const form = createForm()
      const file = new File(['file'], 'file.png', { type: 'image/png' })
      const file2 = new File(['file2'], 'file2.png', { type: 'image/png' })
      // 模拟自定义上传请求函数，直接返回成功
      const httpRequest = vi.fn().mockImplementation(async (options) => {
        return `http://example.com/${options.file.name}`
      })

      const { container } = render(() => (
        <FormProvider form={form}>
          <Field
            name="upload"
            component={[Upload, {
              action: '#',
              httpRequest,
              textContent: '上传文件',
              autoUpload: true,
              limit: 1,
              formatValue: (fileList: UploadFiles) => fileList.map(file => file.response),
            }]}
          />
        </FormProvider>
      ))
      const input = container.querySelector('input')
      await userEvent.upload(input, file)
      expect(httpRequest).toHaveBeenCalled()
      expect(form.values.upload).toEqual(['http://example.com/file.png'])
      await userEvent.upload(input, file2)
      expect(form.values.upload).toEqual(['http://example.com/file2.png'])
    })

    it('应该在关闭自动上传时表单的值经过formatValue的转化', async () => {
      const form = createForm()
      const file = new File(['file'], 'file.png', { type: 'image/png' })
      const file2 = new File(['file2'], 'file2.png', { type: 'image/png' })
      const httpRequest = vi.fn().mockImplementation(async (options) => {
        return `http://example.com/${options.file.name}`
      })
      const mockFormatValue = vi.fn((fileList: UploadFiles) => fileList.map(file => file.raw.name))
      const { container } = render(() => (
        <FormProvider form={form}>
          <Field
            name="upload"
            component={[Upload, {
              action: '#',
              httpRequest,
              textContent: '上传文件',
              autoUpload: false,
              formatValue: mockFormatValue,
            }]}
          />
        </FormProvider>
      ))
      const input = container.querySelector('input')
      await userEvent.upload(input, file)
      expect(httpRequest).not.toHaveBeenCalled()
      expect(form.values.upload).toEqual(['file.png'])
      await userEvent.upload(input, file2)
      expect(form.values.upload).toEqual(['file.png', 'file2.png'])
    })
  })

  describe('事件触发', () => {
    it('应该on Error', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
      try {
        const form = createForm()
        const file = new File(['file'], 'file.png', { type: 'image/png' })
        const httpRequest = vi.fn().mockImplementation(async (options: any) => {
          options.onError?.(new Error('上传失败'))
          return undefined
        })

        const mockFormatValue = vi.fn((fileList: UploadFiles) => fileList.map(file => file.response))
        const mockOnError = vi.fn()

        const { container } = render(() => (
          <FormProvider form={form}>
            <Field
              name="upload"
              component={[Upload, {
                action: '#',
                textContent: '上传文件',
                httpRequest,
                autoUpload: true,
                formatValue: mockFormatValue,
                onError: mockOnError,
              }]}
            />
          </FormProvider>
        ))
        const input = container.querySelector('input')
        await userEvent.upload(input, file)
        expect(httpRequest).toHaveBeenCalled()
        expect(mockOnError).toHaveBeenCalled()
        expect(mockFormatValue).toHaveBeenCalled()
      }
      finally {
        consoleErrorSpy.mockRestore()
      }
    })

    it('应该on Exceed', async () => {
      const form = createForm()
      const file = new File(['file'], 'file.png', { type: 'image/png' })
      const file2 = new File(['file2'], 'file2.png', { type: 'image/png' })
      const file3 = new File(['file3'], 'file3.png', { type: 'image/png' })
      const httpRequest = vi.fn().mockImplementation(async (options) => {
        return `http://example.com/${options.file.name}`
      })

      const mockExceed = vi.fn()

      const { container } = render(() => (
        <FormProvider form={form}>
          <Field
            name="upload"
            component={[Upload, {
              action: '#',
              textContent: '上传文件',
              httpRequest,
              limit: 2,
              autoUpload: true,
              onExceed: mockExceed,
            }]}
          />
        </FormProvider>
      ))
      const input = container.querySelector('input')
      await userEvent.upload(input, file)
      await userEvent.upload(input, file2)
      expect(mockExceed).not.toHaveBeenCalled()
      await userEvent.upload(input, file3)
      expect(mockExceed).toHaveBeenCalledOnce()
    })

    it('应该on Remove', async () => {
      const form = createForm()
      const file = new File(['file'], 'file.png', { type: 'image/png' })
      const file2 = new File(['file2'], 'file2.png', { type: 'image/png' })
      const file3 = new File(['file3'], 'file3.png', { type: 'image/png' })
      const httpRequest = vi.fn().mockImplementation(async (options) => {
        return `http://example.com/${options.file.name}`
      })

      const mockRemove = vi.fn()

      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="upload"
            component={[Upload, {
              action: '#',
              textContent: '上传文件',
              httpRequest,
              autoUpload: true,
              onRemove: mockRemove,
            }]}
          />
        </FormProvider>
      ))
      const input = container.querySelector('input')
      await userEvent.upload(input, file)
      await userEvent.upload(input, file2)
      await userEvent.upload(input, file3)
      await expect.element(getByText('file3')).toBeInTheDocument()
      await getByText('file3').hover()
      const IconClose3 = getByText('file3').element().parentElement.parentElement.parentElement.querySelector('.el-icon--close')
      expect(IconClose3).toBeVisible()
      await userEvent.click(IconClose3)
      expect(mockRemove).toHaveBeenCalledOnce()
    })

    it('应该支持图片预览', async () => {
      const form = createForm()
      const file = new File(['file'], 'file.text', { type: 'palin/text' })
      const httpRequest = vi.fn().mockImplementation(async (options) => {
        return `http://example.com/${options.file.name}`
      })
      const mockPreview = vi.fn()

      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="upload"
            component={[Upload, {
              action: '#',
              textContent: '上传文件',
              httpRequest,
              autoUpload: true,
              onPreview: mockPreview,
            }]}
          />
        </FormProvider>
      ))
      const input = container.querySelector('input')
      await userEvent.upload(input, file)
      await expect.element(getByText('file')).toBeInTheDocument()
      await getByText('file').click()
      expect(mockPreview).toHaveBeenCalledOnce()
    })
  })

  describe('插槽功能', async () => {
    it('应该支持默认插槽', async () => {
      const { getByText } = render(() => (
        <Upload action="#">
          <div>自定义上传按钮</div>
        </Upload>
      ))

      await expect.element(getByText('自定义上传按钮')).toBeInTheDocument()
    })

    it('应该支持tip插槽', async () => {
      const { getByText } = render(() => (
        <Upload action="#">
          {{
            tip: () => <div>上传提示信息</div>,
          }}
        </Upload>
      ))

      await expect.element(getByText('上传提示信息')).toBeInTheDocument()
    })

    it('应该支持trigger插槽', async () => {
      const { getByText } = render(() => (
        <Upload action="#">
          {{
            trigger: () => <div>trigger的内容</div>,
            default: () => <div>默认的内容</div>,
          }}
        </Upload>
      ))

      await expect.element(getByText('trigger的内容')).toBeInTheDocument()
      await expect.element(getByText('默认的内容')).toBeInTheDocument()
    })

    it('应该支持file插槽', async () => {
      const { container, getByText } = render(() => (
        <Upload action="#">
          {{
            file: ({ file, index }) => {
              return <div>{`${file.name}-${index}`}</div>
            },
            default: () => <div>默认的内容</div>,
          }}
        </Upload>
      ))
      const file = new File(['file'], 'file.png', { type: 'image/png' })
      const input = container.querySelector('input')
      await userEvent.upload(input, file)
      await expect.element(getByText('file.png-0')).toBeInTheDocument()
      await expect.element(getByText('默认的内容')).toBeInTheDocument()
    })
  })

  describe('组件封装新增交互', async () => {
    it('应该在当文件类型是图片时默认支持图片预览时正确处理', async () => {
      const form = createForm()
      const httpRequest = vi.fn().mockImplementation(async (options) => {
        return `http://example.com/${options.file.name}`
      })

      const file = new File(['file'], 'file.png', { type: 'image/png' })

      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="upload"
            component={[Upload, {
              action: '#',
              httpRequest,
              textContent: '上传文件',
              autoUpload: true,
              accept: 'image/*',
            }]}
          />
        </FormProvider>
      ))

      const input = container.querySelector('input')
      await userEvent.upload(input, file)
      await expect.element(getByText('file.png')).toBeInTheDocument()
      await getByText('file.png').click()
      await expect.element(document.querySelector('.el-image-viewer__wrapper')).toBeInTheDocument()
      await userEvent.keyboard('{Escape}')
      expect(document.querySelector('.el-image-viewer__wrapper')).toBeNull()
    })

    it('应该在当文件类型不是图片时关闭图片预览时正确处理', async () => {
      const form = createForm()
      const httpRequest = vi.fn().mockImplementation(async (options) => {
        return `http://example.com/${options.file.name}`
      })

      const file = new File(['file'], 'file.txt', { type: 'text/plain' })

      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="upload"
            component={[Upload, {
              action: '#',
              httpRequest,
              textContent: '上传文件',
              autoUpload: true,
              accept: 'text/*',
            }]}
          />
        </FormProvider>
      ))

      const input = container.querySelector('input')
      await userEvent.upload(input, file)
      await expect.element(getByText('file.txt')).toBeInTheDocument()
      await getByText('file.txt').click()
      expect(document.querySelector('.el-image-viewer__wrapper')).toBeNull()
    })

    it('应该支持获取ElUpload实例', async () => {
      const form = createForm()

      const { getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="upload"
            component={[Upload, {
              action: '#',
              textContent: '上传文件',
            }]}
          />
        </FormProvider>
      ))

      await expect.element(getByText('上传文件')).toBeInTheDocument()
      const uploadRef = form.query('upload').take().invoke('getElUploadRef')
      expect(uploadRef.value).toBeInstanceOf(Object)
    })
  })
})
