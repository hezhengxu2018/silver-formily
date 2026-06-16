import { DesignerCore } from '@silver-formily/designer-core'
import { createElementPlusDesignerPreset } from '@silver-formily/designer-materials-element-plus'
import { markRaw } from 'vue'

const preset = createElementPlusDesignerPreset()

export const previewComponents = preset.previewComponents

export const designer = markRaw(new DesignerCore({
  materials: preset.materials,
  schema: {
    componentName: 'Form',
    title: 'Customer Profile',
    metadata: {
      designer: {
        container: true,
        defaultContainer: 'children',
        containers: [
          { name: 'children', title: 'Body' },
        ],
      },
    },
    children: [
      {
        componentName: 'Input',
        title: 'Full Name',
        props: {
          placeholder: 'Please enter full name',
          clearable: true,
        },
      },
      {
        componentName: 'Select',
        title: 'Status',
        props: {
          placeholder: 'Select customer status',
          clearable: true,
          options: [
            { label: 'Lead', value: 'lead' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'Customer', value: 'customer' },
          ],
        },
      },
    ],
  },
}))
