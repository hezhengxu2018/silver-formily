import type { TreeSelectProps } from 'antd'
import { FormButtonGroup, FormItem, Submit, TreeSelect } from '@silver-formily/antd'
import { createForm } from '@silver-formily/core'
import { Field, FormProvider } from '@silver-formily/react'

const initialNodes = [
  { id: 'a', pId: null, value: 'a', title: '展开选项 A', isLeaf: false, selectable: false },
  { id: 'b', pId: null, value: 'b', title: '展开选项 B', isLeaf: false, selectable: false },
]

const form = createForm()

export default function Demo() {
  const loadData: TreeSelectProps['loadData'] = async (node) => {
    // 用本地延迟模拟接口请求，实际使用时替换为请求子节点的 API。
    await new Promise(resolve => setTimeout(resolve, 800))
    const parentId = String(node.value)
    form.setFieldState('select', (field) => {
      const nodes = field.dataSource ?? []
      if (nodes.some(item => item.pId === parentId))
        return
      field.dataSource = [
        ...nodes,
        ...[1, 2, 3].map(index => ({
          id: `${parentId}-${index}`,
          pId: parentId,
          value: `${parentId}-${index}`,
          title: `选项 ${parentId.toUpperCase()}-${index}`,
          isLeaf: true,
        })),
      ]
    })
  }

  return (
    <FormProvider form={form}>
      <Field
        name="select"
        title="异步加载节点"
        dataSource={initialNodes}
        decorator={[FormItem]}
        component={[
          TreeSelect,
          {
            treeDataSimpleMode: true,
            loadData,
            showSearch: false,
            allowClear: true,
            placeholder: '展开父节点加载子选项',
            style: { width: 280 },
          },
        ]}
      />
      <FormButtonGroup>
        <Submit onSubmitFailed={console.log} onSubmit={console.log}>提交</Submit>
      </FormButtonGroup>
    </FormProvider>
  )
}
