import type { DesignableComponent } from '../types'
import { createForm } from '@silver-formily/core'
import { createBehavior, createResource } from '@silver-formily/designer-core'
import { Form as FormilyForm } from '@silver-formily/element-plus'
import { useObserver } from '@silver-formily/reactive-vue'
import { computed, defineComponent } from 'vue'
import { AllLocales } from '../locales'
import { AllSchemas } from '../schemas'
import { composeExport } from '../shared'

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
        minHeight: '34rem',
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
        defaultProps: {
          labelCol: 6,
          wrapperCol: 24,
          colon: false,
          feedbackLayout: 'loose',
          layout: 'horizontal',
          labelAlign: 'right',
          wrapperAlign: 'left',
        },
      }
    },
    designerLocales: AllLocales.Form,
  }),
  Resource: createResource({
    title: { 'zh-CN': '表单', 'en-US': 'Form' },
    icon: 'Form',
    elements: [
      {
        componentName: 'Form',
        props: {
          title: 'Untitled Form',
        },
      },
    ],
  }),
}) as DesignableComponent
