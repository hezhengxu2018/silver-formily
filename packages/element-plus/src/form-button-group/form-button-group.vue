<script lang="ts" setup>
import { ElSpace } from 'element-plus'
import FormItem from '../form-item/index'
import { prefixCls } from './utils'

defineOptions({
  name: 'FFormButtonGroup',
  inheritAttrs: false,
})

const props = defineProps({
  align: {
    type: String,
    default: 'left',
  },
  inline: {
    type: Boolean,
    default: false,
  },
  gutter: {
    type: Number,
    default: 8,
  },
  alignFormItem: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <FormItem
    v-if="props.alignFormItem"
    label="&nbsp;"
    v-bind="$attrs"
    :class="[prefixCls, props.inline && `${prefixCls}--inline`]"
    :style="{
      width: '100%',
    }"
  >
    <ElSpace
      :size="props.gutter"
      :style="props.align === 'left'
        ? undefined
        : {
          justifyContent: props.align === 'right' ? 'flex-end' : 'center',
          display: 'flex',
          width: '100%',
        }"
    >
      <slot />
    </ElSpace>
  </FormItem>
  <ElSpace
    v-else
    v-bind="$attrs"
    :class="[prefixCls, props.inline && `${prefixCls}--inline`]"
    :style="{
      justifyContent: props.align === 'left'
        ? 'flex-start'
        : (props.align === 'right'
          ? 'flex-end'
          : 'center'),
      display: 'flex',
    }"
    :size="props.gutter"
  >
    <slot />
  </ElSpace>
</template>
