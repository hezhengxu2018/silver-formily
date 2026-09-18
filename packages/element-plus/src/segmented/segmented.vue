<script setup lang="ts">
import { ElSegmented } from 'element-plus'
import { useSlots } from 'vue'
import { useOptionValue } from '../__builtins__'

defineOptions({
  name: 'FSegmented',
  inheritAttrs: false,
})

const props = defineProps<{
  optionAsValue?: boolean
  optionValueKeys?: string[]
  options?: SegmentedOptions
}>()

type SegmentedOption = NonNullable<InstanceType<typeof ElSegmented>['$props']['options']>[number]

type SegmentedOptions = SegmentedOption[]

const slots = useSlots()
const segmentedProps = useOptionValue(props, () => props.options ?? [])
</script>

<template>
  <ElSegmented v-bind="segmentedProps" :options="props.options">
    <template v-if="slots.default" #default="slotData">
      <slot v-bind="slotData" />
    </template>
  </ElSegmented>
</template>
