<script setup lang="ts">
import type { Field } from '@formily/core'
import type { PropType, Slot, VNode } from 'vue'
import type { PickerOption, PickerOptionValue } from '../picker/types'
import type {
  PickerGroupCancelEventParams,
  PickerGroupChangeEventParams,
  PickerGroupClickOptionEventParams,
  PickerGroupConfirmEventParams,
  PickerGroupDefaultSlotProps,
  PickerGroupProps,
  PickerGroupResolvedValue,
  PickerGroupScrollIntoEventParams,
  PickerGroupSelectedIndexItem,
  PickerGroupSelectedOptionItem,
  PickerGroupSlots,
  PickerGroupValueItem,
} from './types'
import { isValid } from '@formily/shared'
import { useField } from '@silver-formily/vue'
import { Picker as VanPicker, PickerGroup as VanPickerGroup, Popup as VanPopup } from 'vant'
import {
  cloneVNode,
  Comment,
  computed,
  defineComponent,
  Fragment,
  isVNode,
  provide,
  ref,
  watch,
} from 'vue'
import { cloneValue, PopupTriggerInput, resolveSelectionPlaceholder, useCleanAttrs, usePopupState } from '../__builtins__'
import { pickerGroupInlineContextKey } from './context'
import {
  clonePickerGroupValue,
  formatPickerGroupDisplay,
  normalizePickerGroupDataSource,
  resolvePickerGroupInnerValue,
  resolvePickerGroupModelValue,
  resolvePickerGroupSelectedIndexes,
  resolvePickerGroupSelectedOptions,
  resolvePickerGroupSlotInnerValue,
  resolvePickerGroupTabs,
} from './utils'

interface PickerGroupSlotEventState {
  selectedIndexes?: PickerGroupSelectedIndexItem
  selectedOptions?: PickerGroupSelectedOptionItem
}

