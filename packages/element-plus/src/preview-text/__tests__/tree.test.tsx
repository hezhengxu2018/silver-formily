import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Tree from '../../tree'
import 'element-plus/theme-chalk/index.css'

describe('previewText.Tree', () => {
  // 树形数据
  const treeData = [
    {
      id: 1,
      label: '一级 1',
      children: [
        {
          id: 4,
          label: '二级 1-1',
          children: [
            {
              id: 9,
              label: '三级 1-1-1',
            },
            {
              id: 10,
              label: '三级 1-1-2',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: '一级 2',
      children: [
        {
          id: 5,
          label: '二级 2-1',
        },
        {
          id: 6,
          label: '二级 2-2',
        },
      ],
    },
    {
      id: 3,
      label: '一级 3',
      children: [
        {
          id: 7,
          label: '二级 3-1',
        },
        {
          id: 8,
          label: '二级 3-2',
        },
      ],
    },
  ]

  it('应该正确显示选中的节点（在all模式下）', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={[9, 10, 5]}
            readPretty={true}
            component={[Tree, { nodeKey: 'id', valueType: 'all' }]}
            dataSource={treeData}
          />
        </FormProvider>
      ),
    )

    // 应该显示选中节点的路径结构
    const treeNodes = container.querySelectorAll('.el-tree-node')
    expect(treeNodes.length).toBeGreaterThan(0)

    // 检查是否包含选中节点的标签
    expect(container.textContent).toContain('一级 1')
    expect(container.textContent).toContain('二级 1-1')
    expect(container.textContent).toContain('三级 1-1-1')
    expect(container.textContent).toContain('三级 1-1-2')
    expect(container.textContent).toContain('一级 2')
    expect(container.textContent).toContain('二级 2-1')
  })

  it('应该正确显示路径模式下的数据', async () => {
    const pathData = [
      {
        id: 1,
        label: '一级 1',
        children: [
          {
            id: 4,
            label: '二级 1-1',
            children: [
              {
                id: 9,
                label: '三级 1-1-1',
              },
            ],
          },
        ],
      },
    ]

    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={pathData}
            readPretty={true}
            component={[Tree, { nodeKey: 'id', valueType: 'path' }]}
            dataSource={treeData}
          />
        </FormProvider>
      ),
    )

    // 应该显示路径数据
    expect(container.textContent).toContain('一级 1')
    expect(container.textContent).toContain('二级 1-1')
    expect(container.textContent).toContain('三级 1-1-1')
  })

  it('应该支持自定义 props 配置', async () => {
    const customTreeData = [
      {
        key: 1,
        name: '节点1',
        items: [
          {
            key: 2,
            name: '子节点1',
            items: [],
          },
        ],
      },
    ]

    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={[2]}
            readPretty={true}
            component={[
              Tree,
              {
                nodeKey: 'key',
                valueType: 'all',
                props: {
                  children: 'items',
                  label: 'name',
                },
              },
            ]}
            dataSource={customTreeData}
          />
        </FormProvider>
      ),
    )

    expect(container.textContent).toContain('节点1')
    expect(container.textContent).toContain('子节点1')
  })

  it('应该在没有选中数据时显示占位符', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={[]}
            readPretty={true}
            component={[Tree, { nodeKey: 'id' }]}
            dataSource={treeData}
          />
        </FormProvider>
      ),
    )

    expect(container.textContent).toContain('N/A')
  })

  it('应该在值为 null 时显示占位符', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={null}
            readPretty={true}
            component={[Tree, { nodeKey: 'id' }]}
            dataSource={treeData}
          />
        </FormProvider>
      ),
    )

    expect(container.textContent).toContain('N/A')
  })

  it('应该在值为 undefined 时显示占位符', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            readPretty={true}
            component={[Tree, { nodeKey: 'id' }]}
            dataSource={treeData}
          />
        </FormProvider>
      ),
    )

    expect(container.textContent).toContain('N/A')
  })

  it('应该支持 height 和 maxHeight 属性', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={[9]}
            readPretty={true}
            component={[
              Tree,
              {
                nodeKey: 'id',
                height: 200,
                maxHeight: 300,
              },
            ]}
            dataSource={treeData}
          />
        </FormProvider>
      ),
    )

    const scrollbar = container.querySelector('.el-scrollbar')
    expect(scrollbar).toBeTruthy()
  })

  it('应该正确处理parent模式', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={[4]} // 选中父节点
            readPretty={true}
            component={[Tree, { nodeKey: 'id', valueType: 'parent' }]}
            dataSource={treeData}
          />
        </FormProvider>
      ),
    )

    // 应该显示选中的父节点及其路径
    expect(container.textContent).toContain('一级 1')
    expect(container.textContent).toContain('二级 1-1')
  })

  it('应该正确处理child模式', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={[9]} // 选中子节点
            readPretty={true}
            component={[Tree, { nodeKey: 'id', valueType: 'child' }]}
            dataSource={treeData}
          />
        </FormProvider>
      ),
    )

    // 应该显示选中的子节点及其路径
    expect(container.textContent).toContain('一级 1')
    expect(container.textContent).toContain('二级 1-1')
    expect(container.textContent).toContain('三级 1-1-1')
  })

  it('应该正确处理多个选中节点', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={[9, 5, 7]}
            readPretty={true}
            component={[Tree, { nodeKey: 'id', valueType: 'all' }]}
            dataSource={treeData}
          />
        </FormProvider>
      ),
    )

    // 应该显示所有选中节点的路径
    expect(container.textContent).toContain('一级 1')
    expect(container.textContent).toContain('二级 1-1')
    expect(container.textContent).toContain('三级 1-1-1')
    expect(container.textContent).toContain('一级 2')
    expect(container.textContent).toContain('二级 2-1')
    expect(container.textContent).toContain('一级 3')
    expect(container.textContent).toContain('二级 3-1')
  })

  it('应该正确处理空的树数据', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={[1, 2]}
            readPretty={true}
            component={[Tree, { nodeKey: 'id' }]}
            dataSource={[]}
          />
        </FormProvider>
      ),
    )

    expect(container.textContent).toContain('N/A')
  })

  it('应该正确处理不存在的节点ID', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={[999]} // 不存在的节点ID
            readPretty={true}
            component={[Tree, { nodeKey: 'id' }]}
            dataSource={treeData}
          />
        </FormProvider>
      ),
    )

    // 当没有找到匹配的节点时，应该显示占位符
    expect(container.textContent).toContain('N/A')
  })

  it('应该支持从 field.dataSource 获取数据', async () => {
    const form = createForm()
    const { container } = render(
      () => (
        <FormProvider form={form}>
          <Field
            name="tree"
            initialValue={[9]}
            readPretty={true}
            component={[Tree, { nodeKey: 'id' }]}
            dataSource={treeData}
          />
        </FormProvider>
      ),
    )

    expect(container.textContent).toContain('一级 1')
    expect(container.textContent).toContain('二级 1-1')
    expect(container.textContent).toContain('三级 1-1-1')
  })
})
