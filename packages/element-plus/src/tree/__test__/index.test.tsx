import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import { FormItem, FormLayout, Tree } from '../../index'
import 'element-plus/theme-chalk/index.css'

const mockData = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]

describe('tree', () => {
  describe('基础功能', () => {
    it('应该正常渲染', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))
      await expect.element(container.querySelector('.el-tree')).toBeInTheDocument()
      await expect.element(container.querySelector('.el-tree-node')).toBeInTheDocument()
      await expect.element(container.querySelector('.el-checkbox')).toBeInTheDocument()
    })

    it('应该支持点击节点勾选功能', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
      })

      // 通过获取复选框元素来点击
      const leafNodeCheckbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(leafNodeCheckbox)

      // 验证选中状态
      await vi.waitFor(() => {
        expect(form.values.tree).toContain(9)
      })
    })

    it('应该支持点击父节点勾选所有子节点', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level one 2')).toBeInTheDocument()
      })

      // 通过获取复选框元素来点击父节点
      const parentNodeCheckbox = getByText('Level one 2').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(parentNodeCheckbox)

      // 验证父节点和所有子节点都被选中
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(values).toContain(2) // 父节点
        expect(values).toContain(5) // 子节点1
        expect(values).toContain(6) // 子节点2
      })
    })

    it('获取TreeSelect实例引用', async () => {
      const form = createForm()
      render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      const field = form.query('tree').take()
      const treeRef = field.invoke('getTreeRef')

      expect(treeRef).toBeDefined()
    })
  })

  describe('valueType 功能', () => {
    it('应该valueType=all 点击节点返回所有选中节点', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
        expect(getByText('Level three 1-1-2')).toBeInTheDocument()
      })

      // 分别点击两个叶子节点的复选框
      const leafNode1Checkbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      const leafNode2Checkbox = getByText('Level three 1-1-2').element().parentNode.querySelector('.el-checkbox')

      await userEvent.click(leafNode1Checkbox)
      await userEvent.click(leafNode2Checkbox)

      // 验证所有相关节点都被选中
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(values).toContain(1) // 根节点
        expect(values).toContain(4) // 中间节点
        expect(values).toContain(9) // 叶子节点1
        expect(values).toContain(10) // 叶子节点2
      })
    })

    it('应该valueType=parent 点击节点优先返回父节点', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'parent',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level two 1-1')).toBeInTheDocument()
      })

      // 点击中间节点的复选框
      const middleNodeCheckbox = getByText('Level two 1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(middleNodeCheckbox)

      // 验证只返回父节点
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(values).not.toContain(9) // 不包含子节点
        expect(values).not.toContain(10) // 不包含子节点
        expect(values).toEqual([1])
      })
    })

    it('应该valueType=child 点击节点仅返回子节点', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'child',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level two 1-1')).toBeInTheDocument()
      })

      // 点击中间节点的复选框
      const middleNodeCheckbox = getByText('Level two 1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(middleNodeCheckbox)

      // 验证只返回叶子节点
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(values).toContain(9) // 叶子节点1
        expect(values).toContain(10) // 叶子节点2
        expect(values).not.toContain(4) // 不包含中间节点
        expect(values).not.toContain(1) // 不包含根节点
      })
    })

    it('应该支持optionFormatter 基础功能', async () => {
      const form = createForm()
      const mockFormatter = vi.fn((node, index, array) => ({
        ...node,
        formatted: true,
        index,
        arrayLength: array.length,
      }))

      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                optionAsValue: true,
                optionFormatter: mockFormatter,
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
      })

      // 点击叶子节点
      const leafNodeCheckbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(leafNodeCheckbox)

      // 验证 optionFormatter 被调用且返回格式化后的数据
      await vi.waitFor(() => {
        expect(mockFormatter).toHaveBeenCalled()
        const values = form.values.tree || []
        expect(Array.isArray(values)).toBe(true)

        // 验证返回的节点都经过了格式化
        for (const node of values) {
          expect(node).toHaveProperty('formatted', true)
          expect(node).toHaveProperty('index')
          expect(node).toHaveProperty('arrayLength')
          expect(typeof node.index).toBe('number')
          expect(typeof node.arrayLength).toBe('number')
        }
      })
    })
  })

  describe('checkStrictly 功能', () => {
    it('应该支持checkStrictly=true 父子节点不关联点击', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                checkStrictly: true,
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level one 1')).toBeInTheDocument()
        expect(getByText('Level two 1-1')).toBeInTheDocument()
      })

      // 点击父节点的复选框
      const parentNodeCheckbox = getByText('Level one 1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(parentNodeCheckbox)

      // 验证只有父节点被选中，子节点不受影响
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(values).toContain(1) // 父节点被选中
        expect(values).not.toContain(4) // 子节点不被选中
        expect(values).not.toContain(9) // 孙节点不被选中
      })
    })
  })

  describe('禁用状态', () => {
    it('应该disabled=true 节点处于禁用状态', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
              disabled={true}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
      })

      // 验证复选框处于禁用状态
      const leafNodeCheckbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox input')
      expect(leafNodeCheckbox).toHaveAttribute('disabled')

      // 验证初始值为空
      expect(form.values.tree).toBeUndefined()
    })
  })

  describe('事件处理', () => {
    it('应该选中节点时触发 change 事件', async () => {
      const form = createForm()
      const onChange = vi.fn()

      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
              reactions={(field) => {
                field.onInput = onChange
              }}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
      })

      // 点击节点的复选框
      const leafNodeCheckbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(leafNodeCheckbox)

      // 验证事件被触发
      await vi.waitFor(() => {
        expect(onChange).toHaveBeenCalled()
      })
    })

    it('应该多次点击节点测试选中/取消选中', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
      })

      const leafNodeCheckbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')

      // 第一次点击 - 选中
      await userEvent.click(leafNodeCheckbox)
      await vi.waitFor(() => {
        expect(form.values.tree).toContain(9)
      })

      // 第二次点击 - 取消选中
      await userEvent.click(leafNodeCheckbox)
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(values).not.toContain(9)
      })
    })
  })

  describe('边界情况', () => {
    it('应该支持空数据源', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
              }]}
              dataSource={[]}
            />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(container.querySelector('.el-tree')).toBeInTheDocument()
    })

    it('应该无效的初始值', async () => {
      const form = createForm()
      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
              }]}
              dataSource={mockData}
              initialValue={[999]} // 不存在的节点 ID
            />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(container.querySelector('.el-tree')).toBeInTheDocument()
    })

    it('应该undefined 初始值', async () => {
      const form = createForm()
      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
              }]}
              dataSource={mockData}
              initialValue={undefined}
            />
          </FormLayout>
        </FormProvider>
      ))

      await expect.element(container.querySelector('.el-tree')).toBeInTheDocument()
    })
  })
  describe('valueType=path 功能测试', () => {
    it('应该valueType=path 设置初始值时正确提取叶子节点', async () => {
      const pathValue = [
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              children: [
                {
                  id: 9,
                  label: 'Level three 1-1-1',
                },
                {
                  id: 10,
                  label: 'Level three 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 5,
              label: 'Level two 2-1',
            },
          ],
        },
      ]

      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'path',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
              initialValue={pathValue}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
        expect(getByText('Level three 1-1-2')).toBeInTheDocument()
        expect(getByText('Level two 2-1')).toBeInTheDocument()
      })

      // 验证叶子节点被正确选中（extractKeysFromPath 函数的作用）
      await vi.waitFor(() => {
        // 检查叶子节点的复选框是否被选中
        const leafNode1Checkbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox input')
        const leafNode2Checkbox = getByText('Level three 1-1-2').element().parentNode.querySelector('.el-checkbox input')
        const leafNode3Checkbox = getByText('Level two 2-1').element().parentNode.querySelector('.el-checkbox input')

        expect(leafNode1Checkbox).toBeChecked()
        expect(leafNode2Checkbox).toBeChecked()
        expect(leafNode3Checkbox).toBeChecked()
      })
    })

    it('应该valueType=path 点击节点后返回完整路径', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'path',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
      })

      // 点击叶子节点
      const leafNodeCheckbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(leafNodeCheckbox)

      // 验证返回的是完整路径结构
      await vi.waitFor(() => {
        const value = form.values.tree
        expect(Array.isArray(value)).toBe(true)
        expect(value.length).toBeGreaterThan(0)

        // 验证路径结构包含父节点信息
        const pathNode = value[0]
        expect(pathNode).toHaveProperty('id', 1)
        expect(pathNode).toHaveProperty('label', 'Level one 1')
        expect(pathNode).toHaveProperty('children')
        expect(pathNode.children[0]).toHaveProperty('id', 4)
        expect(pathNode.children[0].children[0]).toHaveProperty('id', 9)
      })
    })

    it('应该valueType=path 空路径数组处理', async () => {
      const form = createForm()
      const { container } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'path',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
              initialValue={[]}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 验证空数组不会导致错误
      await vi.waitFor(() => {
        expect(container.querySelector('.el-tree')).toBeInTheDocument()
        expect(form.values.tree).toEqual([])
      })
    })

    it('应该支持valueType=path 复杂路径结构', async () => {
      const complexPathValue = [
        {
          id: 3,
          label: 'Level one 3',
          children: [
            {
              id: 7,
              label: 'Level two 3-1',
            },
            {
              id: 8,
              label: 'Level two 3-2',
            },
          ],
        },
      ]

      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'path',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
              initialValue={complexPathValue}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level two 3-1')).toBeInTheDocument()
        expect(getByText('Level two 3-2')).toBeInTheDocument()
      })

      // 验证多个叶子节点都被正确选中
      await vi.waitFor(() => {
        const leafNode1Checkbox = getByText('Level two 3-1').element().parentNode.querySelector('.el-checkbox input')
        const leafNode2Checkbox = getByText('Level two 3-2').element().parentNode.querySelector('.el-checkbox input')

        expect(leafNode1Checkbox).toBeChecked()
        expect(leafNode2Checkbox).toBeChecked()
      })
    })
  })

  describe('includeHalfChecked 功能', () => {
    it('应该includeHalfChecked=true 包含半选节点', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                includeHalfChecked: true,
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
        expect(getByText('Level two 1-1')).toBeInTheDocument()
        expect(getByText('Level one 1')).toBeInTheDocument()
      })

      // 只点击一个叶子节点，这会导致父节点处于半选状态
      const leafNodeCheckbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(leafNodeCheckbox)

      // 验证包含半选节点
      await vi.waitFor(() => {
        const values = form.values.tree || []
        // 应该包含选中的叶子节点
        expect(values).toContain(9) // Level three 1-1-1
        // 应该包含半选的父节点
        expect(values).toContain(4) // Level two 1-1 (半选)
        expect(values).toContain(1) // Level one 1 (半选)
      })
    })

    it('应该includeHalfChecked=false 不包含半选节点', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                includeHalfChecked: false,
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
      })

      // 只点击一个叶子节点
      const leafNodeCheckbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(leafNodeCheckbox)

      // 验证不包含半选节点
      await vi.waitFor(() => {
        const values = form.values.tree || []
        // 只包含选中的叶子节点
        expect(values).toContain(9) // Level three 1-1-1
        // 不包含半选的父节点
        expect(values).not.toContain(4) // Level two 1-1 (半选，不应包含)
        expect(values).not.toContain(1) // Level one 1 (半选，不应包含)
      })
    })

    it('应该支持includeHalfChecked=true 多个半选节点', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                includeHalfChecked: true,
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level two 2-1')).toBeInTheDocument()
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
      })

      // 点击不同分支的叶子节点，创建多个半选状态
      const leafNode1Checkbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      const leafNode2Checkbox = getByText('Level two 2-1').element().parentNode.querySelector('.el-checkbox')

      await userEvent.click(leafNode1Checkbox)
      await userEvent.click(leafNode2Checkbox)

      // 验证包含所有半选节点
      await vi.waitFor(() => {
        const values = form.values.tree || []
        // 选中的叶子节点
        expect(values).toContain(9) // Level three 1-1-1
        expect(values).toContain(5) // Level two 2-1
        // 半选的父节点
        expect(values).toContain(1) // Level one 1 (半选)
        expect(values).toContain(2) // Level one 2 (半选)
        expect(values).toContain(4) // Level two 1-1 (半选)
      })
    })

    it('应该includeHalfChecked=true 与 optionAsValue=true 结合使用', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                includeHalfChecked: true,
                optionAsValue: true,
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
      })

      // 点击叶子节点
      const leafNodeCheckbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(leafNodeCheckbox)

      // 验证返回节点对象且包含半选节点
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(Array.isArray(values)).toBe(true)
        expect(values.length).toBeGreaterThan(1) // 应该包含选中节点和半选节点

        // 验证返回的是对象而不是key
        for (const node of values) {
          expect(typeof node).toBe('object')
          expect(node).toHaveProperty('id')
          expect(node).toHaveProperty('label')
        }
      })
    })

    it('应该includeHalfChecked=true 全选后取消部分选择产生半选', async () => {
      const form = createForm()
      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                includeHalfChecked: true,
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level two 1-1')).toBeInTheDocument()
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
        expect(getByText('Level three 1-1-2')).toBeInTheDocument()
      })

      // 先点击父节点全选
      const parentNodeCheckbox = getByText('Level two 1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(parentNodeCheckbox)

      // 再取消选择一个子节点
      const leafNodeCheckbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(leafNodeCheckbox)

      // 验证父节点变为半选状态并被包含在结果中
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(values).toContain(10) // Level three 1-1-2 (仍然选中)
        expect(values).toContain(4) // Level two 1-1 (半选状态)
        expect(values).toContain(1) // Level one 1 (半选状态)
        expect(values).not.toContain(9) // Level three 1-1-1 (已取消选择)
      })
    })
  })

  describe('属性变化时重新处理选中状态', () => {
    it('应该valueType 变化时重新处理选中状态', async () => {
      const form = createForm()

      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
        expect(getByText('Level three 1-1-2')).toBeInTheDocument()
      })

      // 选中两个叶子节点
      const leafNode1Checkbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      const leafNode2Checkbox = getByText('Level three 1-1-2').element().parentNode.querySelector('.el-checkbox')

      await userEvent.click(leafNode1Checkbox)
      await userEvent.click(leafNode2Checkbox)

      // 验证 valueType=all 时的返回值
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(values).toContain(1) // 根节点
        expect(values).toContain(4) // 中间节点
        expect(values).toContain(9) // 叶子节点1
        expect(values).toContain(10) // 叶子节点2
      })

      form.query('tree').take().setComponentProps({
        nodeKey: 'id',
        valueType: 'child',
        defaultExpandAll: true,
      })

      // 验证 valueType=child 时的返回值（只包含叶子节点）
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(values).toContain(9) // 叶子节点1
        expect(values).toContain(10) // 叶子节点2
        expect(values).not.toContain(1) // 不包含根节点
        expect(values).not.toContain(4) // 不包含中间节点
      })
    })

    it('应该在多个属性同时变化时重新处理选中状态', async () => {
      const form = createForm()

      const { getByText } = render(() => (
        <FormProvider form={form}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all' as const,
                optionAsValue: false,
                includeHalfChecked: false,
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            />
          </FormLayout>
        </FormProvider>
      ))

      // 等待组件渲染完成
      await vi.waitFor(() => {
        expect(getByText('Level three 1-1-1')).toBeInTheDocument()
      })

      // 选中一个叶子节点
      const leafNodeCheckbox = getByText('Level three 1-1-1').element().parentNode.querySelector('.el-checkbox')
      await userEvent.click(leafNodeCheckbox)

      // 验证初始状态
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(values).toContain(9) // 叶子节点
        expect(typeof values[0]).toBe('number') // 返回 key 值
      })

      form.query('tree').take().setComponentProps({
        nodeKey: 'id',
        valueType: 'child',
        optionAsValue: true,
        includeHalfChecked: true,
        defaultExpandAll: true,
      })

      // 验证多个属性变化后的状态
      await vi.waitFor(() => {
        const values = form.values.tree || []
        expect(Array.isArray(values)).toBe(true)

        // 验证返回的是对象（optionAsValue=true）
        for (const node of values) {
          expect(typeof node).toBe('object')
          expect(node).toHaveProperty('id')
          expect(node).toHaveProperty('label')
        }

        // 验证只包含叶子节点（valueType=child）
        const leafNodeExists = values.some(node => node.id === 9)
        expect(leafNodeExists).toBe(true)
      })
    })
  })

  describe('插槽继承功能', () => {
    it('自定义节点内容插槽正常传递', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                defaultExpandAll: true,
              }]}
              dataSource={mockData}
            >
              {{
                default: ({ _, data }) => (
                  <span class="custom-tree-node">
                    <span class="custom-label">
                      自定义:
                      {data.label}
                    </span>
                    <span class="custom-id">
                      ID:
                      {data.id}
                    </span>
                  </span>
                ),
              }}
            </Field>
          </FormLayout>
        </FormProvider>
      ))
      await expect.element(container.querySelector('.custom-tree-node')).toBeInTheDocument()
      await expect.element(container.querySelector('.custom-label')).toBeInTheDocument()
      await expect.element(container.querySelector('.custom-id')).toBeInTheDocument()
    })

    it('空插槽正常传递', async () => {
      const { container } = render(() => (
        <FormProvider form={createForm()}>
          <FormLayout>
            <Field
              name="tree"
              title="树形控件"
              decorator={[FormItem]}
              component={[Tree, {
                nodeKey: 'id',
                valueType: 'all',
                defaultExpandAll: true,
                emptyText: '暂无数据',
              }]}
              dataSource={[]}
            >
              {{
                empty: () => (
                  <div class="custom-empty">
                    <span class="empty-icon">📁</span>
                    <span class="empty-text">自定义空状态提示</span>
                  </div>
                ),
              }}
            </Field>
          </FormLayout>
        </FormProvider>
      ))

      // 验证自定义空状态插槽被正确渲染
      await vi.waitFor(() => {
        expect(container.querySelector('.custom-empty')).toBeInTheDocument()
        expect(container.querySelector('.empty-icon')).toBeInTheDocument()
        expect(container.querySelector('.empty-text')).toBeInTheDocument()
      })
    })
  })
})
