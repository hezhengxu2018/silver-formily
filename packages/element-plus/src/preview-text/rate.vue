<script setup lang="ts">
import { isValid } from '@formily/shared'
import { ElRate, ElText } from 'element-plus'
import { stylePrefix, useCleanAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextRate',
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: any
}>()

const { props: attrs } = useCleanAttrs()
const prefixCls = `${stylePrefix}-preview-text`
const { textProps, placeholder } = usePreviewConfig()
</script>

<template>
  <div :class="prefixCls">
    <ElText v-if="!isValid(props.modelValue)" v-bind="textProps">
      {{ placeholder }}
    </ElText>
    <ElRate
      v-else
      v-bind="attrs"
      :model-value="props.modelValue"
      :disabled="true"
    />
  </div>
</template>
