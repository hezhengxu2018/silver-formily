<script setup lang="ts">
import type { CalendarDayItem } from 'vant'
import type {
  CalendarModelValue,
  CalendarProps,
  CalendarResolvedValue,
  VanCalendarInstance,
} from './types'
import { omit } from 'es-toolkit'
import { Calendar as VanCalendar } from 'vant'
import { computed, ref, useSlots } from 'vue'
import { PopupTriggerInput, useCleanAttrs, usePopupState } from '../__builtins__'
import {
  cloneCalendarValue,
  formatCalendarValue,
  normalizeCalendarValue,
  resolveCalendarPlaceholder,
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
  'update:modelValue': [value: Date | Date[] | null]
  'update:show': [value: boolean]
  'select': [value: Date | Date[] | null]
  'confirm': [value: Date | Date[] | null]
  'unselect': [value: Date]
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
const { props: triggerInputProps } = useCleanAttrs(['modelValue', 'onUpdate:modelValue', 'type'])

const calendarRef = ref<VanCalendarInstance>()
const innerCalendarExcludedProps = [
  'modelValue',
  'placeholder',
  'displayFormatter',
  'disabled',
  'readonly',
  'defaultDate',
] as const
const forwardedSlotNames = computed(() => {
  return Object.keys(slots).filter((slotName) => {
    return slotName !== 'default' && !slotName.startsWith('_')
  })
})

const normalizedValue = computed(() => normalizeCalendarValue(props.modelValue, props.type))
const normalizedDefaultValue = computed<CalendarResolvedValue | undefined>(() => {
  if (props.defaultDate === undefined) {
    return undefined
  }

  return normalizeCalendarValue(props.defaultDate, props.type)
})

const displayText = computed(() => {
  const value = normalizedValue.value

  if (props.displayFormatter) {
    return props.displayFormatter(cloneCalendarValue(value), props.type)
  }

  return formatCalendarValue(value, props.type)
})

const resolvedPlaceholder = computed(() => resolveCalendarPlaceholder(props.placeholder, props.type))

function resolveResetValue(value?: CalendarModelValue): CalendarResolvedValue | undefined {
  if (value !== undefined) {
    return normalizeCalendarValue(value, props.type)
  }

  if (normalizedValue.value !== null) {
    return normalizedValue.value
  }

  return normalizedDefaultValue.value
}

function getResetValue(value?: CalendarModelValue) {
  const resolvedValue = resolveResetValue(value)

  if (resolvedValue === undefined) {
    return undefined
  }

  return cloneCalendarValue(resolvedValue)
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
  disabled: () => props.disabled || props.readonly,
  onBeforeOpen: resetCalendarSelection,
  onRestore: resetCalendarSelection,
  onVisibilityChange: emitVisibilityChange,
})

const innerCalendarProps = computed(() => {
  const passthroughProps = omit({ ...props }, innerCalendarExcludedProps)

  return {
    ...passthroughProps,
    defaultDate: getResetValue(),
    show: popupVisible.value,
    poppable: true,
    readonly: props.readonly || props.disabled,
  }
})

function onSelect(value: Date | Date[] | null) {
  emit('select', cloneCalendarValue(value))
}

function onConfirm(value: Date | Date[] | null) {
  const nextValue = cloneCalendarValue(value)

  emit('update:modelValue', nextValue)
  emit('confirm', nextValue)
  close(false)
}

function onUnselect(value: Date) {
  emit('unselect', new Date(value))
}
</script>

<template>
  <PopupTriggerInput
    :input-props="triggerInputProps"
    :disabled="props.disabled"
    :value="displayText"
    :placeholder="resolvedPlaceholder"
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
