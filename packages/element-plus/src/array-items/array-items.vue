<script lang="ts" setup>
import type { ArrayField } from '@formily/core'
import { autorun } from '@formily/reactive'
import { isArr } from '@formily/shared'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useCleanAttrs } from '../__builtins__'
import { stylePrefix } from '../__builtins__/configs'
import { ArrayBase } from '../array-base'
import { getArrayItemSchema, isAdditionComponent, useKey } from '../array-base/utils'

defineOptions({
  name: 'FArrayItems',
  inheritAttrs: false,
})

const fieldRef = useField<ArrayField>()
const schemaRef = useFieldSchema()
const field = fieldRef.value
const schema = schemaRef.value

const prefixCls = `${stylePrefix}-array-items`
const { getKey, keyMap } = useKey(schemaRef.value)
const dataSource = ref(isArr(field.value) ? field.value : [])
const triggerUpdateKey = ref(0)

autorun(() => {
  dataSource.value = isArr(field.value) ? [...field.value] : []
})

async function handleDragEnd(evt: { oldIndex: number, newIndex: number }) {
  const { oldIndex, newIndex } = evt
  if (isArr(keyMap)) {
    keyMap.splice(newIndex, 0, keyMap.splice(oldIndex, 1)[0])
  }
  await field.move(oldIndex, newIndex)
  triggerUpdateKey.value++
}
const { props: arrayItemsProps } = useCleanAttrs(['value', 'modelValue', 'onUpdate:modelValue'])
</script>

<template>
  <div :class="prefixCls" v-bind="arrayItemsProps">
    <ArrayBase :key="triggerUpdateKey" :key-map="keyMap">
      <VueDraggable
        :class="`${prefixCls}-list`"
        :model-value="dataSource"
        :handle="`.${stylePrefix}-array-base-sort-handle`"
        :animation="150"
        @end="handleDragEnd"
      >
        <ArrayBase.Item
          v-for="(element, index) of dataSource"
          :key="getKey(element, index)"
          :index="index"
          :record="element"
        >
          <div :key="getKey(element, index)" :class="[`${prefixCls}-item-inner`]" :index="index">
            <RecursionField :schema="getArrayItemSchema(schema, index)" :name="index" />
          </div>
        </ArrayBase.Item>
      </VueDraggable>

      <template v-for="(itemSchema, key) of schema.properties" :key="key">
        <RecursionField v-if="isAdditionComponent(itemSchema)" :schema="itemSchema" name="addition" />
      </template>
    </ArrayBase>
  </div>
</template>
