<script setup lang="ts">
import { isFn, isValid } from '@silver-formily/shared'
import { ElSpace, ElText } from 'element-plus'
import { useAttrs } from 'vue'
import { stylePrefix, useExcludedAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextColorPicker',
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: any
}>()

const attrs = useAttrs()
const rootAttrs = useExcludedAttrs(['formatter'])
const prefixCls = `${stylePrefix}-preview-text`
const colorCls = `${prefixCls}__color`
const { spaceProps, textProps, placeholder } = usePreviewConfig()
</script>

<template>
  <ElSpace v-bind="{ ...spaceProps, ...rootAttrs }" :class="[prefixCls, colorCls]">
    <div
      v-if="isValid(props.modelValue)"
      :class="`${colorCls}-swatch`"
      :style="{ backgroundColor: props.modelValue }"
    />
    <ElText v-bind="textProps">
      <template v-if="isFn(attrs.formatter)">
        {{ attrs.formatter(props.modelValue) }}
      </template>
      <template v-else-if="isValid(props.modelValue)">
        {{ props.modelValue }}
      </template>
      <template v-else>
        {{ placeholder }}
      </template>
    </ElText>
  </ElSpace>
</template>
