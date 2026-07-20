import { TreeSelect as ElementPlusTreeSelect } from '@silver-formily/element-plus'
import { defineElementPlusComponent } from '../defineElementPlusComponent'

export const TreeSelect = defineElementPlusComponent({
  component: ElementPlusTreeSelect,
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
