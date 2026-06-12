import type { DesignerMaterialDefinition } from '@silver-formily/designer-core'

export const elementPlusInputMaterial: DesignerMaterialDefinition = {
  name: 'Input',
  title: 'Input',
  group: 'Fields',
  runtimeComponent: 'Input',
  defaultNode: {
    componentName: 'Input',
    title: 'Input',
    props: {
      placeholder: 'Please enter',
      clearable: false,
    },
  },
  propsSchema: {
    placeholder: {
      type: 'string',
      title: 'Placeholder',
    },
    clearable: {
      type: 'boolean',
      title: 'Clearable',
    },
  },
  setters: [
    { name: 'placeholder', component: 'StringSetter' },
    { name: 'clearable', component: 'BooleanSetter' },
  ],
}

export const elementPlusSelectMaterial: DesignerMaterialDefinition = {
  name: 'Select',
  title: 'Select',
  group: 'Fields',
  runtimeComponent: 'Select',
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
  propsSchema: {
    placeholder: {
      type: 'string',
      title: 'Placeholder',
    },
    clearable: {
      type: 'boolean',
      title: 'Clearable',
    },
    options: {
      type: 'array',
      title: 'Options',
    },
  },
  setters: [
    { name: 'placeholder', component: 'StringSetter' },
    { name: 'clearable', component: 'BooleanSetter' },
    { name: 'options', component: 'ArraySetter' },
  ],
}

export const elementPlusDesignerMaterials: DesignerMaterialDefinition[] = [
  elementPlusInputMaterial,
  elementPlusSelectMaterial,
]
