<script lang="ts" setup>
import { ElSpace } from 'element-plus'
import { computed, useAttrs } from 'vue'
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

const attrs = useAttrs()
const rootClass = computed(() => [
  prefixCls,
  props.inline && `${prefixCls}--inline`,
  attrs.class,
])
const rootStyle = computed(() => [
  attrs.style,
  {
    justifyContent: props.align === 'left'
      ? 'flex-start'
      : (props.align === 'right'
          ? 'flex-end'
          : 'center'),
    display: 'flex',
    ...(props.alignFormItem ? { width: '100%' } : {}),
  },
])
</script>

<template>
  <div v-bind="attrs" :class="rootClass" :style="rootStyle">
    <FormItem
      v-if="props.alignFormItem"
      label="&nbsp;"
    >
      <ElSpace :size="props.gutter">
        <slot />
      </ElSpace>
    </FormItem>
    <ElSpace v-else :size="props.gutter">
      <slot />
    </ElSpace>
  </div>
</template>
