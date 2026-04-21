<script setup lang="ts">
import type {
  PickerOptionValue,
  PickerPopupContentProps,
  PickerResolvedValue,
  PickerSlots,
} from './types'
import { Picker as VanPicker } from 'vant'

defineOptions({
  name: 'PickerPopupContent',
  inheritAttrs: false,
})

const props = defineProps<PickerPopupContentProps>()
const emit = defineEmits<{
  'update:modelValue': [value: PickerOptionValue[]]
  'confirm': [value: PickerResolvedValue]
  'cancel': []
}>()
defineSlots<PickerSlots>()

function onPickerValueChange(value: PickerOptionValue[]) {
  emit('update:modelValue', [...value])
}

function onConfirm(payload: { selectedValues: PickerOptionValue[] }) {
  emit('confirm', props.resolveValue(payload.selectedValues))
}
</script>

<template>
  <VanPicker
    v-bind="props.pickerProps"
    @update:model-value="onPickerValueChange"
    @cancel="emit('cancel')"
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

    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>

    <template v-if="$slots['columns-top']" #columns-top>
      <slot name="columns-top" />
    </template>

    <template v-if="$slots['columns-bottom']" #columns-bottom>
      <slot name="columns-bottom" />
    </template>
  </VanPicker>
</template>
