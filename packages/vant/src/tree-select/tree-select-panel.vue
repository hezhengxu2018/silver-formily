<script setup lang="ts">
import type { TreeSelectChild, TreeSelectPanelProps, TreeSelectResolvedValue } from './types'
import { clone } from 'es-toolkit'
import { TreeSelect as VanTreeSelect } from 'vant'
import { computed, ref, useSlots, watch } from 'vue'
import 'vant/es/picker/index.css'

defineOptions({
  name: 'FTreeSelectPanel',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TreeSelectPanelProps>(), {
  cancelButtonText: '取消',
  confirmButtonText: '确认',
  height: 300,
  items: () => [],
  showToolbar: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: TreeSelectResolvedValue]
  'confirm': [value: TreeSelectResolvedValue]
  'cancel': []
  'clickNav': [index: number]
  'clickItem': [item: TreeSelectChild]
}>()

const slots = useSlots()
const innerValue = ref<TreeSelectResolvedValue>(clone(props.modelValue))
const internalMainActiveIndex = ref(0)

const treeSelectProps = computed(() => {
  return {
    activeId: innerValue.value,
    height: props.height,
    items: props.items,
    max: props.max,
    selectedIcon: props.selectedIcon,
  }
})

watch(
  () => props.modelValue,
  (value) => {
    innerValue.value = clone(value)
  },
)

function onUpdateActiveId(value: TreeSelectResolvedValue) {
  innerValue.value = clone(value)
}

function onCancel() {
  innerValue.value = clone(props.modelValue)
  emit('cancel')
}

function onConfirm() {
  const value = clone(innerValue.value)

  emit('update:modelValue', value)
  emit('confirm', value)
}

function onClickNav(index: number) {
  emit('clickNav', index)
}

function onClickItem(item: TreeSelectChild) {
  emit('clickItem', item)
}
</script>

<template>
  <div class="van-picker">
    <div v-if="props.showToolbar" class="van-picker__toolbar">
      <button type="button" class="van-picker__cancel" @click="onCancel">
        <slot v-if="slots.cancel" name="cancel" />
        <template v-else>
          {{ props.cancelButtonText }}
        </template>
      </button>
      <div v-if="props.title || slots.title" class="van-picker__title van-ellipsis">
        <slot v-if="slots.title" name="title" />
        <template v-else>
          {{ props.title }}
        </template>
      </div>
      <button type="button" class="van-picker__confirm" @click="onConfirm">
        <slot v-if="slots.confirm" name="confirm" />
        <template v-else>
          {{ props.confirmButtonText }}
        </template>
      </button>
    </div>

    <VanTreeSelect
      v-bind="treeSelectProps"
      v-model:main-active-index="internalMainActiveIndex"
      @update:active-id="onUpdateActiveId"
      @click-nav="onClickNav"
      @click-item="onClickItem"
    >
      <template v-if="slots['nav-text']" #nav-text="slotData">
        <slot name="nav-text" v-bind="slotData" />
      </template>
      <template v-if="slots.content" #content>
        <slot name="content" />
      </template>
    </VanTreeSelect>
  </div>
</template>
