<script setup lang="ts">
import { isValid } from '@silver-formily/shared'
import { ElRate, ElText } from 'element-plus'
import { stylePrefix, useSplitAttrsByComponent } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextRate',
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: any
}>()

const { rootAttrs, componentProps: rateProps } = useSplitAttrsByComponent(ElRate)
const prefixCls = `${stylePrefix}-preview-text`
const { textProps, placeholder } = usePreviewConfig()
</script>

<template>
  <div v-bind="rootAttrs" :class="prefixCls">
    <ElText v-if="!isValid(props.modelValue)" v-bind="textProps">
      {{ placeholder }}
    </ElText>
    <ElRate
      v-else
      v-bind="rateProps"
      :model-value="props.modelValue"
      :disabled="true"
    />
  </div>
</template>
