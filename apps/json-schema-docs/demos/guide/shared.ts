import { connect, mapProps } from '@silver-formily/vue'
import { defineComponent, h } from 'vue'

const fieldStyle = {
  display: 'block',
  marginBottom: '12px',
}

const labelStyle = {
  marginBottom: '6px',
  fontSize: '13px',
  fontWeight: 600,
}

const controlStyle = {
  width: '100%',
  border: '1px solid var(--vp-c-divider)',
  borderRadius: '8px',
  padding: '8px 10px',
  fontSize: '14px',
  background: 'var(--vp-c-bg-soft)',
}

type FieldProps = {
  modelValue?: string | number
  label?: string
  placeholder?: string
  required?: boolean
  rows?: number
}

const BaseInput = defineComponent({
  name: 'GuideBaseInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const value = (event.target as HTMLInputElement).value
      emit('update:modelValue', value)
    }

    return () =>
      h('label', { style: fieldStyle }, [
        h('div', { style: labelStyle }, [
          props.label,
          props.required ? h('span', { style: { color: '#c2410c', marginLeft: '4px' } }, '*') : null,
        ]),
        h('input', {
          value: props.modelValue ?? '',
          placeholder: props.placeholder,
          onInput: handleInput,
          style: controlStyle,
        }),
      ])
  },
})

const BaseTextArea = defineComponent({
  name: 'GuideBaseTextArea',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 4,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const handleInput = (event: Event) => {
      const value = (event.target as HTMLTextAreaElement).value
      emit('update:modelValue', value)
    }

    return () =>
      h('label', { style: fieldStyle }, [
        h('div', { style: labelStyle }, [
          props.label,
          props.required ? h('span', { style: { color: '#c2410c', marginLeft: '4px' } }, '*') : null,
        ]),
        h('textarea', {
          value: props.modelValue ?? '',
          rows: props.rows,
          placeholder: props.placeholder,
          onInput: handleInput,
          style: {
            ...controlStyle,
            minHeight: '92px',
            resize: 'vertical',
          },
        }),
      ])
  },
})

export const InputBox = connect(
  BaseInput,
  mapProps<FieldProps>({ title: 'label', required: true }),
)

export const TextAreaBox = connect(
  BaseTextArea,
  mapProps<FieldProps>({ title: 'label', required: true }),
)
