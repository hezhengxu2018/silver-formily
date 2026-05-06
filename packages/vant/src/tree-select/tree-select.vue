<script setup lang="ts">
import type { FunctionalPopupSlots } from '../create-popup'
import type { TreeSelectChild, TreeSelectPanelProps, TreeSelectProps, TreeSelectResolvedValue } from './types'
import { clone } from 'es-toolkit'
import { computed, useSlots } from 'vue'
import { PopupTriggerInput, resolveSelectionPlaceholder, useCleanAttrs, usePopupTriggerState } from '../__builtins__'
import { createPopup } from '../create-popup'
import TreeSelectPanel from './tree-select-panel.vue'
import { formatTreeSelectValue, resolveTreeSelectSelectedOptions } from './utils'

defineOptions({
  name: 'FTreeSelect',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TreeSelectProps>(), {
  items: () => [],
  popupProps: () => ({}),
})

const emit = defineEmits<{
  'update:modelValue': [value: TreeSelectResolvedValue]
  'opened': []
  'closed': []
  'clickNav': [index: number]
  'clickItem': [item: TreeSelectChild]
}>()

const slots = useSlots()
const { props: triggerInputProps } = useCleanAttrs()
const { isTriggerDisabled, isTriggerReadonly } = usePopupTriggerState({
  disabled: () => Boolean(props.disabled),
  readonly: () => Boolean(props.readonly),
})

const selectedOptions = computed(() => {
  return resolveTreeSelectSelectedOptions(props.modelValue, props.items)
})

const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      clone(props.modelValue),
      [...selectedOptions.value],
    )
  }

  return formatTreeSelectValue(props.modelValue, props.items)
})

const panelProps = computed<TreeSelectPanelProps>(() => {
  return {
    cancelButtonText: props.cancelButtonText,
    confirmButtonText: props.confirmButtonText,
    height: props.height,
    items: props.items,
    max: props.max,
    modelValue: props.modelValue,
    selectedIcon: props.selectedIcon,
    title: props.title,
  }
})

async function open() {
  if (isTriggerDisabled.value || isTriggerReadonly.value) {
    return
  }

  const popupController = createPopup<typeof TreeSelectPanel, TreeSelectResolvedValue>(
    props.popupProps,
    TreeSelectPanel,
    slots as FunctionalPopupSlots,
  )

  try {
    const popupPromise = popupController.open(computed(() => ({
      ...panelProps.value,
      onClickItem: (item: TreeSelectChild) => emit('clickItem', item),
      onClickNav: (index: number) => emit('clickNav', index),
    })))

    emit('opened')

    const value = await popupPromise

    emit('update:modelValue', value)
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
