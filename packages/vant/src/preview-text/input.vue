<script setup lang="ts">
import type { PreviewTextInputProps } from './types'
import { isFn, isValid } from '@formily/shared'
import { computed } from 'vue'
import { useCleanAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextInput',
  inheritAttrs: false,
})

const props = defineProps<PreviewTextInputProps>()

const { props: attrs } = useCleanAttrs(['modelValue', 'onUpdate:modelValue'])
const { placeholder } = usePreviewConfig()
const formatter = computed(() => props.formatter ?? attrs.value.formatter)
</script>

<template>
  <span class="van-field__control">
    <template v-if="isFn(formatter)">
      {{ formatter(props.modelValue) }}
    </template>
    <template v-else-if="isValid(props.modelValue)">
      {{ props.modelValue === '' ? '\u00A0' : props.modelValue }}
    </template>
    <template v-else>
      {{ placeholder }}
    </template>
  </span>
</template>
