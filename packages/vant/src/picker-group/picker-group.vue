<script setup lang="ts">
import type { Field } from '@formily/core'
import type { FunctionalPopupSlots } from '../create-popup'
import type {
  PickerGroupCancelEventParams,
  PickerGroupConfirmEventParams,
  PickerGroupPanelProps,
  PickerGroupPopupProps,
  PickerGroupProps,
  PickerGroupResolvedValue,
} from './types'
import { useField } from '@silver-formily/vue'
import { computed, useSlots } from 'vue'
import { callListener, PopupTriggerInput, resolveSelectionPlaceholder, useCleanAttrs } from '../__builtins__'
import { createPopup } from '../create-popup'
import PickerGroupPanel from './picker-group-panel.vue'
import {
  clonePickerGroupValue,
  formatPickerGroupDisplay,
  resolvePickerGroupModelValue,
} from './utils'

defineOptions({
  name: 'FPickerGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PickerGroupProps>(), {
  dataSource: () => [],
  separator: ' / ',
  nextStepText: '下一步',
  popupProps: () => ({}),
  position: 'bottom',
  round: true,
  overlay: true,
  lockScroll: true,
  lazyRender: true,
  closeOnPopstate: true,
  closeOnClickOverlay: true,
  safeAreaInsetBottom: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: PickerGroupResolvedValue]
  'update:show': [value: boolean]
  'confirm': [payload: PickerGroupConfirmEventParams]
  'cancel': [payload: PickerGroupCancelEventParams]
  'clickOverlay': [event: MouseEvent]
  'open': []
  'close': []
  'opened': []
  'closed': []
}>()

const slots = useSlots()
const fieldRef = useField<Field>()
const { props: triggerInputProps } = useCleanAttrs(['dataSource', 'modelValue', 'onUpdate:modelValue', 'tabs'])
let closingByOverlay = false

const isReadonly = computed(() => {
  return Boolean(props.readonly || props.readOnly)
})
const isTriggerDisabled = computed(() => {
  return Boolean(props.disabled || isReadonly.value)
})

const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      clonePickerGroupValue(resolvePickerGroupModelValue(props.modelValue)),
    )
  }

  return formatPickerGroupDisplay(
    props.modelValue,
    props.dataSource,
    props.columnsFieldNames,
    props.separator,
  )
})

const popupBindings = computed(() => {
  const popupProps = props.popupProps as Record<string, unknown>
  const legacyPopupProps = {
    closeOnClickOverlay: props.closeOnClickOverlay,
    closeOnPopstate: props.closeOnPopstate,
    duration: props.duration,
    lazyRender: props.lazyRender,
    lockScroll: props.lockScroll,
    overlay: props.overlay,
    position: props.position,
    round: props.round,
    safeAreaInsetBottom: props.safeAreaInsetBottom,
    safeAreaInsetTop: props.safeAreaInsetTop,
    teleport: props.teleport,
    transition: props.transition,
    zIndex: props.zIndex,
  } satisfies PickerGroupPopupProps

  return {
    ...legacyPopupProps,
    ...props.popupProps,
    onClickOverlay: (event: MouseEvent) => {
      if ((popupProps.closeOnClickOverlay ?? legacyPopupProps.closeOnClickOverlay) !== false)
        closingByOverlay = true

      emit('clickOverlay', event)
      callListener(popupProps.onClickOverlay, event)
    },
    onOpened: () => {
      emit('opened')
      callListener(popupProps.onOpened)
    },
    onClosed: () => {
      emit('closed')
      callListener(popupProps.onClosed)
    },
  } satisfies PickerGroupPopupProps & Record<string, unknown>
})
const panelProps = computed<PickerGroupPanelProps>(() => {
  return {
    allowHtml: props.allowHtml,
    cancelButtonText: props.cancelButtonText,
    columnsFieldNames: props.columnsFieldNames,
    confirmButtonText: props.confirmButtonText,
    dataSource: props.dataSource,
    disabled: props.disabled,
    modelValue: props.modelValue,
    nextStepText: props.nextStepText,
    optionHeight: props.optionHeight,
    readOnly: props.readOnly,
    readonly: isReadonly.value,
    swipeDuration: props.swipeDuration,
    tabs: props.tabs,
    title: props.title,
    visibleOptionNum: props.visibleOptionNum,
  }
})

function createBaseEventPayload(modelValue: PickerGroupResolvedValue = props.modelValue ?? null) {
  return {
    field: fieldRef.value,
    selectedValues: clonePickerGroupValue(resolvePickerGroupModelValue(modelValue)) ?? [],
  }
}

async function open() {
  if (isTriggerDisabled.value) {
    return
  }

  closingByOverlay = false

  const popupController = createPopup<typeof PickerGroupPanel, PickerGroupResolvedValue>(
    popupBindings.value,
    PickerGroupPanel,
    slots as FunctionalPopupSlots,
  )

  emit('update:show', true)
  emit('open')

  try {
    const value = await popupController.open(panelProps)

    emit('update:modelValue', clonePickerGroupValue(value))
    emit('confirm', createBaseEventPayload(value))
  }
  catch {
    if (!closingByOverlay) {
      emit('cancel', createBaseEventPayload())
    }
  }
  finally {
    closingByOverlay = false
    emit('update:show', false)
    emit('close')
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
