<script setup lang="ts">
import type {
  TimePickerPopupContentProps,
  TimePickerResolvedValue,
  TimePickerSlots,
} from './types'
import { TimePicker as VanTimePicker } from 'vant'

defineOptions({
  name: 'TimePickerPopupContent',
  inheritAttrs: false,
})

const props = defineProps<TimePickerPopupContentProps>()
const emit = defineEmits<{
  'update:modelValue': [value: string[]]
  'confirm': [value: TimePickerResolvedValue]
  'cancel': []
}>()
defineSlots<TimePickerSlots>()

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
  <VanTimePicker
    v-bind="props.timePickerProps"
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
  </VanTimePicker>
</template>
