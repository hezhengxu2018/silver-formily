<script setup lang="ts">
import type { Field } from '@formily/core'
import type { MentionOption } from 'element-plus/es/components/mention'
import { useField } from '@silver-formily/vue'
import { ElMention } from 'element-plus'
import { computed } from 'vue'
import { useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FMention',
  inheritAttrs: false,
})

const slots = defineSlots<{
  label?: (scope: { item: MentionOption, index: number, field: Field | undefined }) => any
  header?: (scope: { field: Field | undefined }) => any
  footer?: (scope: { field: Field | undefined }) => any
  loading?: () => any
  prefix?: () => any
  suffix?: () => any
  prepend?: () => any
  append?: () => any
}>()

const { props: rawMentionProps } = useCleanAttrs()
const fieldRef = useField<Field>()

const mentionProps = computed(() => {
  const props = rawMentionProps.value
  const { onSearch } = props
  if (!onSearch) {
    return props
  }

  return {
    ...props,
    onSearch(pattern: string, prefix: string) {
      return (onSearch as (pattern: string, prefix: string, field?: Field) => any)(
        pattern,
        prefix,
        fieldRef.value,
      )
    },
  }
})
</script>

<template>
  <ElMention v-bind="mentionProps">
    <template v-if="slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="slots.header" #header>
      <slot name="header" :field="fieldRef" />
    </template>
    <template v-if="slots.footer" #footer>
      <slot name="footer" :field="fieldRef" />
    </template>
    <template v-if="slots.label" #label="slotProps">
      <slot name="label" v-bind="{ ...slotProps, field: fieldRef }" />
    </template>
    <template v-if="slots.loading" #loading>
      <slot name="loading" />
    </template>
  </ElMention>
</template>
