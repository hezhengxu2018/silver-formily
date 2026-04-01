<script setup lang="ts">
import type { PreviewTextSwitchProps } from './types'
import { Switch as VanSwitch } from 'vant'
import { computed } from 'vue'
import { useCleanAttrs, useHasExplicitVNodeProp } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextSwitch',
  inheritAttrs: false,
})

const props = defineProps<PreviewTextSwitchProps>()

const { props: attrs } = useCleanAttrs(['disabled', 'modelValue', 'onUpdate:modelValue'])
const { placeholder } = usePreviewConfig()
const hasExplicitVNodeProp = useHasExplicitVNodeProp()

const resolvedActiveValue = computed(() => {
  return hasExplicitVNodeProp('activeValue') ? props.activeValue : true
})

const resolvedInactiveValue = computed(() => {
  return hasExplicitVNodeProp('inactiveValue') ? props.inactiveValue : false
})

const shouldRenderSwitch = computed(() => {
  return props.modelValue === resolvedActiveValue.value || props.modelValue === resolvedInactiveValue.value
})
</script>

<template>
  <div class="van-field__control">
    <template v-if="!shouldRenderSwitch">
      {{ placeholder }}
    </template>
    <VanSwitch
      v-else
      v-bind="attrs"
      :model-value="modelValue"
      :active-value="resolvedActiveValue"
      :inactive-value="resolvedInactiveValue"
      disabled
    />
  </div>
</template>
