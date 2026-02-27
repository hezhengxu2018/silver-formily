<script setup lang="ts">
import type { Field } from '@formily/core'
import { isValid } from '@formily/shared'
import { useField } from '@silver-formily/vue'
import { ElSpace, ElTag, ElText } from 'element-plus'
import { stylePrefix, useCleanAttrs } from '../__builtins__'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextSelect',
})

const props = defineProps<{
  modelValue?: any
}>()

const prefixCls = `${stylePrefix}-preview-text`

const fieldRef = useField<Field>()
const { props: attrs } = useCleanAttrs()
const dataSource = fieldRef.value.dataSource ?? []
const { spaceProps, textProps, tagProps, placeholder } = usePreviewConfig()
</script>

<template>
  <div :class="prefixCls">
    <template v-if="!isValid(props.modelValue)">
      <ElText v-bind="textProps">
        {{ placeholder }}
      </ElText>
    </template>
    <template v-else-if="!attrs.multiple">
      <ElText v-bind="textProps">
        {{ dataSource.find(i => i.value === props.modelValue)?.label ?? props.modelValue }}
      </ElText>
    </template>
    <ElSpace v-else v-bind="spaceProps">
      <ElTag v-for="(item, key) of props.modelValue" :key="key" v-bind="tagProps">
        {{ dataSource.find(i => i.value === item)?.label ?? item }}
      </ElTag>
    </ElSpace>
  </div>
</template>
