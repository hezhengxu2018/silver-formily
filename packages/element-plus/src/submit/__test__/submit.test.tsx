import { createForm } from '@formily/core'
import { FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { Submit } from '../index'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-button.css'

describe('submit', () => {
  describe('基础功能', async () => {
    it('应该正常渲染', async () => {
      const { getByRole } = render(() => (
        <Submit>提交</Submit>
      ))
      await expect.element(getByRole('button')).toBeInTheDocument()
      await expect.element(getByRole('button')).toHaveTextContent('提交')
    })

    it('应该支持点击事件', async () => {
      const onClick = vi.fn()
      const { getByRole } = render(() => (
        <Submit onClick={onClick}>提交</Submit>
      ))
      await getByRole('button').click()
      expect(onClick).toHaveBeenCalled()
    })

    it('应该支持阻止提交', async () => {
      const onClick = vi.fn().mockReturnValue(false)
      const onSubmit = vi.fn()
      const { getByRole } = render(() => (
        <Submit onClick={onClick} onSubmit={onSubmit}>提交</Submit>
      ))
      await getByRole('button').click()
      expect(onClick).toHaveBeenCalled()
      expect(onSubmit).not.toHaveBeenCalled()
    })
  })

  describe('表单交互', async () => {
    it('应该支持表单提交', async () => {
      const form = createForm()
      const onSubmit = vi.fn().mockResolvedValue('success')
      const onSubmitSuccess = vi.fn()

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Submit
            onSubmit={onSubmit}
            onSubmitSuccess={onSubmitSuccess}
          >
            提交
          </Submit>
        </FormProvider>
      ))

      await getByRole('button').click()
      expect(onSubmit).toHaveBeenCalled()
      await expect(onSubmitSuccess).toHaveBeenCalledWith('success')
    })

    it('应该支持提交失败处理', async () => {
      const form = createForm()
      const error = new Error('提交失败')
      const onSubmit = vi.fn().mockRejectedValue(error)
      const onSubmitFailed = vi.fn()

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Submit
            onSubmit={onSubmit}
            onSubmitFailed={onSubmitFailed}
          >
            提交
          </Submit>
        </FormProvider>
      ))

      await getByRole('button').click()
      expect(onSubmit).toHaveBeenCalled()
      await expect(onSubmitFailed).toHaveBeenCalledWith(error)
    })

    it('应该显示加载状态', async () => {
      const form = createForm()
      // 模拟长时间运行的提交
      const onSubmit = vi.fn().mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(() => resolve('success'), 1000)
        })
      })

      const { getByRole } = render(() => (
        <FormProvider form={form}>
          <Submit onSubmit={onSubmit}>提交</Submit>
        </FormProvider>
      ))

      const button = getByRole('button')
      await button.click()
      expect(button.selector.includes('is-loading'))
      expect(onSubmit).toHaveBeenCalled()
    })
  })

  describe('属性传递', async () => {
    it('应该支持自定义按钮类型', async () => {
      const { getByRole } = render(() => (
        <Submit type="danger">删除</Submit>
      ))
      expect(getByRole('button', { name: '提交' }).selector.includes('el-button--danger'))
    })

    it('应该支持禁用状态', async () => {
      const onClick = vi.fn()
      const { getByRole } = render(() => (
        <Submit disabled onClick={onClick}>提交</Submit>
      ))
      await expect.element(getByRole('button', { name: '提交' })).toBeDisabled()
    })
  })
})
