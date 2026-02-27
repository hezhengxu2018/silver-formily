import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Checkbox from '../index'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-checkbox.css'

describe('checkbox-group', () => {
  describe('基础数据展示及交互', async () => {
    it('应该正常渲染', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="checkbox"
            component={[Checkbox.Group]}
            dataSource={[
              { label: '标签1', value: '1' },
              { label: '标签2', value: '2' },
            ]}
          />
        </FormProvider>
      ))
      await expect.element(getByText('标签1')).toBeInTheDocument()
      await getByText('标签1').click()
      expect(form.values.checkbox).toEqual(['1'])
      await getByText('标签2').click()
      expect(form.values.checkbox).toEqual(['1', '2'])
    })

    it('应该正确返显数据', async () => {
      const form = createForm()
      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field
            name="checkbox"
            initialValue={['1']}
            component={[Checkbox.Group]}
            dataSource={[
              { label: '标签1', value: '1' },
              { label: '标签2', value: '2' },
            ]}
          />
        </FormProvider>
      ))
      await expect
        .element(getByRole('checkbox', { name: '标签1' }))
        .toBeChecked()
      form.setValues({
        checkbox: ['2'],
      })
      await expect.element(getByRole('checkbox', { name: '标签1' })).not.toBeChecked()
      await expect.element(getByRole('checkbox', { name: '标签2' })).toBeChecked()
    })

    it('应该支持禁用状态', async () => {
      const form = createForm()
      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field
            name="checkbox"
            disabled
            component={[Checkbox.Group]}
            dataSource={[
              { label: '标签1', value: '1' },
              { label: '标签2', value: '2' },
            ]}
          />
        </FormProvider>
      ))

      await expect.element(getByRole('checkbox', { name: '标签1' })).toBeDisabled()
      await expect.element(getByRole('checkbox', { name: '标签2' })).toBeDisabled()
    })

    it('应该支持字符串数组作为选项', async () => {
      const form = createForm()
      const { getByRole, getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="checkbox"
            component={[Checkbox.Group]}
            dataSource={['选项1', '选项2']}
          />
        </FormProvider>
      ))

      await expect.element(getByRole('checkbox', { name: '选项1' })).toBeInTheDocument()
      await expect.element(getByRole('checkbox', { name: '选项2' })).toBeInTheDocument()

      await getByText('选项1').click()
      expect(form.values.checkbox).toEqual(['选项1'])
    })
  })

  describe('使用插槽渲染', async () => {
    it('应该正确渲染', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="checkbox"
            component={[Checkbox.Group]}
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
            name="checkbox"
            component={[
              Checkbox.Group,
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
      // 检查是否渲染了按钮样式的复选框
      expect(container.querySelector('.el-checkbox-button')).toBeTruthy()
    })
  })
})
