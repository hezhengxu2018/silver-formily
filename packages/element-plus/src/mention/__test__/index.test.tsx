import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import Mention from '../index'
import 'element-plus/theme-chalk/index.css'

const options = [
  { value: 'Formily', label: 'Formily' },
  { value: 'ElementPlus', label: 'Element Plus' },
  { value: 'Vue', label: 'Vue.js' },
]

function getInputEl(container: Element) {
  const textarea = container.querySelector('textarea')
  if (textarea) {
    return textarea
  }
  return container.querySelector('input')
}

const mentionSlots = {
  header: ({ field }: { field: any }) => <div class="mention-header">{field?.title}</div>,
  label: ({ item, index, field }: { item: any, index: number, field: any }) => (
    <div class="mention-label">{[index, item.label, field?.path].filter(Boolean).join(' / ')}</div>
  ),
  footer: ({ field }: { field: any }) => <div class="mention-footer">{field?.value}</div>,
}

const mentionAllSlots = {
  prefix: () => <span class="mention-prefix">@</span>,
  suffix: () => <span class="mention-suffix">#</span>,
  prepend: () => <span class="mention-prepend">PRE</span>,
  append: () => <span class="mention-append">APP</span>,
  loading: () => <div class="mention-loading">loading</div>,
}

describe('mention', () => {
  describe('基础功能', () => {
    it('应该支持选择提及项并更新表单值', async () => {
      const form = createForm()
      const { container } = render(() => (
        <FormProvider form={form}>
          <Field name="content" component={[Mention]} dataSource={options} />
        </FormProvider>
      ))

      const input = getInputEl(container)
      expect(input).toBeTruthy()
      await userEvent.click(input!)
      await userEvent.type(input!, '@Fo')

      await vi.waitFor(() => {
        const dropdownItems = document.querySelectorAll('.el-mention-dropdown__item')
        expect(dropdownItems.length).toBeGreaterThan(0)
      })

      const firstOption = document.querySelector('.el-mention-dropdown__item')!
      await userEvent.click(firstOption)

      expect(form.values.content).toBe('@Formily ')
    })
  })

  describe('插槽', () => {
    it('应该向下拉插槽注入 field 引用', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="content"
            title="提及内容"
            initialValue="@Formily "
            component={[Mention]}
            dataSource={options}
            v-slots={mentionSlots}
          />
        </FormProvider>
      ))

      const input = getInputEl(container)
      expect(input).toBeTruthy()
      await userEvent.click(input!)
      await userEvent.type(input!, '@')

      await vi.waitFor(() => {
        expect(document.querySelector('.mention-label')).toBeInTheDocument()
      })

      expect(document.querySelector('.mention-header')?.textContent).toBe('提及内容')
      expect(document.querySelector('.mention-footer')?.textContent).toBe('@Formily @')
      expect(document.querySelector('.mention-label')?.textContent).toContain('content')
    })

    it('should render prefix/suffix/prepend/append/loading slots', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field
            name="content"
            component={[Mention]}
            dataSource={options}
            loading={true}
            v-slots={mentionAllSlots}
          />
        </FormProvider>
      ))

      expect(document.querySelector('.mention-prefix')).toBeInTheDocument()
      expect(document.querySelector('.mention-suffix')).toBeInTheDocument()
      expect(document.querySelector('.mention-prepend')).toBeInTheDocument()
      expect(document.querySelector('.mention-append')).toBeInTheDocument()

      const input = getInputEl(container)
      expect(input).toBeTruthy()
      await userEvent.click(input!)
      await userEvent.type(input!, '@')

      await vi.waitFor(() => {
        expect(document.querySelector('.el-mention-dropdown__loading')).toBeInTheDocument()
        expect(document.querySelector('.mention-loading')).toBeInTheDocument()
      })
    })
  })

  describe('事件扩展', () => {
    it('search 事件应该注入 field 引用', async () => {
      const onSearch = vi.fn()
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="content" component={[Mention]} dataSource={options} onSearch={onSearch} />
        </FormProvider>
      ))

      const input = getInputEl(container)
      expect(input).toBeTruthy()
      await userEvent.click(input!)
      await userEvent.type(input!, '@V')

      await vi.waitFor(() => {
        expect(onSearch).toHaveBeenCalled()
      })

      const lastCall = onSearch.mock.calls.at(-1)
      const fieldArg = lastCall[2]
      expect(fieldArg?.path.toString()).toBe('content')
    })
  })

  describe('readPretty', () => {
    it('应该在只读态下展示预览文本', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="summary" component={[Mention]} readPretty initialValue="@Formily " />
        </FormProvider>
      ))

      await vi.waitFor(() => {
        expect(document.querySelector('.el-mention')).not.toBeInTheDocument()
      })

      const preview = document.querySelector('.formily-element-plus-preview-text')
      expect(preview).toBeInTheDocument()
      expect(preview?.textContent?.trim()).toContain('@Formily')
    })
  })
})
