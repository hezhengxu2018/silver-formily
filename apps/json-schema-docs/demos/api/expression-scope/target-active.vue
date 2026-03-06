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
    source: {
      'type': 'string',
      'title': 'source',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: '输入后会主动更新 target',
      },
      'x-reactions': {
        target: 'target',
        effects: ['onFieldInputValueChange'],
        fulfill: {
          state: {
            value: `{{$self.value ? $self.value + '-from-source' : $target.value}}`,
          },
        },
      },
    },
    target: {
      'type': 'string',
      'title': 'target',
      'x-component': 'InputBox',
      'x-component-props': {
        placeholder: '可手动输入；清空 source 时将保留当前值',
      },
    },
    notice: {
      'type': 'void',
      'x-component': 'PreviewBlock',
      'x-component-props': {
        text: 'source 为空时，表达式走 $target.value（即保留 target 当前值）',
      },
    },
  },
}

const form = createForm({
  values: {
    target: 'manual-default',
  },
})
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
