import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { Input } from '../../index'
import { Reset } from '../index'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-input.css'

describe('reset', () => {
  describe('基础功能', async () => {
    it('应该正常渲染', async () => {
      const { getByRole } = render(() => (
        <Reset>重置</Reset>
      ))
      await expect.element(getByRole('button', { name: '重置' })).toBeInTheDocument()
    })

    it('应该支持点击事件', async () => {
      const onClick = vi.fn()
      const { getByRole } = render(() => (
        <Reset onClick={onClick}>重置</Reset>
      ))
      await getByRole('button', { name: '重置' }).click()
      expect(onClick).toHaveBeenCalled()
    })

    it('应该支持阻止重置', async () => {
      const form = createForm()
      const onClick = vi.fn().mockReturnValue(false)
      const resetSpy = vi.spyOn(form, 'reset')

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Reset onClick={onClick}>重置</Reset>
        </FormProvider>
      ))

      await getByRole('button', { name: '重置' }).click()
      expect(onClick).toHaveBeenCalled()
      expect(resetSpy).not.toHaveBeenCalled()
    })
  })

  describe('表单交互', async () => {
    it('应该支持普通重置', async () => {
      const form = createForm({
        initialValues: {
          input: '初始值',
        },
      })
      const resetSpy = vi.spyOn(form, 'reset')

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field name="input" component={[Input]} />
          <Reset>重置</Reset>
        </FormProvider>
      ))

      // 修改表单值
      await getByRole('textbox').fill('新值')
      expect(form.values.input).toBe('新值')

      // 点击重置
      await getByRole('button', { name: '重置' }).click()
      expect(resetSpy).toHaveBeenCalledWith('*', { forceClear: false })
      expect(form.values.input).toBe('初始值')
    })

    it('应该支持强制清空重置', async () => {
      const form = createForm({
        initialValues: {
          input: '初始值',
        },
      })
      const resetSpy = vi.spyOn(form, 'reset')

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field name="input" component={[Input]} />
          <Reset forceClear>强制清空</Reset>
        </FormProvider>
      ))

      // 点击重置
      await getByRole('button', { name: '强制清空' }).click()
      expect(resetSpy).toHaveBeenCalledWith('*', { forceClear: true })
      expect(form.values.input).toBe(undefined)
    })

    it('应该支持强制清空重置并校验', async () => {
      const form = createForm()
      const resetSpy = vi.spyOn(form, 'reset')
      const onResetValidateSuccess = vi.fn()

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field
            name="input"
            component={[Input]}
            required
            initialValue="初始值"
          />
          <Reset
            forceClear
            validate
            onResetValidateSuccess={onResetValidateSuccess}
          >
            重置并校验
          </Reset>
        </FormProvider>
      ))

      // 点击重置
      await getByRole('button', { name: '重置并校验' }).click()
      expect(resetSpy).toHaveBeenCalledWith('*', { forceClear: true })

      // 校验应该失败，因为必填字段被清空了
      expect(form.invalid).toBe(true)
    })

    it('应该支持重置校验成功回调', async () => {
      const form = createForm()
      const onResetValidateSuccess = vi.fn()

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field name="input" component={[Input]} />
          <Reset
            validate
            onResetValidateSuccess={onResetValidateSuccess}
          >
            重置
          </Reset>
        </FormProvider>
      ))

      await getByRole('button', { name: '重置' }).click()
      expect(onResetValidateSuccess).toHaveBeenCalled()
    })

    it('应该支持重置校验失败回调', async () => {
      const form = createForm()
      const onResetValidateFailed = vi.fn()

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Field
            name="input"
            component={[Input]}
            required
            initialValue="初始值"
          />
          <Reset
            forceClear
            validate
            onResetValidateFailed={onResetValidateFailed}
          >
            重置
          </Reset>
        </FormProvider>
      ))
      await getByRole('button', { name: '重置' }).click()
      expect(onResetValidateFailed).toHaveBeenCalled()
    })
  })

  describe('属性传递', async () => {
    it('应该支持自定义按钮类型', async () => {
      const { getByRole } = render(() => (
        <Reset type="danger">删除</Reset>
      ))

      const button = getByRole('button', { name: '删除' })
      expect(button.selector.includes('el-button--danger'))
    })

    it('应该支持禁用状态', async () => {
      const onClick = vi.fn()
      const { getByRole } = render(() => (
        <Reset disabled onClick={onClick}>重置</Reset>
      ))

      await expect.element(getByRole('button', { name: '重置' })).toBeDisabled()
    })
  })
})
