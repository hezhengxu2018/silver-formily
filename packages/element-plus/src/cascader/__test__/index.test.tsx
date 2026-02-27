import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import Cascader from '../index'
import 'element-plus/theme-chalk/index.css'

const options = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        children: [
          {
            value: 'yizhi',
            label: '一致',
          },
          {
            value: 'fankui',
            label: '反馈',
          },
        ],
      },
      {
        value: 'daohang',
        label: '导航',
        children: [
          {
            value: 'cexiangdaohang',
            label: '侧向导航',
          },
          {
            value: 'dingbudaohang',
            label: '顶部导航',
          },
        ],
      },
    ],
  },
  {
    value: 'zujian',
    label: '组件',
    children: [
      {
        value: 'basic',
        label: '基础',
        children: [
          {
            value: 'layout',
            label: '布局',
          },
          {
            value: 'color',
            label: '颜色',
          },
        ],
      },
      {
        value: 'form',
        label: '表单',
        children: [
          {
            value: 'input',
            label: '输入框',
          },
          {
            value: 'select',
            label: '选择器',
          },
        ],
      },
    ],
  },
]

describe('cascader', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const page = render(() => (
        <FormProvider form={createForm()}>
          <Field name="cascader" component={[Cascader]} dataSource={options} />
        </FormProvider>
      ))
      await expect.element(page.getByRole('textbox')).toBeInTheDocument()
    })

    it('应该点击展开选项', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="cascader" component={[Cascader]} dataSource={options} />
        </FormProvider>
      ))

      const cascaderDOM = document.querySelector('.el-cascader')
      await userEvent.click(cascaderDOM)

      // 检查下拉菜单是否显示
      const dropdownMenu = document.querySelector('.el-cascader__dropdown')
      expect(dropdownMenu).toBeInTheDocument()

      // 检查一级选项是否正确显示
      const firstLevelOptions = document.querySelectorAll('.el-cascader-menu')[0].querySelectorAll('.el-cascader-node')
      expect(firstLevelOptions).toHaveLength(2)
      expect(firstLevelOptions[0].textContent).toContain('指南')
      expect(firstLevelOptions[1].textContent).toContain('组件')
    })
  })

  describe('表单交互', () => {
    it('应该在选择值时更新表单', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="cascader" component={[Cascader]} dataSource={options} />
        </FormProvider>
      ))

      const cascaderDOM = document.querySelector('.el-cascader')
      await userEvent.click(cascaderDOM)

      const firstLevelOptions = document.querySelectorAll('.el-cascader-menu')[0].querySelectorAll('.el-cascader-node')
      await userEvent.click(firstLevelOptions[0])
      const secondLevelOptions = document.querySelectorAll('.el-cascader-menu')[1].querySelectorAll('.el-cascader-node')
      await userEvent.click(secondLevelOptions[0])
      const thirdLevelOptions = document.querySelectorAll('.el-cascader-menu')[2].querySelectorAll('.el-cascader-node')
      await userEvent.click(thirdLevelOptions[0])

      expect(form.values.cascader).toEqual(['zhinan', 'shejiyuanze', 'yizhi'])
    })

    it('应该支持多选模式', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <Field name="cascader" component={[Cascader, { props: { multiple: true } }]} dataSource={options} />
        </FormProvider>
      ))

      const cascaderDOM = document.querySelector('.el-cascader')
      await userEvent.click(cascaderDOM)

      let firstCheckbox: HTMLElement | null = null
      await vi.waitFor(() => {
        firstCheckbox = document.querySelector('.el-cascader__dropdown .el-checkbox') as HTMLElement | null
        expect(firstCheckbox).toBeTruthy()
      })
      await userEvent.click(firstCheckbox!)

      expect(form.values.cascader).toHaveLength(4)
    })
  })

  describe('属性传递', () => {
    it('应该支持禁用状态', async () => {
      const { getByRole } = render(() => (
        <FormProvider form={createForm()}>
          <Field name="cascader" component={[Cascader, { disabled: true }]} dataSource={options} />
        </FormProvider>
      ))

      const cascader = getByRole('textbox')
      expect(cascader.element().closest('.el-cascader')).toHaveClass('is-disabled')
    })
  })

  describe('插槽支持', () => {
    it('应该自定义节点内容', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="cascader" component={[Cascader]} dataSource={options}>
            {{
              default: ({ _, data }) => (
                <div class="custom-node">{`自定义节点:${data.label}`}</div>
              ),
            }}
          </Field>
        </FormProvider>
      ))

      const cascaderDOM = document.querySelector('.el-cascader')
      await userEvent.click(cascaderDOM)
      const customNode = document.querySelector('.custom-node')
      expect(customNode).toBeInTheDocument()
      expect(customNode.textContent).toContain('自定义节点:指南')
    })

    it('应该空数据插槽', async () => {
      render(() => (
        <FormProvider form={createForm()}>
          <Field name="cascader" component={[Cascader]} dataSource={[]}>
            {{
              empty: () => <div class="custom-empty">自定义空数据提示</div>,
            }}
          </Field>
        </FormProvider>
      ))

      const cascaderDOM = document.querySelector('.el-cascader')
      await userEvent.click(cascaderDOM)

      const customEmpty = document.querySelector('.custom-empty')
      expect(customEmpty).toBeInTheDocument()
      expect(customEmpty.textContent).toEqual('自定义空数据提示')
    })
  })
})
