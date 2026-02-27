<script setup lang="ts">
import { isFn, isValid } from '@formily/shared'
import { ElSpace, ElText } from 'element-plus'
import { stylePrefix, useCleanAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextInput',
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: any
}>()

const slots = defineSlots<{
  prepend?: () => any
  prefix?: () => any
  suffix?: () => any
  append?: () => any
}>()
const { props: attrs } = useCleanAttrs()
const prefixCls = `${stylePrefix}-preview-text`
const { spaceProps, textProps, placeholder } = usePreviewConfig()
</script>

<template>
  <ElSpace :class="prefixCls" v-bind="spaceProps">
    <slot v-if="slots.prepend" name="prepend" />
    <slot v-if="slots.prefix" name="prefix" />
    <ElText v-bind="textProps">
      <template v-if="isFn(attrs.formatter)">
        {{ attrs.formatter(props.modelValue) }}
      </template>
      <template v-else-if="isValid(props.modelValue)">
        {{ props.modelValue === '' ? '&nbsp;' : props.modelValue }}
      </template>
      <template v-else>
        {{ placeholder }}
      </template>
    </ElText>
    <slot v-if="slots.suffix" name="suffix" />
    <slot v-if="slots.append" name="append" />
  </ElSpace>
</template>
