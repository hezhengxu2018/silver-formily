<script setup lang="ts">
import { ElSegmented } from 'element-plus'
import { useAttrs, useSlots } from 'vue'

defineOptions({
  name: 'FSegmented',
  inheritAttrs: false,
})

const props = defineProps<{
  options?: SegmentedOptions
}>()

type SegmentedOption = NonNullable<InstanceType<typeof ElSegmented>['$props']['options']>[number]

type SegmentedOptions = SegmentedOption[]

const slots = useSlots()
const segmentedProps = useAttrs()
</script>

<template>
  <ElSegmented v-bind="segmentedProps" :options="props.options">
    <template v-if="slots.default" #default="slotData">
      <slot v-bind="slotData" />
    </template>
  </ElSegmented>
</template>
