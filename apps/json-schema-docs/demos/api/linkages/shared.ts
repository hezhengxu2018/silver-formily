import { isArrayField } from '@formily/core'
import { observer } from '@silver-formily/reactive-vue'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import { defineComponent, h } from 'vue'

const boxStyle = {
  width: '100%',
  maxWidth: '360px',
  border: '1px solid var(--vp-c-divider)',
  borderRadius: '8px',
  padding: '8px 10px',
  fontSize: '14px',
}

const panelStyle = {
  marginTop: '8px',
  border: '1px dashed var(--vp-c-divider)',
  borderRadius: '8px',
  padding: '10px 12px',
  fontSize: '13px',
  lineHeight: '1.5',
}

export const InputBox = defineComponent({
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
    style: {
      type: [Object, String],
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const value = (event.target as HTMLInputElement).value
      emit('update:modelValue', value)
    }

    const resolveStyle = () => {
      if (!props.style)
        return boxStyle
      if (typeof props.style === 'string')
        return props.style
      return {
        ...boxStyle,
        ...props.style,
      }
    }

    return () =>
      h('input', {
        value: props.modelValue ?? '',
        placeholder: props.placeholder,
        onInput: handleInput,
        style: resolveStyle(),
      })
  },
})

export const NumberBox = defineComponent({
  name: 'NumberBox',
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
      const value = (event.target as HTMLInputElement).value
      emit('update:modelValue', value)
    }

    return () =>
      h('input', {
        type: 'number',
        value: props.modelValue ?? '',
        placeholder: props.placeholder,
        onInput: handleInput,
        style: boxStyle,
      })
  },
})

export const PreviewBlock = defineComponent({
  name: 'PreviewBlock',
  props: {
    text: {
      type: [String, Number],
      default: '-',
    },
  },
  setup(props) {
    return () => h('div', { style: panelStyle }, String(props.text ?? '-'))
  },
})

export const ArrayItems = observer(
  defineComponent({
    name: 'ArrayItems',
    setup() {
      const fieldRef = useField()
      const schemaRef = useFieldSchema()

      const handleAdd = () => {
        if (isArrayField(fieldRef.value)) {
          fieldRef.value.push({})
        }
      }

      const handleRemove = (index: number) => {
        if (isArrayField(fieldRef.value)) {
          fieldRef.value.remove(index)
        }
      }

      return () => {
        const field = fieldRef.value
        const schema = schemaRef.value
        const itemSchema = Array.isArray(schema?.items) ? schema.items[0] : schema?.items
        const values = isArrayField(field) && Array.isArray(field.value) ? field.value : []

        const rows = values.map((item, index) => {
          const key: PropertyKey = typeof item === 'object' && item && 'id' in item
            ? String((item as Record<string, unknown>).id)
            : index
          return h('div', { key, style: { marginBottom: '8px' } }, [
            h('div', { style: { marginBottom: '6px' } }, `Row ${index + 1}`),
            h(RecursionField, { schema: itemSchema, name: index }),
            h('button', {
              type: 'button',
              style: {
                marginTop: '6px',
                border: '1px solid var(--vp-c-divider)',
                borderRadius: '6px',
                background: 'transparent',
                padding: '4px 8px',
                cursor: 'pointer',
              },
              onClick: () => handleRemove(index),
            }, 'Remove'),
          ])
        })

        return h('div', {}, [
          ...rows,
          h('button', {
            type: 'button',
            style: {
              border: '1px solid var(--vp-c-divider)',
              borderRadius: '6px',
              background: 'transparent',
              padding: '4px 8px',
              cursor: 'pointer',
            },
            onClick: handleAdd,
          }, 'Add Row'),
        ])
      }
    },
  }),
)
