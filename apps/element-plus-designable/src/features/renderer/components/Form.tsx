import type { DesignableComponent } from '../types'
import { createForm } from '@silver-formily/core'
import { createBehavior, createResource } from '@silver-formily/designer-core'
import { Form as FormilyForm } from '@silver-formily/element-plus'
import { useObserver } from '@silver-formily/reactive-vue'
import { computed, defineComponent } from 'vue'
import { AllLocales } from '../locales'
import { AllSchemas } from '../schemas'
import { composeExport } from '../shared'

export const formDefaultProps = {
  labelCol: 6,
  wrapperCol: 18,
  colon: false,
  feedbackLayout: 'loose',
  layout: 'horizontal',
  labelAlign: 'right',
  shallow: true,
  size: 'default',
  tooltipLayout: 'icon',
  wrapperAlign: 'left',
} as const

export const RuntimeForm = defineComponent({
  name: 'RuntimeForm',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => (
      <FormilyForm
        {...formDefaultProps}
        {...attrs}
      >
        {slots.default?.()}
      </FormilyForm>
    )
  },
})

const FormPreview = defineComponent({
  name: 'DnForm',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    useObserver()
    const formRef = computed(() => createForm({ designable: true }))
    const style = computed(() => [
      {
        display: 'flex',
        flexDirection: 'column',
      },
      attrs.style,
    ])

    return () => (
      <FormilyForm
        {...attrs}
        class={['dn-designable-form', attrs.class]}
        form={formRef.value}
        style={style.value}
      >
        {slots.default?.()}
      </FormilyForm>
    )
  },
})

export const Form = composeExport(FormPreview, {
  Behavior: createBehavior({
    name: 'Form',
    selector: node => node.componentName === 'Form' || node.props?.['x-component'] === 'Form',
    designerProps(node) {
      return {
        cloneable: !node.isRoot,
        deletable: !node.isRoot,
        draggable: !node.isRoot,
        droppable: true,
        propsSchema: AllSchemas.Form,
        defaultProps: formDefaultProps,
      }
    },
    designerLocales: AllLocales.Form,
  }),
  Resource: createResource({
    title: { 'zh-CN': '表单', 'en-US': 'Form' },
    icon: 'FormLayoutSource',
    elements: [
      {
        componentName: 'Field',
        props: {
          'type': 'object',
          'x-component': 'Form',
        },
      },
    ],
  }),
}) as DesignableComponent
