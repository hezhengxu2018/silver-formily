<script setup lang="ts">
import type { AreaConfirmEventParams } from '../area/types'
import type {
  AreaPanelProps,
  AreaPanelResolvedValue,
  AreaPanelSlots,
} from './types'
import { Area as VanArea } from 'vant'
import { computed, ref, watch } from 'vue'
import {
  resolveAreaInnerValue,
  resolveAreaModelValue,
} from '../area/utils'

defineOptions({
  name: 'FAreaPanel',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AreaPanelProps>(), {
  areaList: () => ({
    city_list: {},
    county_list: {},
    province_list: {},
  }),
  columnsNum: 3,
  columnsPlaceholder: () => [],
})

const emit = defineEmits<{
  'update:modelValue': [value: AreaPanelResolvedValue]
  'confirm': [value: AreaPanelResolvedValue]
  'cancel': []
}>()
defineSlots<AreaPanelSlots>()

const resolvedInnerValue = computed(() => {
  return resolveAreaInnerValue(props.modelValue, props.columnsNum).at(-1) ?? ''
})
const innerValue = ref(resolvedInnerValue.value)
const areaProps = computed(() => {
  return {
    areaList: props.areaList,
    cancelButtonText: props.cancelButtonText,
    columnsNum: props.columnsNum,
    columnsPlaceholder: props.columnsPlaceholder,
    confirmButtonText: props.confirmButtonText,
    loading: props.loading,
    optionHeight: props.optionHeight,
    readonly: Boolean(props.readonly || props.disabled),
    swipeDuration: props.swipeDuration,
    title: props.title,
    visibleOptionNum: props.visibleOptionNum,
  }
})

watch(resolvedInnerValue, (value) => {
  innerValue.value = value
})

function onAreaValueChange(value: string) {
  innerValue.value = value
}

function onCancel() {
  innerValue.value = resolvedInnerValue.value
  emit('cancel')
}

function onConfirm(payload: AreaConfirmEventParams) {
  const value = resolveAreaModelValue(payload.selectedValues)

  emit('update:modelValue', value)
  emit('confirm', value)
}
</script>

<template>
  <VanArea
    v-bind="areaProps"
    :model-value="innerValue"
    @update:model-value="onAreaValueChange"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
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
  </VanArea>
</template>
