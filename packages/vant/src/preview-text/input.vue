<script setup lang="ts">
import { isFn, isValid } from '@formily/shared'
import { useCleanAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextInput',
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: any
}>()

const { props: attrs } = useCleanAttrs(['modelValue', 'onUpdate:modelValue'])
const { placeholder } = usePreviewConfig()
</script>

<template>
  <span class="van-field__control">
    <template v-if="isFn(attrs.formatter)">
      {{ attrs.formatter(props.modelValue) }}
    </template>
    <template v-else-if="isValid(props.modelValue)">
      {{ props.modelValue === '' ? '\u00A0' : props.modelValue }}
    </template>
    <template v-else>
      {{ placeholder }}
    </template>
  </span>
</template>
