<script setup lang="ts">
import type { Field } from '@formily/core'
import { useField } from '@silver-formily/vue'
import { ElInputTag } from 'element-plus'
import { useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FInputTag',
  inheritAttrs: false,
})

const slots = defineSlots<{
  tag?: (scope: { value: string, index: number, field: Field | undefined }) => any
  prefix?: () => any
  suffix?: () => any
}>()

const { props: inputTagProps } = useCleanAttrs()
const fieldRef = useField<Field>()
</script>

<template>
  <ElInputTag v-bind="inputTagProps">
    <template v-if="slots.tag" #tag="slotProps">
      <slot name="tag" v-bind="{ ...slotProps, field: fieldRef }" />
    </template>
    <template v-if="slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
  </ElInputTag>
</template>
