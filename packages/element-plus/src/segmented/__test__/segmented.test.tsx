import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Segmented from '../index'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-segmented.css'

describe('segmented', () => {
  describe('基础数据展示及交互', async () => {
    it('应该正常渲染并更新值', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="segmented"
            component={[Segmented]}
            dataSource={[
              { label: '按天', value: 'day' },
              { label: '按周', value: 'week' },
            ]}
          />
        </FormProvider>
      ))

      await expect.element(getByText('按天')).toBeInTheDocument()
      await getByText('按天').click()
      expect(form.values.segmented).toEqual('day')
      await getByText('按周').click()
      expect(form.values.segmented).toEqual('week')
    })

    it('应该正确返显数据', async () => {
      const form = createForm()
      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field
            name="segmented"
            initialValue="day"
            component={[Segmented]}
            dataSource={[
              { label: '按天', value: 'day' },
              { label: '按周', value: 'week' },
            ]}
          />
        </FormProvider>
      ))

      await expect
        .element(getByRole('radio', { name: '按天' }))
        .toBeChecked()

      form.setValues({
        segmented: 'week',
      })

      await expect.element(getByRole('radio', { name: '按天' })).not.toBeChecked()
      await expect.element(getByRole('radio', { name: '按周' })).toBeChecked()
    })

    it('应该支持禁用状态', async () => {
      const form = createForm()
      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field
            name="segmented"
            disabled
            component={[Segmented]}
            dataSource={[
              { label: '按天', value: 'day' },
              { label: '按周', value: 'week' },
            ]}
          />
        </FormProvider>
      ))

      await expect.element(getByRole('radio', { name: '按天' })).toBeDisabled()
      await expect.element(getByRole('radio', { name: '按周' })).toBeDisabled()
    })

    it('应该支持字符串数组作为选项', async () => {
      const form = createForm()
      const { getByRole, getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="segmented"
            component={[Segmented]}
            dataSource={['选项1', '选项2']}
          />
        </FormProvider>
      ))

      await expect.element(getByRole('radio', { name: '选项1' })).toBeInTheDocument()
      await expect.element(getByRole('radio', { name: '选项2' })).toBeInTheDocument()

      await getByText('选项1').click()
      expect(form.values.segmented).toEqual('选项1')
    })

    it('应该支持选项禁用', async () => {
      const form = createForm()
      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field
            name="segmented"
            component={[Segmented]}
            dataSource={[
              { label: '可用', value: 'enabled' },
              { label: '禁用', value: 'disabled', disabled: true },
            ]}
          />
        </FormProvider>
      ))

      await expect.element(getByRole('radio', { name: '禁用' })).toBeDisabled()
    })
  })

  describe('使用插槽渲染', async () => {
    it('应该正确渲染', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <Field
            name="segmented"
            component={[Segmented]}
            dataSource={[
              { label: '按天', value: 'day' },
              { label: '按周', value: 'week' },
            ]}
          >
            {{
              default: ({ item }) => {
                const label = typeof item === 'object' ? item.label : item
                return `使用插槽渲染的${label}`
              },
            }}
          </Field>
        </FormProvider>
      ))

      await expect.element(getByText('使用插槽渲染的按天')).toBeInTheDocument()
      await expect.element(getByText('使用插槽渲染的按周')).toBeInTheDocument()
    })
  })
})
