import type { DesignerMaterialDefinition } from '@silver-formily/designer-core'
import type { Component } from 'vue'
import { DesignerCore } from '@silver-formily/designer-core'
import { Input, Select } from '@silver-formily/element-plus'
import { defineComponent, h, markRaw } from 'vue'

const materials: DesignerMaterialDefinition[] = [
  {
    name: 'Input',
    title: 'Input',
    group: 'Fields',
    runtimeComponent: 'Input',
    previewComponent: 'Input',
    defaultNode: {
      componentName: 'Input',
      title: 'Input',
      props: {
        placeholder: 'Please enter',
        clearable: false,
      },
    },
  },
  {
    name: 'Select',
    title: 'Select',
    group: 'Fields',
    runtimeComponent: 'Select',
    previewComponent: 'Select',
    defaultNode: {
      componentName: 'Select',
      title: 'Select',
      props: {
        placeholder: 'Please select',
        clearable: true,
        options: [
          { label: 'Option 1', value: 'option-1' },
          { label: 'Option 2', value: 'option-2' },
        ],
      },
    },
  },
]

export const previewComponents: Record<string, Component> = {
  Input: defineComponent({
    name: 'DesignerPlaygroundInputPreview',
    setup(_, { attrs }) {
      return () => h(Input, {
        ...attrs,
        'modelValue': '',
        'onUpdate:modelValue': () => {},
      })
    },
  }),
  Select: defineComponent({
    name: 'DesignerPlaygroundSelectPreview',
    setup(_, { attrs }) {
      return () => h(Select as any, {
        ...attrs,
        'modelValue': undefined,
        'onUpdate:modelValue': () => {},
      })
    },
  }),
}

export const designer = markRaw(new DesignerCore({
  materials,
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
