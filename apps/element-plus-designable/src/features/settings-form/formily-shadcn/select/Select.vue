<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import { computed } from 'vue'
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
  <Select v-bind="$attrs">
    <SelectTrigger data-slot="input">
      <SelectValue :placeholder="placeholder ?? '请选择'" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem
        v-for="option of normalizedOptionsRef"
        :key="String(option.value)"
        :disabled="option.disabled"
        :value="option.value"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
