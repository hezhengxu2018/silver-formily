<script setup lang="ts">
import type { RadioProps } from 'element-plus'
import type { PropType } from 'vue'
import { isPlainObj } from '@formily/shared'
import { ElRadio, ElRadioButton, ElRadioGroup, version } from 'element-plus'
import { computed, useSlots } from 'vue'
import { lt, useCleanAttrs } from '../__builtins__'

defineOptions({
  name: 'FRadioGroup',
})

const props = defineProps({
  options: {
    type: Array as PropType<Array<RadioProps | string | number>>,
    default: () => [],
  },
  optionType: {
    type: String as PropType<'default' | 'button'>,
    default: 'default',
  },
})

const { props: radioProps } = useCleanAttrs()

const OptionType = computed(() => {
  return props.optionType === 'button' ? ElRadioButton : ElRadio
})
const IS_LESS_THAN_2_6_0 = lt(version, '2.6.0')

function isRadioPropsObject(option: any): option is RadioProps {
  return isPlainObj(option)
}

function getOptionLabel(option: any, index: number) {
  if (isRadioPropsObject(props.options[index])) {
    return props.options[index].label
  }
  return option.label
}

const compatiableProps = computed(() => {
  return props.options.map((option) => {
    if (!isRadioPropsObject(option)) {
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
</script>

<template>
  <ElRadioGroup v-bind="radioProps">
    <template v-if="!slots.option">
      <component :is="OptionType" v-for="(option, index) of compatiableProps" :key="index" v-bind="option">
        {{ getOptionLabel(option, index) }}
      </component>
    </template>
    <template v-else>
      <component :is="OptionType" v-for="(option, index) of compatiableProps" :key="index" v-bind="option">
        <slot name="option" :option="option" />
      </component>
    </template>
  </ElRadioGroup>
</template>
