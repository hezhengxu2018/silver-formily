import type { Field as FormilyField } from '@formily/core'
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import Radio from '../index'
import 'element-plus/theme-chalk/index.css'

describe('radio-group', () => {
  describe('基础数据展示及交互', async () => {
    it('应该正常渲染', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="radio"
            component={[Radio.Group]}
            dataSource={[
              { label: '标签1', value: '1' },
              { label: '标签2', value: '2' },
            ]}
          />
        </FormProvider>
      ))
      await expect.element(getByText('标签1')).toBeInTheDocument()
      await getByText('标签1').click()
      expect(form.values.radio).toEqual('1')
      await getByText('标签2').click()
      expect(form.values.radio).toEqual('2')
    })

    it('应该正确返显数据', async () => {
      const form = createForm()
      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field
            name="radio"
            initialValue="1"
            component={[Radio.Group]}
            dataSource={[
              { label: '标签1', value: '1' },
              { label: '标签2', value: '2' },
            ]}
          />
        </FormProvider>
      ))
      await expect
        .element(getByRole('radio', { name: '标签1' }))
        .toBeChecked()
      form.setValues({
        radio: '2',
      })
      await expect.element(getByRole('radio', { name: '标签1' })).not.toBeChecked()
      await expect.element(getByRole('radio', { name: '标签2' })).toBeChecked()
    })

    it('应该支持禁用状态', async () => {
      const form = createForm()
      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field
            name="radio"
            disabled
            component={[Radio.Group]}
            dataSource={[
              { label: '标签1', value: '1' },
              { label: '标签2', value: '2' },
            ]}
          />
        </FormProvider>
      ))

      await expect.element(getByRole('radio', { name: '标签1' })).toBeDisabled()
      await expect.element(getByRole('radio', { name: '标签2' })).toBeDisabled()
    })

    it('应该支持字符串数组作为选项', async () => {
      const form = createForm()
      const { getByRole, getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="radio"
            component={[Radio.Group]}
            dataSource={['选项1', '选项2']}
          />
        </FormProvider>
      ))

      await expect.element(getByRole('radio', { name: '选项1' })).toBeInTheDocument()
      await expect.element(getByRole('radio', { name: '选项2' })).toBeInTheDocument()

      await getByText('选项1').click()
      expect(form.values.radio).toEqual('选项1')
    })

    it('应该在 dataSource 异步更新后渲染选项', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="radio"
            component={[Radio.Group]}
            dataSource={[]}
          />
        </FormProvider>
      ))

      const field = form.query('radio').take<FormilyField>((field: FormilyField) => field)
      field?.setDataSource([
        { label: '标签1', value: '1' },
        { label: '标签2', value: '2' },
      ])

      await expect.element(getByText('标签1')).toBeInTheDocument()
      await expect.element(getByText('标签2')).toBeInTheDocument()
    })

    it('应该在 dataSource 初始为 null 时保持稳定并在更新后渲染选项', async () => {
      const form = createForm()
      const { container, getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="radio"
            component={[Radio.Group]}
            dataSource={null as any}
          />
        </FormProvider>
      ))

      expect(container.textContent).not.toContain('标签1')

      const field = form.query('radio').take<FormilyField>((field: FormilyField) => field)
      field?.setDataSource([
        { label: '标签1', value: '1' },
        { label: '标签2', value: '2' },
      ])

      await expect.element(getByText('标签1')).toBeInTheDocument()
      await expect.element(getByText('标签2')).toBeInTheDocument()
    })
  })

  describe('使用插槽渲染', async () => {
    it('应该正确渲染', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="radio"
            component={[Radio.Group]}
            dataSource={[
              { label: '标签1', value: '1' },
              { label: '标签2', value: '2' },
            ]}
          >
            {{
              option: ({ option }) => `使用插槽渲染的${option.label}`,
            }}
          </Field>
        </FormProvider>
      ))
      await expect.element(getByText('使用插槽渲染的标签1')).toBeInTheDocument()
      await expect.element(getByText('使用插槽渲染的标签2')).toBeInTheDocument()
    })
  })

  describe('按钮模式', async () => {
    it('应该渲染为按钮样式', async () => {
      const form = createForm()
      const { container } = render(() => (
        <FormProvider form={form}>
          <Field
            name="radio"
            component={[
              Radio.Group,
              {
                optionType: 'button',
              },
            ]}
            dataSource={[
              { label: '标签1', value: '1' },
              { label: '标签2', value: '2' },
            ]}
          />
        </FormProvider>
      ))
      // 检查是否渲染了按钮样式的单选框
      expect(container.querySelector('.el-radio-button')).toBeTruthy()
    })
  })

  describe('readPretty', async () => {
    it('应该在 dataSource 异步更新后同步显示标签文本', async () => {
      const form = createForm({
        values: {
          radio: '1',
        },
      })

      render(() => (
        <FormProvider form={form}>
          <Field
            name="radio"
            component={[Radio.Group]}
            dataSource={[]}
            readPretty={true}
          />
        </FormProvider>
      ))

      await vi.waitFor(() => {
        expect(document.body.textContent).toContain('1')
      })

      const field = form.query('radio').take<FormilyField>((field: FormilyField) => field)
      field?.setDataSource([
        { label: '标签1', value: '1' },
        { label: '标签2', value: '2' },
      ])

      await vi.waitFor(() => {
        expect(document.body.textContent).toContain('标签1')
        expect(document.body.textContent).not.toContain('>1<')
      })
    })

    it('应该在 dataSource 初始为 null 时更新后显示标签文本', async () => {
      const form = createForm({
        values: {
          radio: '1',
        },
      })

      render(() => (
        <FormProvider form={form}>
          <Field
            name="radio"
            component={[Radio.Group]}
            dataSource={null as any}
            readPretty={true}
          />
        </FormProvider>
      ))

      await vi.waitFor(() => {
        expect(document.body.textContent).toContain('1')
      })

      const field = form.query('radio').take<FormilyField>((field: FormilyField) => field)
      field?.setDataSource([
        { label: '标签1', value: '1' },
        { label: '标签2', value: '2' },
      ])

      await vi.waitFor(() => {
        expect(document.body.textContent).toContain('标签1')
      })
    })
  })
})
