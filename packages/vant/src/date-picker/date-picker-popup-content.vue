<script setup lang="ts">
import type {
  DatePickerPopupContentProps,
  DatePickerResolvedValue,
  DatePickerSlots,
} from './types'
import { DatePicker as VanDatePicker } from 'vant'

defineOptions({
  name: 'DatePickerPopupContent',
  inheritAttrs: false,
})

const props = defineProps<DatePickerPopupContentProps>()
const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  'confirm': [value: DatePickerResolvedValue]
  'cancel': []
}>()
defineSlots<DatePickerSlots>()

function onPickerValueChange(value: string[]) {
  emit('update:modelValue', [...value])
}

function onCancel() {
  emit('cancel')
}

function onConfirm(payload: { selectedValues: string[] }) {
  emit('confirm', props.resolveValue(payload.selectedValues))
}
</script>

<template>
  <VanDatePicker
    v-bind="props.datePickerProps"
    @update:model-value="onPickerValueChange"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <template v-if="$slots.option" #option="option">
      <slot name="option" v-bind="option ?? {}" />
    </template>

    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <template v-if="$slots.cancel" #cancel>
      <slot name="cancel" />
    </template>

    <template v-if="$slots.confirm" #confirm>
      <slot name="confirm" />
    </template>

    <template v-if="$slots.toolbar" #toolbar>
      <slot name="toolbar" />
    </template>

    <template v-if="$slots['columns-top']" #columns-top>
      <slot name="columns-top" />
    </template>

    <template v-if="$slots['columns-bottom']" #columns-bottom>
      <slot name="columns-bottom" />
    </template>
  </VanDatePicker>
</template>
