<script setup lang="ts">
import type {
  CascaderChangeEvent,
  CascaderPopupContentProps,
  CascaderSlots,
} from './types'
import { Cascader as VanCascader } from 'vant'

defineOptions({
  name: 'CascaderPopupContent',
  inheritAttrs: false,
})

const props = defineProps<CascaderPopupContentProps>()
const emit = defineEmits<{
  'update:modelValue': [value: CascaderChangeEvent['value']]
  'change': [payload: CascaderChangeEvent]
  'finish': [payload: CascaderChangeEvent]
  'cancel': []
}>()
defineSlots<CascaderSlots>()
</script>

<template>
  <VanCascader
    v-bind="props.cascaderProps"
    :model-value="props.modelValue ?? props.cascaderProps.modelValue"
    @change="(payload) => {
      emit('update:modelValue', payload.value)
      emit('change', payload)
      props.onChange?.(payload)
    }"
    @finish="(payload) => emit('finish', payload)"
    @close="emit('cancel')"
    @click-tab="(tabIndex, title) => props.onClickTab?.(tabIndex, title)"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <template v-if="$slots.option" #option="slotProps">
      <slot name="option" v-bind="slotProps ?? {}" />
    </template>

    <template v-if="$slots['options-top']" #options-top="slotProps">
      <slot name="options-top" v-bind="slotProps ?? {}" />
    </template>

    <template v-if="$slots['options-bottom']" #options-bottom="slotProps">
      <slot name="options-bottom" v-bind="slotProps ?? {}" />
    </template>
  </VanCascader>
</template>
