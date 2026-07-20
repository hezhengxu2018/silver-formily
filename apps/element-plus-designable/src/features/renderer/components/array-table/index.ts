import { createBehavior } from '@silver-formily/designer-core'
import { ArrayTable as ElementPlusArrayTable } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'
import Preview from './Preview.vue'

export const ArrayTable = defineElementPlusComponent({
  component: ElementPlusArrayTable,
  componentName: 'ArrayTable',
  defaultProps: { title: 'Array Table' },
  decorator: false,
  description: 'Table list for array fields',
  icon: 'ArrayTable',
  previewComponent: Preview,
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
    name: 'ArrayTable.Items',
    extends: ['Field'],
    selector: node =>
      node.props?.type === 'object'
      && node.parent?.props?.['x-component'] === 'ArrayTable',
    designerProps: {
      droppable: true,
      allowAppend: (_, sources) =>
        sources?.every(source => source.props?.['x-component'] === 'ArrayTable.Column') ?? true,
    },
  },
  {
    name: 'ArrayTable.Column',
    extends: ['Field'],
    selector: node => node.props?.['x-component'] === 'ArrayTable.Column',
    designerProps: {
      droppable: true,
      allowDrop: parent =>
        parent.props?.type === 'object'
        && parent.parent?.props?.['x-component'] === 'ArrayTable',
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
