import { DesignerCore } from '@silver-formily/designer-core'
import { DnDProvider } from '@vue-dnd-kit/core'
import { defineComponent, h } from 'vue'

import DesignerProvider from '../components/DesignerProvider'

export function createDesigner() {
  return new DesignerCore({
    schema: {
      componentName: 'Form',
      title: 'Form',
      metadata: {
        designer: {
          container: true,
        },
      },
      children: [],
    },
    materials: [
      {
        name: 'Input',
        title: 'Input',
        group: 'Fields',
        defaultNode: {
          componentName: 'Input',
          title: 'Input',
          props: {
            placeholder: 'Type here',
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
      },
      {
        name: 'Select',
        title: 'Select',
        group: 'Fields',
        defaultNode: {
          componentName: 'Select',
          title: 'Select',
          props: {
            placeholder: 'Choose one',
            clearable: true,
            options: [
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
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
      },
      {
        name: 'Section',
        title: 'Section',
        group: 'Layout',
        designer: {
          container: true,
          defaultContainer: 'children',
          containers: [
            { name: 'children', title: 'Body' },
            { name: 'header', title: 'Header' },
          ],
        },
        defaultNode: {
          componentName: 'Section',
          title: 'Section',
          slots: {
            header: [],
          },
        },
      },
    ],
  })
}

export function withDesignerProvider(component: any, designer: DesignerCore) {
  return defineComponent({
    name: 'DesignerTestHarness',
    setup() {
      return () => h(DesignerProvider, { designer }, {
        default: () => h(DnDProvider, undefined, {
          default: () => h(component),
        }),
      })
    },
  })
}
