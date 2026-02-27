<script setup lang="ts">
import type { CheckboxProps } from 'element-plus'
import type { PropType } from 'vue'
import { isPlainObj } from '@formily/shared'
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup, version } from 'element-plus'
import { computed, useSlots } from 'vue'
import { lt, useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FCheckboxGroup',
  inheritAttrs: false,
})

const props = defineProps({
  options: {
    type: Array as PropType<Array<CheckboxProps>>,
    default: () => [],
  },
  optionType: {
    type: String as PropType<'default' | 'button'>,
    default: 'default',
  },
})

const OptionType = computed(() => {
  return props.optionType === 'button' ? ElCheckboxButton : ElCheckbox
})
const IS_LESS_THAN_2_6_0 = lt(version, '2.6.0')
const compatiableProps = computed(() => {
  return props.options.map((option) => {
    if (!isPlainObj(option)) {
      return {
        label: option,
        value: option,
      }
    }
    /* istanbul ignore if -- @preserve */
    if (IS_LESS_THAN_2_6_0) {
      return {
        ...option,
        label: option.value,
      }
    }
    return option
  })
})

const slots = useSlots()
const { props: checkboxProps } = useCleanAttrs()
</script>

<template>
  <ElCheckboxGroup v-bind="checkboxProps">
    <template v-if="!slots.option">
      <component :is="OptionType" v-for="(option, index) of compatiableProps" :key="index" v-bind="option">
        {{ isPlainObj(props.options[index]) ? props.options[index]?.label : option.label }}
      </component>
    </template>
    <template v-else>
      <component :is="OptionType" v-for="(option, index) of compatiableProps" :key="index" v-bind="option">
        <slot name="option" :option="option" />
      </component>
    </template>
  </ElCheckboxGroup>
</template>
