<script lang="tsx">
import type { TemplateAction } from './LoadTemplate.vue'
import { Columns3, GripVertical, ListOrdered, Settings2 } from '@lucide/vue'
import { TreeNode } from '@silver-formily/designer-core'
import { TreeNodeWidget, useNode } from '@silver-formily/designer-vue'
import { ElEmpty, ElTable, ElTableColumn } from 'element-plus'
import { defineComponent, getCurrentInstance, onMounted } from 'vue'
import { useDropTemplate } from '../../hooks/useDropTemplate'
import { createEnsureTypeItemsNode, findNodeByComponentPath, hasNodeByComponentPath, queryNodesByComponentPath } from '../../shared'
import LoadTemplate from './LoadTemplate.vue'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

function getTableCellNodeId(className?: string) {
  return className?.match(/data-id:(\S+)/)?.[1]
}

const HeaderCell = defineComponent({
  name: 'DnArrayTableHeaderCell',
  inheritAttrs: false,
  props: {
    className: String,
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance()

    onMounted(() => {
      const nodeId = getTableCellNodeId(props.className)
      const element = instance?.proxy?.$el?.parentElement?.parentElement as HTMLElement | undefined
      if (nodeId && element)
        element.setAttribute('data-designer-node-id', nodeId)
    })

    return () => (
      <div class={props.className} data-designer-node-id={getTableCellNodeId(props.className)} style={{ display: 'inline-flex' }}>
        {slots.default?.()}
      </div>
    )
  },
})

const BodyCell = defineComponent({
  name: 'DnArrayTableBodyCell',
  inheritAttrs: false,
  props: {
    className: String,
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance()

    onMounted(() => {
      const nodeId = getTableCellNodeId(props.className)
      const element = instance?.proxy?.$el?.parentElement?.parentElement as HTMLElement | undefined
      if (nodeId && element)
        element.setAttribute('data-designer-node-id', nodeId)
    })

    return () => (
      <div class={props.className} data-designer-node-id={getTableCellNodeId(props.className)} style={{ display: 'inline-flex', width: '100%' }}>
        {slots.default?.()}
      </div>
    )
  },
})

