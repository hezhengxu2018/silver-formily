<script setup lang="tsx">
import { createForm } from '@formily/core'
import { observer } from '@silver-formily/reactive-vue'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { defineComponent } from 'vue'

const ObservedComponent = observer(
  defineComponent({
    name: 'ObservedComponent',
    setup(_props, { slots }) {
      const SELF_STRING = 'ObservedComponent组件中定义的字符串'
      return () => (
        <span>
          ObservedComponent组件的插槽内容：
          {slots.default?.({ string: SELF_STRING })}
        </span>
      )
    },
  }),
)

function ScopedSlotComponent(props) {
  const handleClick = () => {
    // eslint-disable-next-line no-alert
    alert('函数式组件内部定义的方法')
  }
  return (
    <div onClick={handleClick}>
      ScopedSlotComponent中接收到的变量值：
      {props.string}
    </div>
  )
}
ScopedSlotComponent.props = ['string']

const { SchemaField } = createSchemaField({
  components: {
    ObservedComponent,
  },
})

const schema = {
  type: 'object',
  properties: {
    textPreview: {
      'type': 'string',
      'x-component': 'ObservedComponent',
      'x-content': {
        default: ScopedSlotComponent,
      },
    },
  },
}

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
  </FormProvider>
</template>
