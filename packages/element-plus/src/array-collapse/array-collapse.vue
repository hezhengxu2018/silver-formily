<script lang="ts" setup>
import type { ArrayField } from '@formily/core'
import type { ISchema } from '@formily/json-schema'
import { autorun } from '@formily/reactive'
import { isArr } from '@formily/shared'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import {
  ElCard,
  ElCollapse,
  ElEmpty,
} from 'element-plus'
import { ref, watchEffect } from 'vue'
import { useCleanAttrs } from '../__builtins__'
import { ArrayBase } from '../array-base'
import { getArrayItemSchema, isAdditionComponent, isIndexComponent, isOperationComponent } from '../array-base/utils'
import { prefixCls } from './utils'

defineOptions({
  name: 'FArrayCollapse',
  inheritAttrs: false,
})

const props = defineProps({
  modelValue: {},
  defaultOpenPanelCount: {
    type: Number,
    default: 5,
  },
})

const fieldRef = useField<ArrayField>()
const schemaRef = useFieldSchema()
const field = fieldRef.value
const schema = schemaRef.value

const { props: collapseProps } = useCleanAttrs(['modelValue', 'onUpdate:modelValue'])
const activeKeys = ref<number[] | number>([])

const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

const dataSource = ref(isArr(field.value) ? field.value : [])

autorun(() => {
  dataSource.value = isArr(field.value) ? [...field.value] : []
})

function range(count: number) {
  return Array.from({ length: count }).map((_, i) => i)
}

function takeDefaultActiveKeys(dataSourceLength: number, defaultOpenPanelCount: number, accordion = false) {
  if (accordion) {
    return 0
  }
  if (dataSourceLength < defaultOpenPanelCount)
    return range(dataSourceLength)

  return range(defaultOpenPanelCount)
}

function insertActiveKeys(activeKeys: number[] | number, index: number, accordion = false) {
  if (accordion)
    return index
  /* istanbul ignore if -- @preserve */
  if (!isArr(activeKeys))
    return index
  if (activeKeys.length <= index)
    return (activeKeys).concat(index)
  return (activeKeys).reduce((buf, key) => {
    if (key === index)
      return [...buf, key, key + 1]
    return buf.concat(key + 1)
  }, [])
}

watchEffect(() => {
  if (!field.modified && dataSource.value.length > 0) {
    activeKeys.value = takeDefaultActiveKeys(
      dataSource.value.length,
      props.defaultOpenPanelCount,
      collapseProps.value.accordion as boolean,
    )
  }
})

function handleCollapseChange(keys: number[] | number) {
  activeKeys.value = keys
}
</script>

<template>
  <div :class="prefixCls">
    <ArrayBase
      :key="dataSource.length"
      :key-map="keyMap"
      :add="(index: number) => {
        activeKeys = insertActiveKeys(
          activeKeys,
          index,
          collapseProps.accordion as boolean,
        )
      }"
    >
      <template v-if="!Array.isArray(props.modelValue) || props.modelValue.length === 0">
        <ElCard :class="[`${prefixCls}-item`]" shadow="never" v-bind="collapseProps" :header="collapseProps.title || field.title">
          <ElEmpty />
        </ElCard>
      </template>
      <template v-else>
        <ElCollapse
          :model-value="activeKeys"
          :class="`${prefixCls}-item`"
          v-bind="collapseProps"
          @change="handleCollapseChange"
        >
          <ArrayBase.Item v-for="(item, index) of dataSource" :key="getKey(item, index)" :index="index" :record="item">
            <RecursionField
              :schema="getArrayItemSchema(schema, index)"
              :name="index"
              :filter-properties="(schema: ISchema) => !isIndexComponent(schema) && !isOperationComponent(schema)"
            />
          </ArrayBase.Item>
        </ElCollapse>
      </template>
      <template v-for="(itemSchema, key) in schema.properties" :key="key">
        <RecursionField v-if="isAdditionComponent(itemSchema)" :schema="itemSchema" name="addition" />
      </template>
    </ArrayBase>
  </div>
</template>
