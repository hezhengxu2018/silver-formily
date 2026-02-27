<script setup lang="ts">
import type { Field } from '@formily/core'
import type { TreeValueTypeProps } from './types'
import { isFn } from '@formily/shared'
import { useField } from '@silver-formily/vue'
import { ElScrollbar, ElTree, vLoading } from 'element-plus'
import { computed, nextTick, ref, useSlots, watch } from 'vue'
import { useCleanAttrs } from '../__builtins__'
import { addDisabledToNodes, flattenTree, getInputKeys, getOutputData } from './utils'

defineOptions({
  name: 'Tree',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<TreeValueTypeProps>(), {
  valueType: 'all',
  optionAsValue: false,
  includeHalfChecked: false,
  props: {
    children: 'children',
    label: 'label',
    disabled: 'disabled',
  },
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

const slots = useSlots()

const { props: attrs } = useCleanAttrs()
const treeRef = ref<InstanceType<typeof ElTree>>()
const checkedKeys = ref<any[]>([])

const processedData = computed(() => {
  return addDisabledToNodes(props.data ?? [], attrs.value.disabled, props.props)
})

const flatData = computed(() => flattenTree(processedData.value ?? [], [], props.props.children))

async function handleCheck() {
  await nextTick()
  const keys = treeRef.value.getCheckedKeys()
  const halfCheckedKeys = treeRef.value.getHalfCheckedKeys() || []
  checkedKeys.value = keys

  const { value, nodes } = getOutputData(keys, halfCheckedKeys, {
    flatData: flatData.value,
    nodeKey: props.nodeKey,
    propsConfig: props.props,
    data: props.data ?? [],
    valueType: props.valueType,
    includeHalfChecked: props.includeHalfChecked,
    checkStrictly: attrs.value.checkStrictly,
  })

  if (props.optionAsValue) {
    isFn(props.optionFormatter)
      ? emit('update:modelValue', nodes.map((element, index, array) => {
          return props.optionFormatter(element, index, array)
        }))
      : emit('update:modelValue', nodes)
  }
  else {
    emit('update:modelValue', value)
  }
}

watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined) {
    checkedKeys.value = getInputKeys(newValue, {
      optionAsValue: props.optionAsValue,
      nodeKey: props.nodeKey,
      flatData: flatData.value,
      propsConfig: props.props,
      data: props.data ?? [],
      valueType: props.valueType,
      checkStrictly: attrs.value.checkStrictly,
    })
    nextTick(() => {
      if (treeRef.value) {
        treeRef.value.setCheckedKeys(checkedKeys.value)
      }
    })
  }
}, { immediate: true })

watch(() => [props.valueType, props.optionAsValue, props.includeHalfChecked], () => {
  handleCheck()
}, { immediate: false })

const fieldRef = useField<Field>()
fieldRef.value?.inject({
  getTreeRef: () => {
    return treeRef
  },
})
</script>

<template>
  <ElScrollbar :height="props.height" :max-height="props.maxHeight">
    <ElTree
      ref="treeRef"
      v-loading="attrs.loading"
      :data="processedData"
      :props="props.props"
      :node-key="props.nodeKey"
      :default-checked-keys="checkedKeys"
      :show-checkbox="true"
      v-bind="attrs"
      @check="handleCheck"
    >
      <template v-for="(_, name) of slots" #[name]="slotData">
        <slot :name="name" v-bind="{ field: fieldRef, ...slotData }" />
      </template>
    </ElTree>
  </ElScrollbar>
</template>
