<script setup lang="ts">
import type { AreaPanelProps } from '../area-panel'
import type { FunctionalPopupSlots } from '../create-popup'
import type {
  AreaPopupProps,
  AreaProps,
  AreaResolvedValue,
} from './types'
import { computed, useSlots } from 'vue'
import { PopupTriggerInput, resolveSelectionPlaceholder, useCleanAttrs } from '../__builtins__'
import AreaPanel from '../area-panel/area-panel.vue'
import { createPopup } from '../create-popup'
import { usePickerInactiveState } from '../picker/use-picker-inactive-state'
import {
  cloneAreaValue,
  formatAreaDisplay,
  resolveAreaSelectedOptions,
} from './utils'

defineOptions({
  name: 'FArea',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<AreaProps>(), {
  areaList: () => ({
    city_list: {},
    county_list: {},
    province_list: {},
  }),
  columnsNum: 3,
  columnsPlaceholder: () => [],
  popupProps: () => ({}),
  separator: ' / ',
})

const emit = defineEmits<{
  'update:modelValue': [value: AreaResolvedValue]
  'opened': []
  'closed': []
}>()

const slots = useSlots()
const { props: triggerInputProps } = useCleanAttrs()
const { isPopupReadonly, isTriggerDisabled } = usePickerInactiveState(props)

const selectedOptions = computed(() => {
  return resolveAreaSelectedOptions(
    props.modelValue,
    props.areaList,
    props.columnsNum,
    props.columnsPlaceholder,
  )
})
const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      cloneAreaValue(props.modelValue),
      [...selectedOptions.value],
    )
  }

  return formatAreaDisplay(
    props.modelValue,
    props.areaList,
    props.columnsNum,
    props.columnsPlaceholder,
    props.separator,
  )
})

const popupBindings = computed(() => {
  return {
    ...props.popupProps,
  } satisfies AreaPopupProps & Record<string, unknown>
})
const panelProps = computed<AreaPanelProps>(() => {
  return {
    areaList: props.areaList,
    cancelButtonText: props.cancelButtonText,
    columnsNum: props.columnsNum,
    columnsPlaceholder: props.columnsPlaceholder,
    confirmButtonText: props.confirmButtonText,
    loading: props.loading,
    modelValue: props.modelValue,
    optionHeight: props.optionHeight,
    readonly: isPopupReadonly.value,
    swipeDuration: props.swipeDuration,
    title: props.title,
    visibleOptionNum: props.visibleOptionNum,
  }
})

async function open() {
  if (isTriggerDisabled.value) {
    return
  }

  const popupController = createPopup<typeof AreaPanel, AreaResolvedValue>(
    popupBindings.value,
    AreaPanel,
    slots as FunctionalPopupSlots,
  )

  try {
    const popupPromise = popupController.open(panelProps)
    emit('opened')

    const result = await popupPromise

    emit('update:modelValue', result)
  }
  catch {
  }
  finally {
    emit('closed')
  }
}
</script>

<template>
  <PopupTriggerInput
    :input-props="triggerInputProps"
    :disabled="isTriggerDisabled"
    :value="displayText"
    :placeholder="resolveSelectionPlaceholder(props.placeholder)"
    @click="open"
  />
</template>
