<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import { computed, useAttrs } from 'vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type SelectOption
  = | AcceptableValue
    | {
      disabled?: boolean
      label: string
      value: AcceptableValue
    }

defineOptions({
  name: 'FormilyShadcnSelect',
  inheritAttrs: false,
})

const props = defineProps<{
  options?: SelectOption[]
  placeholder?: string
}>()

const modelValue = defineModel<AcceptableValue>()
const emptyOptionValue = '__formily_empty_option__'
const attrs = useAttrs()

const selectAttrsRef = computed(() => {
  const { id: _id, ...selectAttrs } = attrs
  return selectAttrs
})

const triggerIdRef = computed(() => typeof attrs.id === 'string' ? attrs.id : undefined)

const selectValueRef = computed({
  get: () => modelValue.value === '' ? emptyOptionValue : modelValue.value,
  set: value => modelValue.value = value === emptyOptionValue ? '' : value,
})

const normalizedOptionsRef = computed(() => {
  return (props.options ?? []).map((option) => {
    if (typeof option === 'object' && option !== null && 'value' in option)
      return option
    return {
      label: option === null ? '无' : String(option),
      value: option,
    }
  })
})
</script>

<template>
  <Select v-model="selectValueRef" v-bind="selectAttrsRef">
    <SelectTrigger :id="triggerIdRef" data-slot="input">
      <SelectValue :placeholder="placeholder ?? '请选择'" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="option of normalizedOptionsRef"
        :key="String(option.value)"
        :disabled="option.disabled"
        :value="option.value === '' ? emptyOptionValue : option.value"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
