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
      const nextValue = (event.target as HTMLInputElement).value
      emit('update:modelValue', nextValue)
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
    source: {
      'type': 'string',
      'title': 'source',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: '输入任意值，观察下方作用域变量输出',
      },
      'x-reactions': {
        target: 'hint',
        fulfill: {
          schema: {
            'x-component-props.text': `{{$self.value
              ? '$self.value=' + $self.value + ' | $values.source=' + $values.source + ' | hasForm=' + !!$form
              : '请输入 source 字段'}}`,
          },
        },
      },
    },
    hint: {
      'type': 'void',
      'x-component': 'PreviewBlock',
      'x-component-props': {
        text: '请输入 source 字段',
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
