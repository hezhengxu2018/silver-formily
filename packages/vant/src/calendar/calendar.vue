<script setup lang="ts">
import type { CalendarDayItem } from 'vant'
import type {
  CalendarInnerValue,
  CalendarModelValue,
  CalendarProps,
  CalendarResolvedValue,
  VanCalendarInstance,
} from './types'
import { useField } from '@silver-formily/vue'
import { cloneDeep, omit } from 'es-toolkit'
import { Calendar as VanCalendar } from 'vant'
import { computed, ref, useSlots } from 'vue'
import { PopupTriggerInput, useCleanAttrs, usePopupState, usePopupTriggerState } from '../__builtins__'
import {
  formatCalendarValue,
  resolveCalendarBoundaryDates,
  resolveCalendarInnerValue,
  resolveCalendarModelValue,
  resolveCalendarPlaceholder,
  resolveCalendarSelectedValue,
} from './utils'

defineOptions({
  name: 'FCalendar',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<CalendarProps>(), {
  type: 'single',
  round: true,
  showMark: true,
  showTitle: true,
  lazyRender: true,
  showConfirm: true,
  showSubtitle: true,
  closeOnPopstate: true,
  showRangePrompt: true,
  closeOnClickOverlay: true,
  safeAreaInsetBottom: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: CalendarResolvedValue]
  'update:show': [value: boolean]
  'select': [value: CalendarResolvedValue]
  'confirm': [value: CalendarResolvedValue]
  'unselect': [value: string]
  'clickOverlay': [event: MouseEvent]
  'clickDisabledDate': [item: CalendarDayItem]
  'clickSubtitle': [event: MouseEvent]
  'monthShow': [payload: { date: Date, title: string }]
  'panelChange': [payload: { date: Date }]
  'overRange': []
  'open': []
  'close': []
  'opened': []
  'closed': []
}>()

const slots = useSlots()
const fieldRef = useField()
const { props: triggerInputProps } = useCleanAttrs(['modelValue', 'onUpdate:modelValue', 'type'])
const { isTriggerDisabled, isTriggerReadonly } = usePopupTriggerState({
  field: fieldRef,
  disabled: () => Boolean(props.disabled),
  readonly: () => Boolean(props.readonly || props.readOnly),
})

const calendarRef = ref<VanCalendarInstance>()
const innerCalendarExcludedProps = [
  'modelValue',
  'placeholder',
  'displayFormatter',
  'format',
  'valueFormat',
  'minDate',
  'maxDate',
  'disabled',
  'readonly',
  'defaultDate',
  'readOnly',
] as const
const forwardedSlotNames = computed(() => {
  return Object.keys(slots).filter((slotName) => {
    return slotName !== 'default' && !slotName.startsWith('_')
  })
})

const resolvedCalendarOptions = computed(() => {
  return {
    format: props.format,
    valueFormat: props.valueFormat,
  }
})
const resolvedValue = computed(() => {
  return resolveCalendarModelValue(props.modelValue, props.type, resolvedCalendarOptions.value)
})
const resolvedInnerValue = computed(() => {
  return resolveCalendarInnerValue(props.modelValue, props.type, resolvedCalendarOptions.value)
})
const normalizedDefaultValue = computed<CalendarInnerValue | undefined>(() => {
  if (props.defaultDate === undefined) {
    return undefined
  }

  return resolveCalendarInnerValue(props.defaultDate, props.type, resolvedCalendarOptions.value)
})
const boundaryDates = computed(() => resolveCalendarBoundaryDates({
  maxDate: props.maxDate,
  minDate: props.minDate,
  valueFormat: props.valueFormat,
}))

const displayText = computed(() => {
  const value = resolvedValue.value

  if (props.displayFormatter) {
    return props.displayFormatter(cloneDeep(value), props.type)
  }

  return formatCalendarValue(value, props.type, resolvedCalendarOptions.value)
})

function resolveResetValue(value?: CalendarModelValue): CalendarInnerValue | undefined {
  if (value !== undefined) {
    return resolveCalendarInnerValue(value, props.type, resolvedCalendarOptions.value)
  }

  if (resolvedInnerValue.value !== null) {
    return resolvedInnerValue.value
  }

  return normalizedDefaultValue.value
}

function getResetValue(value?: CalendarModelValue) {
  const resolvedValue = resolveResetValue(value)

  if (resolvedValue === undefined) {
    return undefined
  }

  return cloneDeep(resolvedValue)
}

function reset(date?: CalendarModelValue) {
  calendarRef.value?.reset(getResetValue(date) as any)
}

function resetCalendarSelection() {
  reset()
}

function emitVisibilityChange(value: boolean) {
  emit('update:show', value)

  if (value) {
    emit('open')
    return
  }

  emit('close')
}

const {
  popupVisible,
  open,
  close,
  onPopupShowChange: onCalendarShowChange,
} = usePopupState({
  disabled: () => isTriggerDisabled.value || isTriggerReadonly.value,
  onBeforeOpen: resetCalendarSelection,
  onRestore: resetCalendarSelection,
  onVisibilityChange: emitVisibilityChange,
})

const innerCalendarProps = computed(() => {
  const passthroughProps = omit({ ...props }, innerCalendarExcludedProps)

  return {
    ...passthroughProps,
    defaultDate: getResetValue(),
    maxDate: boundaryDates.value.maxDate,
    minDate: boundaryDates.value.minDate,
    show: popupVisible.value,
    poppable: true,
  }
})

function resolveEmittedValue(value: Date | Date[] | null) {
  return cloneDeep(resolveCalendarModelValue(value, props.type, resolvedCalendarOptions.value))
}

function resolveSelectedValue(value: Date | Date[] | null) {
  return cloneDeep(resolveCalendarSelectedValue(value, props.type, resolvedCalendarOptions.value))
}

function onSelect(value: Date | Date[] | null) {
  emit('select', resolveSelectedValue(value))
}

function onConfirm(value: Date | Date[] | null) {
  const nextValue = resolveEmittedValue(value)

  emit('update:modelValue', nextValue)
  emit('confirm', nextValue)
  close(false)
}

function onUnselect(value: Date) {
  const nextValue = resolveCalendarModelValue(value, 'single', resolvedCalendarOptions.value)

  if (typeof nextValue === 'string') {
    emit('unselect', nextValue)
  }
}
</script>

<template>
  <PopupTriggerInput
    :input-props="triggerInputProps"
    :disabled="isTriggerDisabled"
    :value="displayText"
    :placeholder="resolveCalendarPlaceholder(props.placeholder, props.type)"
    @click="open"
  />

  <VanCalendar
    ref="calendarRef"
    v-bind="innerCalendarProps"
    @update:show="onCalendarShowChange"
    @select="onSelect"
    @confirm="onConfirm"
    @unselect="onUnselect"
    @click-overlay="(event) => emit('clickOverlay', event)"
    @click-disabled-date="(item) => emit('clickDisabledDate', item)"
    @click-subtitle="(event) => emit('clickSubtitle', event)"
    @month-show="(payload) => emit('monthShow', payload)"
    @panel-change="(payload) => emit('panelChange', payload)"
    @over-range="emit('overRange')"
    @opened="emit('opened')"
    @closed="emit('closed')"
  >
    <template
      v-for="slotName in forwardedSlotNames"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </VanCalendar>
</template>
