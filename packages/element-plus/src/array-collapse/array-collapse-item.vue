<script lang="ts" setup>
import type { ArrayField } from '@formily/core'
import type { ISchema } from '@formily/json-schema'
import { isArr } from '@formily/shared'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import { ElBadge, ElCollapseItem } from 'element-plus'
import { useCleanAttrs } from '../__builtins__'
import { isIndexComponent, isOperationComponent, useIndex } from '../array-base/utils'
import { prefixCls } from './utils'

defineOptions({
  name: 'FArrayCollapseItem',
  inheritAttrs: false,
})

const fieldRef = useField<ArrayField>()
const field = fieldRef.value
const schemaRef = useFieldSchema()
const schema = schemaRef.value.parent
const index = useIndex()
const errorCount = formilyComputed(() => {
  const path = field.address.concat()
  return field.form.queryFeedbacks({
    type: 'error',
    address: `${path}.**`,
  }).length
})

const { props: collapseItemProps } = useCleanAttrs()
</script>

<template>
  <ElCollapseItem :name="index" v-bind="collapseItemProps">
    <template #title>
      <div style="flex: 1;display: flex;align-items: center;">
        <RecursionField
          v-if="!isArr(schema.items)"
          :schema="schema.items"
          :name="index"
          :filter-properties="(schema: ISchema) => isIndexComponent(schema)"
          :only-render-properties="true"
        />
        <slot name="title">
          <ElBadge
            :class="[`${prefixCls}-errors-badge`]"
            :value="errorCount"
            :offset="[5, -2]"
            :hidden="errorCount === 0"
          >
            {{ schema.items?.['x-component-props']?.title }}
          </ElBadge>
        </slot>
      </div>
      <div>
        <RecursionField
          :schema="Array.isArray(schema.items) ? schema.items[index] || schema.items[0] : schema.items"
          :name="index"
          :filter-properties="(schema: ISchema) => isOperationComponent(schema)"
          :only-render-properties="true"
        />
      </div>
    </template>
    <slot />
  </ElCollapseItem>
</template>
