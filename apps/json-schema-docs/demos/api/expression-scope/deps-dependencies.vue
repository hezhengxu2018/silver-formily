<script setup lang="ts">
import { createForm } from '@formily/core'
import { createSchemaField, FormConsumer, FormProvider } from '@silver-formily/vue'
import { defineComponent, h } from 'vue'

const InputBox = defineComponent({
  name: 'InputBox',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value)
    }

    return () =>
      h('input', {
        value: props.modelValue ?? '',
        placeholder: props.placeholder,
        onInput: handleInput,
        style: {
          width: '100%',
          maxWidth: '360px',
          border: '1px solid var(--vp-c-divider)',
          borderRadius: '8px',
          padding: '8px 10px',
          fontSize: '14px',
        },
      })
  },
})

const PreviewBlock = defineComponent({
  name: 'PreviewBlock',
  props: {
    text: {
      type: [String, Number],
      default: '-',
    },
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          style: {
            marginTop: '8px',
            border: '1px dashed var(--vp-c-divider)',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '13px',
            lineHeight: '1.5',
          },
        },
        String(props.text ?? '-'),
      )
  },
})

const { SchemaField } = createSchemaField({
  components: {
    InputBox,
    PreviewBlock,
  },
})

const schema = {
  type: 'object',
  properties: {
    price: {
      'type': 'string',
      'title': 'price',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: '单价，例如 12.5',
      },
    },
    count: {
      'type': 'string',
      'title': 'count',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: '数量，例如 3',
      },
    },
    summary: {
      'type': 'void',
      'x-component': 'PreviewBlock',
      'x-component-props': {
        text: '等待 price / count 输入',
      },
      'x-reactions': {
        dependencies: ['price', 'count'],
        fulfill: {
          schema: {
            'x-component-props.text': `{{'$deps[0]=' + ($deps[0] || 0) + ', $deps[1]=' + ($deps[1] || 0) + ', $dependencies[0]=' + ($dependencies[0] || 0) + ', total=' + ((Number($deps[0]) || 0) * (Number($deps[1]) || 0))}}`,
          },
        },
      },
    },
  },
}

const form = createForm()
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" />
    <FormConsumer>
      <template #default="{ form: currentForm }">
        <pre style="margin-top: 10px; white-space: pre-wrap;">{{ JSON.stringify(currentForm.values, null, 2) }}</pre>
      </template>
    </FormConsumer>
  </FormProvider>
</template>