export default defineComponent({
  name: 'DnArrayTablePreview',
  inheritAttrs: false,
  setup(_, { attrs }) {
    const nodeRef = useNode()

    useDropTemplate('ArrayTable', (source) => {
      const sortHandleNode = new TreeNode({
        componentName: 'Field',
        props: {
          'type': 'void',
          'x-component': 'ArrayTable.Column',
          'x-component-props': {
            title: 'Title',
          },
        },
        children: [
          {
            componentName: 'Field',
            props: {
              'type': 'void',
              'x-component': 'ArrayTable.SortHandle',
            },
          },
        ],
      })
      const indexNode = new TreeNode({
        componentName: 'Field',
        props: {
          'type': 'void',
          'x-component': 'ArrayTable.Column',
          'x-component-props': {
            title: 'Title',
          },
        },
        children: [
          {
            componentName: 'Field',
            props: {
              'type': 'void',
              'x-component': 'ArrayTable.Index',
            },
          },
        ],
      })
      const columnNode = new TreeNode({
        componentName: 'Field',
        props: {
          'type': 'void',
          'x-component': 'ArrayTable.Column',
          'x-component-props': {
            title: 'Title',
          },
        },
        children: source,
      })
      const operationNode = new TreeNode({
        componentName: 'Field',
        props: {
          'type': 'void',
          'x-component': 'ArrayTable.Column',
          'x-component-props': {
            title: 'Title',
          },
        },
        children: [
          {
            componentName: 'Field',
            props: {
              'type': 'void',
              'x-component': 'ArrayTable.Remove',
            },
          },
          {
            componentName: 'Field',
            props: {
              'type': 'void',
              'x-component': 'ArrayTable.MoveDown',
            },
          },
          {
            componentName: 'Field',
            props: {
              'type': 'void',
              'x-component': 'ArrayTable.MoveUp',
            },
          },
        ],
      })
      const objectNode = new TreeNode({
        componentName: 'Field',
        props: {
          type: 'object',
        },
        children: [sortHandleNode, indexNode, columnNode, operationNode],
      })
      const additionNode = new TreeNode({
        componentName: 'Field',
        props: {
          'type': 'void',
          'title': 'Addition',
          'x-component': 'ArrayTable.Addition',
        },
      })
      return [objectNode, additionNode]
    })

    useDropTemplate('ArrayTable.Column', (source) => {
      return source.map((child) => {
        if (child.props)
          child.props.title = undefined
        return child
      })
    })

    return () => {
      const node = nodeRef.value
      const columns = node
        ? queryNodesByComponentPath(node, ['ArrayTable', '*', 'ArrayTable.Column'])
        : []
      const tableColumns = columns.length
        ? columns.map((column) => {
            const columnProps = column.props?.['x-component-props'] ?? {}
            const children = column.children.map(child =>
              <TreeNodeWidget key={child.id} node={child} />,
            )
            const title = columnProps.title ?? columnProps.label ?? 'Title'
            const nodeClassName = `data-id:${column.id}`
            return (
              <ElTableColumn {...columnProps} key={column.id} class={nodeClassName} label={title}>
                {{
                  default: () => (
                    <BodyCell {...{ className: nodeClassName }}>
                      {children.length ? children : 'Droppable'}
                    </BodyCell>
                  ),
                  header: () => (
                    <HeaderCell {...{ className: nodeClassName }}>
                      <span data-content-editable="x-component-props.title">{title}</span>
                    </HeaderCell>
                  ),
                }}
              </ElTableColumn>
            )
          })
        : [
            (
              <ElTableColumn label="Title">
                {{
                  default: () => <ElEmpty description="Droppable" imageSize={48} />,
                }}
              </ElTableColumn>
            ),
          ]
      const actions: TemplateAction[] = node
        ? [
            {
              icon: GripVertical,
              title: '添加排序',
              onClick: () => {
                if (hasNodeByComponentPath(node, [
                  'ArrayTable',
                  '*',
                  'ArrayTable.Column',
                  'ArrayTable.SortHandle',
                ])) {
                  return
                }
                const tableColumn = new TreeNode({
                  componentName: 'Field',
                  props: {
                    'type': 'void',
                    'x-component': 'ArrayTable.Column',
                    'x-component-props': {
                      title: '排序',
                    },
                  },
                  children: [
                    {
                      componentName: 'Field',
                      props: {
                        'type': 'void',
                        'x-component': 'ArrayTable.SortHandle',
                      },
                    },
                  ],
                })
                ensureObjectItemsNode(node).prepend(tableColumn)
              },
            },
            {
              icon: ListOrdered,
              title: '添加索引',
              onClick: () => {
                if (hasNodeByComponentPath(node, [
                  'ArrayTable',
                  '*',
                  'ArrayTable.Column',
                  'ArrayTable.Index',
                ])) {
                  return
                }
                const tableColumn = new TreeNode({
                  componentName: 'Field',
                  props: {
                    'type': 'void',
                    'x-component': 'ArrayTable.Column',
                    'x-component-props': {
                      title: '序号',
                    },
                  },
                  children: [
                    {
                      componentName: 'Field',
                      props: {
                        'type': 'void',
                        'x-component': 'ArrayTable.Index',
                      },
                    },
                  ],
                })
                const sortNode = findNodeByComponentPath(node, [
                  'ArrayTable',
                  '*',
                  'ArrayTable.Column',
                  'ArrayTable.SortHandle',
                ])
                if (sortNode)
                  sortNode.parent.insertAfter(tableColumn)
                else
                  ensureObjectItemsNode(node).prepend(tableColumn)
              },
            },
            {
              icon: Columns3,
              title: '添加列',
              onClick: () => {
                const operationNode = findNodeByComponentPath(node, [
                  'ArrayTable',
                  '*',
                  'ArrayTable.Column',
                  name =>
                    name === 'ArrayTable.Remove'
                    || name === 'ArrayTable.MoveDown'
                    || name === 'ArrayTable.MoveUp',
                ])
                const tableColumn = new TreeNode({
                  componentName: 'Field',
                  props: {
                    'type': 'void',
                    'x-component': 'ArrayTable.Column',
                    'x-component-props': {
                      title: 'Title',
                    },
                  },
                })
                if (operationNode)
                  operationNode.parent.insertBefore(tableColumn)
                else
                  ensureObjectItemsNode(node).append(tableColumn)
              },
            },
            {
              icon: Settings2,
              title: '添加操作',
              onClick: () => {
                const oldOperationNode = findNodeByComponentPath(node, [
                  'ArrayTable',
                  '*',
                  'ArrayTable.Column',
                  name =>
                    name === 'ArrayTable.Remove'
                    || name === 'ArrayTable.MoveDown'
                    || name === 'ArrayTable.MoveUp',
                ])
                const oldAdditionNode = findNodeByComponentPath(node, [
                  'ArrayTable',
                  'ArrayTable.Addition',
                ])
                if (!oldOperationNode) {
                  const operationNode = new TreeNode({
                    componentName: 'Field',
                    props: {
                      'type': 'void',
                      'x-component': 'ArrayTable.Column',
                      'x-component-props': {
                        title: '操作',
                      },
                    },
                    children: [
                      {
                        componentName: 'Field',
                        props: {
                          'type': 'void',
                          'x-component': 'ArrayTable.Remove',
                        },
                      },
                      {
                        componentName: 'Field',
                        props: {
                          'type': 'void',
                          'x-component': 'ArrayTable.MoveDown',
                        },
                      },
                      {
                        componentName: 'Field',
                        props: {
                          'type': 'void',
                          'x-component': 'ArrayTable.MoveUp',
                        },
                      },
                    ],
                  })
                  ensureObjectItemsNode(node).append(operationNode)
                }
                if (!oldAdditionNode) {
                  const additionNode = new TreeNode({
                    componentName: 'Field',
                    props: {
                      'type': 'void',
                      'title': 'Addition',
                      'x-component': 'ArrayTable.Addition',
                    },
                  })
                  ensureObjectItemsNode(node).insertAfter(additionNode)
                }
              },
            },
          ]
        : []

      return (
        <div class="dn-designable-array-table">
          <ElTable
            {...attrs}
            border
            data={[{ id: 'preview' }]}
            rowKey="id"
            size="small"
            style={{ marginBottom: '10px', width: '100%' }}
          >
            {tableColumns}
          </ElTable>
          <LoadTemplate actions={actions} />
        </div>
      )
    }
  },
})
</script>
