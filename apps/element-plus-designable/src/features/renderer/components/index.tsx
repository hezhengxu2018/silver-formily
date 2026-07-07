import type { Component } from 'vue'
import type { DesignableComponent } from '../types'
import { Columns3, GripVertical, ListOrdered, Settings2 } from '@lucide/vue'
import { createBehavior, TreeNode } from '@silver-formily/designer-core'
import { TreeNodeWidget, useNode } from '@silver-formily/designer-vue'
import * as ElementPlus from '@silver-formily/element-plus'
import { ElButton, ElCard, ElEmpty, ElTable, ElTableColumn } from 'element-plus'
import { defineComponent, h } from 'vue'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useDropTemplate } from '../hooks/useDropTemplate'
import { createEnsureTypeItemsNode, findNodeByComponentPath, hasNodeByComponentPath, queryNodesByComponentPath } from '../shared'
import { defineElementPlusComponent } from './defineElementPlusComponent'
import { Field } from './Field'
import { Form } from './Form'

export { Field, Form }

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')
const ShadcnButton = Button as any

interface TemplateAction {
  icon: Component
  onClick: () => void
  title: string
}

const LoadTemplate = defineComponent({
  name: 'DnLoadTemplate',
  props: {
    actions: {
      default: () => [],
      type: Array as () => TemplateAction[],
    },
  },
  setup(props) {
    return () => (
      <TooltipProvider delayDuration={100}>
        <div class="dn-load-template">
          {props.actions.map((action) => {
            return (
              <Tooltip key={action.title}>
                <TooltipTrigger asChild>
                  <ShadcnButton
                    aria-label={action.title}
                    class="dn-load-template-action"
                    size="icon"
                    variant="outline"
                    onClick={(event: MouseEvent) => {
                      event.stopPropagation()
                      action.onClick()
                    }}
                    onMousedown={(event: MouseEvent) => {
                      event.stopPropagation()
                    }}
                  >
                    {h(action.icon)}
                  </ShadcnButton>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {action.title}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    )
  },
})

const DesignableArrayTablePreview = defineComponent({
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
            return (
              <ElTableColumn {...columnProps} key={column.id} label={title}>
                {{
                  default: () => children.length ? children : 'Droppable',
                  header: () => <span data-designer-node-id={column.id}>{title}</span>,
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ElButton disabled size="small">Add Item</ElButton>
          </div>
        </div>
      )
    }
  },
})

const DesignableArrayCardsPreview = defineComponent({
  name: 'DnArrayCardsPreview',
  inheritAttrs: false,
  setup(_, { attrs }) {
    const nodeRef = useNode()
    return () => {
      const node = nodeRef.value
      const item = node?.children.find(child => child.props?.type !== 'void')
      const content = item?.children.map(child => <TreeNodeWidget key={child.id} node={child} />)
      return (
        <div class="dn-designable-array-cards">
          <ElCard {...attrs} shadow="never">
            {{
              default: () => content?.length
                ? content
                : <ElEmpty description="Droppable" imageSize={48} />,
              header: () => <span>{String(attrs.title ?? 'Array Cards')}</span>,
            }}
          </ElCard>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <ElButton disabled size="small">Add Item</ElButton>
          </div>
        </div>
      )
    }
  },
})

export const Input = defineElementPlusComponent({
  component: ElementPlus.Input,
  componentName: 'Input',
  defaultProps: { clearable: true, placeholder: 'Please enter' },
  description: 'Single line text input',
  icon: 'Input',
  title: 'Input',
})

export const TextArea = defineElementPlusComponent({
  component: ElementPlus.Input.TextArea,
  componentName: 'Input.TextArea',
  defaultProps: { placeholder: 'Please enter', rows: 3 },
  description: 'Multi-line text input',
  icon: 'TextArea',
  title: 'TextArea',
})

export const Password = defineElementPlusComponent({
  component: ElementPlus.Password,
  componentName: 'Password',
  defaultProps: { clearable: true, placeholder: 'Please enter password' },
  description: 'Password input',
  icon: 'Password',
  title: 'Password',
})

export const InputNumber = defineElementPlusComponent({
  component: ElementPlus.InputNumber,
  componentName: 'InputNumber',
  defaultProps: { controlsPosition: 'right', min: 0 },
  description: 'Numeric input',
  icon: 'Number',
  title: 'Input Number',
  type: 'number',
})

export const Select = defineElementPlusComponent({
  component: ElementPlus.Select,
  componentName: 'Select',
  defaultProps: {
    clearable: true,
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
    placeholder: 'Please select',
  },
  description: 'Dropdown selector',
  icon: 'Select',
  title: 'Select',
})

export const TreeSelect = defineElementPlusComponent({
  component: ElementPlus.TreeSelect,
  componentName: 'TreeSelect',
  defaultProps: {
    data: [
      { label: 'Node 1', value: 'node-1' },
      { label: 'Node 2', value: 'node-2' },
    ],
    placeholder: 'Please select',
  },
  description: 'Tree selector',
  icon: 'TreeSelect',
  title: 'Tree Select',
})

export const Cascader = defineElementPlusComponent({
  component: ElementPlus.Cascader,
  componentName: 'Cascader',
  defaultProps: { clearable: true, placeholder: 'Please select' },
  description: 'Cascading selector',
  icon: 'Cascader',
  title: 'Cascader',
})

export const Checkbox = defineElementPlusComponent({
  component: ElementPlus.Checkbox,
  componentName: 'Checkbox',
  defaultProps: { label: 'Checkbox' },
  description: 'Single checkbox',
  icon: 'Checkbox',
  title: 'Checkbox',
})

export const CheckboxGroup = defineElementPlusComponent({
  component: ElementPlus.Checkbox.Group,
  componentName: 'Checkbox.Group',
  defaultProps: {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
  },
  description: 'Checkbox group',
  icon: 'CheckboxGroup',
  title: 'Checkbox Group',
})

export const Radio = defineElementPlusComponent({
  component: ElementPlus.Radio,
  componentName: 'Radio',
  defaultProps: { label: 'Radio' },
  description: 'Single radio',
  icon: 'Radio',
  title: 'Radio',
})

export const RadioGroup = defineElementPlusComponent({
  component: ElementPlus.Radio.Group,
  componentName: 'Radio.Group',
  defaultProps: {
    options: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
    ],
  },
  description: 'Radio group',
  icon: 'RadioGroup',
  title: 'Radio Group',
})

export const Switch = defineElementPlusComponent({
  component: ElementPlus.Switch,
  componentName: 'Switch',
  description: 'Boolean switch',
  icon: 'Switch',
  title: 'Switch',
  type: 'boolean',
})

export const DatePicker = defineElementPlusComponent({
  component: ElementPlus.DatePicker,
  componentName: 'DatePicker',
  defaultProps: { placeholder: 'Pick a date' },
  description: 'Date picker',
  icon: 'DatePicker',
  title: 'Date Picker',
})

export const TimePicker = defineElementPlusComponent({
  component: ElementPlus.TimePicker,
  componentName: 'TimePicker',
  defaultProps: { placeholder: 'Pick a time' },
  description: 'Time picker',
  icon: 'TimePicker',
  title: 'Time Picker',
})

export const Slider = defineElementPlusComponent({
  component: ElementPlus.Slider,
  componentName: 'Slider',
  description: 'Slider input',
  icon: 'Slider',
  title: 'Slider',
  type: 'number',
})

export const Rate = defineElementPlusComponent({
  component: ElementPlus.Rate,
  componentName: 'Rate',
  description: 'Rating input',
  icon: 'Rate',
  title: 'Rate',
  type: 'number',
})

export const Upload = defineElementPlusComponent({
  component: ElementPlus.Upload,
  componentName: 'Upload',
  description: 'File upload',
  icon: 'Upload',
  title: 'Upload',
})

export const Transfer = defineElementPlusComponent({
  component: ElementPlus.Transfer,
  componentName: 'Transfer',
  defaultProps: { data: [] },
  description: 'Transfer selector',
  icon: 'Transfer',
  title: 'Transfer',
})

export const Text = defineElementPlusComponent({
  component: ElementPlus.PreviewText.Input,
  componentName: 'Text',
  defaultProps: { value: 'Text' },
  description: 'Static text',
  icon: 'Text',
  title: 'Text',
})

export const Card = defineElementPlusComponent({
  component: ElCard,
  componentName: 'Card',
  description: 'Card container',
  icon: 'Card',
  title: 'Card',
})

export const Space = defineElementPlusComponent({
  component: ElementPlus.Space,
  componentName: 'Space',
  description: 'Inline spacing container',
  icon: 'Space',
  title: 'Space',
})

export const ArrayCards = defineElementPlusComponent({
  component: ElementPlus.ArrayCards,
  componentName: 'ArrayCards',
  defaultProps: { title: 'Array Cards' },
  description: 'Card list for array fields',
  icon: 'ArrayCards',
  previewComponent: DesignableArrayCardsPreview,
  title: 'Array Cards',
  type: 'array',
})

export const ArrayTable = defineElementPlusComponent({
  component: ElementPlus.ArrayTable,
  componentName: 'ArrayTable',
  defaultProps: { title: 'Array Table' },
  description: 'Table list for array fields',
  icon: 'ArrayTable',
  previewComponent: DesignableArrayTablePreview,
  title: 'Array Table',
  type: 'array',
})

ArrayTable.Behavior = createBehavior(
  ArrayTable.Behavior ?? [],
  {
    name: 'ArrayTable',
    selector: node => node.props?.['x-component'] === 'ArrayTable',
    designerProps: {
      droppable: true,
    },
  },
  {
    name: 'ArrayTable.Column',
    extends: ['Field'],
    selector: node => node.props?.['x-component'] === 'ArrayTable.Column',
    designerProps: {
      droppable: true,
      allowDrop: target =>
        target.props?.type === 'object'
        && target.parent?.props?.['x-component'] === 'ArrayTable',
      propsSchema: {
        type: 'object',
        properties: {},
      },
    },
    designerLocales: {
      'zh-CN': {
        title: 'ArrayTable Column',
      },
      'en-US': {
        title: 'ArrayTable Column',
      },
    },
  },
)

export const AllComponents: Record<string, DesignableComponent> = {
  ...ElementPlus,
  Field,
  Form,
  'FormItem': ElementPlus.FormItem,
  Input,
  'Input.TextArea': TextArea,
  Password,
  InputNumber,
  Select,
  TreeSelect,
  Cascader,
  Checkbox,
  'Checkbox.Group': CheckboxGroup,
  Radio,
  'Radio.Group': RadioGroup,
  Switch,
  DatePicker,
  TimePicker,
  Slider,
  Rate,
  Upload,
  Transfer,
  Text,
  Card,
  Space,
  ArrayCards,
  ArrayTable,
}

export const RuntimeComponents: Record<string, any> = {
  ...ElementPlus,
  'Card': ElCard,
  'FormItem': ElementPlus.FormItem,
  'Input.TextArea': ElementPlus.Input.TextArea,
  'Text': ElementPlus.PreviewText.Input,
}

export const DesignableComponents = [
  Form,
  Field,
  Input,
  TextArea,
  Password,
  InputNumber,
  Select,
  TreeSelect,
  Cascader,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  DatePicker,
  TimePicker,
  Slider,
  Rate,
  Upload,
  Transfer,
  Text,
  Card,
  Space,
  ArrayCards,
  ArrayTable,
]
