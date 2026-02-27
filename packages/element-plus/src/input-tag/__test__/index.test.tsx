import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import InputTag from '../index'
import 'element-plus/theme-chalk/index.css'

describe('inputTag', () => {
  describe('基础功能', () => {
    it('应该正常渲染并支持添加标签', async () => {
      const form = createForm()
      const page = render(() => (
        <FormProvider form={form}>
          <Field name="tags" component={[InputTag, { placeholder: '请输入标签' }]} />
        </FormProvider>
      ))

      await expect.element(page.getByPlaceholder('请输入标签')).toBeInTheDocument()
      const input = document.querySelector<HTMLInputElement>('input')!
      await userEvent.type(input, 'Vue')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(input, 'React')
      await userEvent.keyboard('{Enter}')

      expect(form.values.tags).toEqual(['Vue', 'React'])
      expect(document.querySelectorAll('.el-tag')).toHaveLength(2)
    })

    it('应该支持移除标签', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="tags" component={[InputTag]} initialValue={['Vue', 'React']} />
        </FormProvider>
      ))

      const closeButton = document.querySelector<HTMLSpanElement>('.el-tag__close')!
      await userEvent.click(closeButton)

      await vi.waitFor(() => {
        expect(form.values.tags).toEqual(['React'])
        expect(document.querySelectorAll('.el-tag')).toHaveLength(1)
      })
    })

    it('应该遵循最大标签数量限制', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="tags" component={[InputTag, { max: 2 }]} />
        </FormProvider>
      ))

      const input = document.querySelector<HTMLInputElement>('input')!
      await userEvent.type(input, 'Vue')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(input, 'React')
      await userEvent.keyboard('{Enter}')
      await userEvent.type(input, 'Svelte')
      await userEvent.keyboard('{Enter}')

      await vi.waitFor(() => {
        expect(form.values.tags).toEqual(['Vue', 'React'])
        expect(document.querySelectorAll('.el-tag')).toHaveLength(2)
      })
    })
  })

  describe('插槽', () => {
    it('应该支持 prefix、suffix 与 tag 插槽', async () => {
      const page = render(() => (
        <FormProvider form={createForm()}>
          <Field name="tags" component={[InputTag]} initialValue={['Vue']}>
            {{
              tag: ({ value, index }) => <span class="custom-tag">{`${value}-${index}`}</span>,
              prefix: () => <span class="custom-prefix">标签</span>,
              suffix: () => <span class="custom-suffix">按 Enter 添加</span>,
            }}
          </Field>
        </FormProvider>
      ))

      await expect.element(page.getByText('标签')).toBeInTheDocument()
      await expect.element(page.getByText('按 Enter 添加')).toBeInTheDocument()
      const customTag = document.querySelector('.custom-tag')
      expect(customTag?.textContent?.trim()).toBe('Vue-0')
    })
  })

  describe('readPretty', () => {
    it('应该在只读态下展示预览标签', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="tags" component={[InputTag]} readPretty={true} initialValue={['Vue', 'React']} />
        </FormProvider>
      ))

      await vi.waitFor(() => {
        expect(document.querySelector('.el-input-tag')).not.toBeInTheDocument()
        expect(document.querySelectorAll('.el-tag')).toHaveLength(2)
      })
    })
  })
})