defineOptions({
  name: 'FPickerGroup',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PickerGroupProps>(), {
  dataSource: () => [],
  separator: ' / ',
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
  'change': [payload: PickerGroupChangeEventParams]
  'confirm': [payload: PickerGroupConfirmEventParams]
  'cancel': [payload: PickerGroupCancelEventParams]
  'clickOption': [payload: PickerGroupClickOptionEventParams]
  'scrollInto': [payload: PickerGroupScrollIntoEventParams]
  'clickOverlay': [event: MouseEvent]
  'open': []
  'close': []
  'opened': []
  'closed': []
}>()

const slots = defineSlots<PickerGroupSlots>()

const PickerGroupSlotNode = defineComponent({
  name: 'PickerGroupSlotNode',
  props: {
    renderSlot: {
      type: Function as PropType<Slot | undefined>,
      default: undefined,
    },
    resolveNodeProps: {
      type: Function as PropType<(node: VNode, index: number) => Record<string, unknown>>,
      required: true,
    },
    slotProps: {
      type: Object as PropType<PickerGroupDefaultSlotProps>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(localProps) {
    return () => {
      const nodes = normalizeSlotNodes(localProps.renderSlot?.(localProps.slotProps))
      const node = nodes[localProps.index]

      if (!node)
        return null

      return cloneVNode(node, localProps.resolveNodeProps(node, localProps.index))
    }
  },
})

const INTERNAL_NEXT_STEP_TEXT = '下一步'

const fieldRef = useField<Field>()
provide(pickerGroupInlineContextKey, true)
const { props: triggerInputProps } = useCleanAttrs(['dataSource', 'modelValue', 'onUpdate:modelValue'])
const activeTab = ref(0)
const innerValue = ref<Array<PickerGroupValueItem | undefined>>([])
const slotEventState = ref<PickerGroupSlotEventState[]>([])

const normalizedDataSource = computed(() => {
  return normalizePickerGroupDataSource(props.dataSource, props.columnsFieldNames)
})
const selectedOptions = computed(() => {
  return resolvePickerGroupSelectedOptions(props.modelValue, props.dataSource, props.columnsFieldNames)
})
const displayValue = computed(() => resolvePickerGroupModelValue(props.modelValue))
const displayText = computed(() => {
  if (props.displayFormatter) {
    return props.displayFormatter(
      clonePickerGroupValue(displayValue.value),
      [...selectedOptions.value],
    )
  }

  return formatPickerGroupDisplay(
    props.modelValue,
    props.dataSource,
    props.columnsFieldNames,
    props.separator,
  )
})

function clonePickerGroupValueItem(value: PickerGroupValueItem | undefined) {
  return Array.isArray(value)
    ? cloneValue(value)
    : value
}

function hasOwnProp(value: unknown, key: string) {
  return !!value
    && typeof value === 'object'
    && Object.hasOwn(value, key)
}

function normalizeSlotNodes(nodes: unknown): VNode[] {
  if (!Array.isArray(nodes))
    return []

  return nodes.flatMap((node) => {
    if (!isVNode(node) || node.type === Comment)
      return []

    if (node.type === Fragment)
      return normalizeSlotNodes(node.children)

    return [node]
  })
}

function setValue(index: number, value: PickerGroupValueItem | undefined) {
  const nextValue = [...innerValue.value]
  nextValue[index] = clonePickerGroupValueItem(value)
  innerValue.value = nextValue

  return nextValue
}

const hasDefaultSlot = computed(() => Boolean(slots.default))
const tabs = computed(() => resolvePickerGroupTabs(props.dataSource, props.columnsFieldNames))
const slotRendererProps = computed<PickerGroupDefaultSlotProps>(() => {
  return {
    activeTab: activeTab.value,
    modelValue: clonePickerGroupValue(
      resolvePickerGroupModelValue(innerValue.value as PickerGroupResolvedValue),
    ),
    setActiveTab: onActiveTabChange,
    setValue,
    values: innerValue.value.map(clonePickerGroupValueItem),
  }
})

function normalizeActiveTab(value: number | string) {
  const max = Math.max(tabs.value.length - 1, 0)
  const nextValue = Number(value)

  if (!Number.isFinite(nextValue))
    return 0

  return Math.min(Math.max(Math.round(nextValue), 0), max)
}

function onActiveTabChange(value: number | string) {
  activeTab.value = normalizeActiveTab(value)
}

function createInjectedSlotNodeProps(node: VNode, index: number) {
  const nodeProps = node.props as Record<string, unknown> | null | undefined
  const injectedProps: Record<string, unknown> = {
    'modelValue': clonePickerGroupValueItem(innerValue.value[index]),
    'readonly': Boolean(props.readonly || props.readOnly || props.disabled || nodeProps?.readonly || nodeProps?.readOnly),
    'onUpdate:modelValue': (value: unknown) => onSlotModelValueChange(index, value),
    'onChange': (payload: unknown) => onSlotChange(index, payload),
    'onClickOption': (payload: unknown) => onSlotClickOption(index, payload),
    'onScrollInto': (payload: unknown) => onSlotScrollInto(index, payload),
  }

  if (!hasOwnProp(nodeProps, 'allowHtml') && props.allowHtml !== undefined)
    injectedProps.allowHtml = props.allowHtml

  if (!hasOwnProp(nodeProps, 'optionHeight') && props.optionHeight !== undefined)
    injectedProps.optionHeight = props.optionHeight

  if (!hasOwnProp(nodeProps, 'swipeDuration') && props.swipeDuration !== undefined)
    injectedProps.swipeDuration = props.swipeDuration

  if (!hasOwnProp(nodeProps, 'visibleOptionNum') && props.visibleOptionNum !== undefined)
    injectedProps.visibleOptionNum = props.visibleOptionNum

  return injectedProps
}

function resetSlotEventState(tabCount = 0) {
  slotEventState.value = Array.from({ length: tabCount }, () => ({}))
}

function resetInnerValue() {
  if (hasDefaultSlot.value) {
    innerValue.value = resolvePickerGroupSlotInnerValue(
      props.modelValue,
      tabs.value.length,
    )
    resetSlotEventState(tabs.value.length)
    return
  }

  innerValue.value = resolvePickerGroupInnerValue(
    props.modelValue,
    props.dataSource,
    props.columnsFieldNames,
  )
  resetSlotEventState()
}

function resetActiveTab() {
  activeTab.value = 0
}

function resolveSlotEventStateFromPayload(payload: unknown): PickerGroupSlotEventState {
  const nextState: PickerGroupSlotEventState = {}

  if (payload && typeof payload === 'object') {
    const eventPayload = payload as Record<string, unknown>

    if (Array.isArray(eventPayload.selectedIndexes))
      nextState.selectedIndexes = [...eventPayload.selectedIndexes] as number[]

    if (Array.isArray(eventPayload.selectedOptions))
      nextState.selectedOptions = cloneValue(eventPayload.selectedOptions) as Array<PickerOption | undefined>
  }

  return nextState
}

function syncSlotEventState(tabIndex: number, payload: unknown) {
  const nextState = [...slotEventState.value]
  nextState[tabIndex] = {
    ...nextState[tabIndex],
    ...resolveSlotEventStateFromPayload(payload),
  }
  slotEventState.value = nextState
}

function syncSlotEventStateFromConfirmPayload(payload: unknown) {
  if (!Array.isArray(payload))
    return

  const nextState = [...slotEventState.value]
  payload.forEach((item, index) => {
    nextState[index] = {
      ...nextState[index],
      ...resolveSlotEventStateFromPayload(item),
    }
  })
  slotEventState.value = nextState
}

function emitVisibilityChange(value: boolean) {
  emit('update:show', value)

  if (value) {
    emit('open')
    return
  }

  emit('close')
}

const { popupVisible, open, close, onPopupShowChange } = usePopupState({
  disabled: () => props.disabled || props.readonly || props.readOnly,
  onBeforeOpen: () => {
    resetInnerValue()
    resetActiveTab()
  },
  onRestore: () => {
    resetInnerValue()
    resetActiveTab()
  },
  onVisibilityChange: emitVisibilityChange,
})

watch(
  [() => props.dataSource, () => props.modelValue],
  () => {
    if (!popupVisible.value) {
      resetInnerValue()
      resetActiveTab()
    }
  },
  { deep: true, immediate: true },
)

const popupProps = computed(() => {
  return {
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
    show: popupVisible.value,
    teleport: props.teleport,
    transition: props.transition,
    zIndex: props.zIndex,
  }
})

const pickerGroupProps = computed(() => {
  return {
    activeTab: activeTab.value,
    cancelButtonText: props.cancelButtonText,
    confirmButtonText: props.confirmButtonText,
    nextStepText: tabs.value.length > 1 ? INTERNAL_NEXT_STEP_TEXT : undefined,
    showToolbar: true,
    tabs: tabs.value,
    title: props.title,
  }
})

function resolveTabModelValue(index: number) {
  const currentValue = innerValue.value[index]

  return isValid(currentValue)
    ? [currentValue as PickerOptionValue]
    : []
}

function createBaseEventPayload(
  modelValue: Array<PickerGroupValueItem | undefined> | PickerGroupResolvedValue = innerValue.value,
) {
  const resolvedValue = clonePickerGroupValue(
    resolvePickerGroupModelValue(modelValue as PickerGroupResolvedValue),
  ) ?? []

  if (hasDefaultSlot.value) {
    const tabCount = Math.max(tabs.value.length, resolvedValue.length)

    return {
      field: fieldRef.value,
      selectedIndexes: Array.from({ length: tabCount }, (_, index) => {
        const currentValue = slotEventState.value[index]?.selectedIndexes

        return Array.isArray(currentValue)
          ? [...currentValue]
          : typeof currentValue === 'number'
            ? currentValue
            : -1
      }),
      selectedOptions: Array.from({ length: tabCount }, (_, index) => {
        return cloneValue(slotEventState.value[index]?.selectedOptions)
      }),
      selectedValues: resolvedValue,
    }
  }

  return {
    field: fieldRef.value,
    selectedIndexes: resolvePickerGroupSelectedIndexes(
      modelValue as PickerGroupResolvedValue,
      props.dataSource,
      props.columnsFieldNames,
    ),
    selectedOptions: [
      ...resolvePickerGroupSelectedOptions(
        modelValue as PickerGroupResolvedValue,
        props.dataSource,
        props.columnsFieldNames,
      ),
    ],
    selectedValues: resolvedValue,
  }
}

function onPickerValueChange(tabIndex: number, value: PickerOptionValue[]) {
  setValue(tabIndex, value[0])
}

function onChange(tabIndex: number, payload: { selectedValues: PickerOptionValue[] }) {
  const nextValue = setValue(tabIndex, payload.selectedValues[0])

  emit('change', {
    ...createBaseEventPayload(nextValue),
    tabIndex,
  })
}

function onCancel() {
  emit('cancel', createBaseEventPayload())
  close()
}

function onConfirm(payload?: unknown) {
  if (hasDefaultSlot.value)
    syncSlotEventStateFromConfirmPayload(payload)

  const nextValue = resolvePickerGroupModelValue(innerValue.value as PickerGroupResolvedValue)

  emit('update:modelValue', clonePickerGroupValue(nextValue))
  emit('confirm', createBaseEventPayload(nextValue))
  close(false)
}

function onClickOption(
  tabIndex: number,
  payload: {
    currentOption?: PickerOption
    selectedValues: PickerOptionValue[]
  },
) {
  const nextValue = setValue(tabIndex, payload.selectedValues[0])

  emit('clickOption', {
    ...createBaseEventPayload(nextValue),
    currentOption: payload.currentOption,
    tabIndex,
  })
}

function onScrollInto(
  tabIndex: number,
  payload: { currentOption?: PickerOption },
) {
  emit('scrollInto', {
    currentOption: payload.currentOption,
    field: fieldRef.value,
    tabIndex,
  })
}

function resolveSlotModelValue(value: unknown) {
  return Array.isArray(value)
    ? cloneValue(value) as PickerOptionValue[]
    : isValid(value)
      ? value as PickerOptionValue
      : undefined
}

function onSlotModelValueChange(tabIndex: number, value: unknown) {
  setValue(tabIndex, resolveSlotModelValue(value))
}

function onSlotChange(tabIndex: number, payload: unknown) {
  syncSlotEventState(tabIndex, payload)

  emit('change', {
    ...createBaseEventPayload(),
    tabIndex,
  })
}

function onSlotClickOption(tabIndex: number, payload: unknown) {
  syncSlotEventState(tabIndex, payload)

  const currentOption = payload && typeof payload === 'object'
    ? (payload as { currentOption?: PickerOption }).currentOption
    : undefined

  emit('clickOption', {
    ...createBaseEventPayload(),
    currentOption,
    tabIndex,
  })
}

function onSlotScrollInto(tabIndex: number, payload: unknown) {
  const currentOption = payload && typeof payload === 'object'
    ? (payload as { currentOption?: PickerOption }).currentOption
    : undefined

  emit('scrollInto', {
    currentOption,
    field: fieldRef.value,
    tabIndex,
  })
}

function onClosed() {
  resetActiveTab()
  resetSlotEventState(hasDefaultSlot.value ? tabs.value.length : 0)
  emit('closed')
}
</script>

<template>
  <PopupTriggerInput
    :input-props="triggerInputProps"
    :disabled="props.disabled"
    :value="displayText"
    :placeholder="resolveSelectionPlaceholder(props.placeholder)"
    @click="open"
  />

  <VanPopup
    v-bind="popupProps"
    @update:show="onPopupShowChange"
    @click-overlay="(event) => emit('clickOverlay', event)"
    @opened="emit('opened')"
    @closed="onClosed"
  >
    <VanPickerGroup
      v-bind="pickerGroupProps"
      @update:active-tab="onActiveTabChange"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <template v-if="hasDefaultSlot">
        <PickerGroupSlotNode
          v-for="(_, tabIndex) in tabs"
          :key="tabIndex"
          :index="tabIndex"
          :render-slot="slots.default"
          :resolve-node-props="createInjectedSlotNodeProps"
          :slot-props="slotRendererProps"
        />
      </template>

      <template v-else>
        <VanPicker
          v-for="(item, dataIndex) in normalizedDataSource"
          :key="`${item.title}-${dataIndex}`"
          :allow-html="props.allowHtml"
          :columns="item.options as any"
          :model-value="resolveTabModelValue(dataIndex)"
          :option-height="props.optionHeight"
          :readonly="props.readonly || props.readOnly || props.disabled"
          :swipe-duration="props.swipeDuration"
          :visible-option-num="props.visibleOptionNum"
          @update:model-value="(value) => onPickerValueChange(dataIndex, value)"
          @change="(payload) => onChange(dataIndex, payload)"
          @click-option="(payload) => onClickOption(dataIndex, payload)"
          @scroll-into="(payload) => onScrollInto(dataIndex, payload)"
        >
          <template v-if="$slots.option" #option="option">
            <slot name="option" v-bind="option ?? {}" />
          </template>

          <template v-if="$slots.empty" #empty>
            <slot name="empty" />
          </template>
        </VanPicker>
      </template>

      <template v-if="$slots.title" #title>
        <slot name="title" />
      </template>

      <template v-if="$slots.cancel" #cancel>
        <slot name="cancel" />
      </template>

      <template v-if="$slots.confirm" #confirm>
        <slot name="confirm" />
      </template>

      <template v-if="$slots.toolbar" #toolbar>
        <slot name="toolbar" />
      </template>
    </VanPickerGroup>
  </VanPopup>
</template>
