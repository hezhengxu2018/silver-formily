<script setup lang="ts">
import type { Field } from '@formily/core'
import { isPlainObj, isValid } from '@formily/shared'
import { useField } from '@silver-formily/vue'
import { computed } from 'vue'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextSelect',
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: any
}>()

const fieldRef = useField<Field>()
const { placeholder } = usePreviewConfig()

function resolveOptionValue(option: any) {
  if (!isPlainObj(option))
    return undefined

  const optionRecord = option as Record<string, any>

  return optionRecord.name
}

function resolveOptionLabel(option: any) {
  if (!isPlainObj(option))
    return option

  const optionRecord = option as Record<string, any>

  return isValid(optionRecord.label)
    ? optionRecord.label
    : undefined
}

function resolveDisplayText(value: unknown) {
  const dataSource = fieldRef.value?.dataSource ?? []
  const matched = Array.isArray(dataSource)
    ? dataSource.find(option => resolveOptionValue(option) === value)
    : undefined

  return resolveOptionLabel(matched) ?? value
}

const normalizedValues = computed(() => {
  if (Array.isArray(props.modelValue))
    return props.modelValue

  return isValid(props.modelValue)
    ? [props.modelValue]
    : []
})

const displayTexts = computed(() => {
  return normalizedValues.value.map(resolveDisplayText)
})
</script>

<template>
  <span class="van-field__control">
    <template v-if="!displayTexts.length">
      {{ placeholder }}
    </template>
    <template v-else>
      {{ displayTexts.join('、') }}
    </template>
  </span>
</template>
