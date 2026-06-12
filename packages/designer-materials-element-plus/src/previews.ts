import type { Component } from 'vue'
import { Input, Select } from '@silver-formily/element-plus'
import { defineComponent, h } from 'vue'

const InputPreview = defineComponent({
  name: 'DesignerElementPlusInputPreview',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return () => h(Input, {
      ...props,
      'modelValue': props.modelValue,
      'onUpdate:modelValue': () => {},
    })
  },
})

const SelectPreview = defineComponent({
  name: 'DesignerElementPlusSelectPreview',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Array, Object],
      default: undefined,
    },
    placeholder: {
      type: String,
      default: '',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    return () => h(Select as any, {
      ...props,
      'options': props.options as any[],
      'modelValue': props.modelValue,
      'onUpdate:modelValue': () => {},
    })
  },
})

export const elementPlusPreviewComponents: Record<string, Component> = {
  Input: InputPreview,
  Select: SelectPreview,
}
