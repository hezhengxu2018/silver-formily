import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
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
})
