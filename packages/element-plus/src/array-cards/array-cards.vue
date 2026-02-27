<script lang="ts" setup>
import type { ArrayField } from '@formily/core'
import type { ISchema } from '@formily/json-schema'
import { autorun } from '@formily/reactive'
import { isArr } from '@formily/shared'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import { ElCard, ElEmpty, ElRow } from 'element-plus'
import { ref } from 'vue'
import { stylePrefix } from '../__builtins__/configs'
import { ArrayBase } from '../array-base'
import { getArrayItemSchema, isAdditionComponent, isIndexComponent, isOperationComponent } from '../array-base/utils'

defineOptions({
  name: 'FArrayCards',
})

const props = withDefaults(defineProps<{
  title?: string
  header?: string
  footer?: string
  bodyStyle?: Record<string, string>
  bodyClass?: string
  shadow?: 'always' | 'hover' | 'never'
  modelValue: any
}>(), {
  shadow: 'never',
})
const fieldRef = useField<ArrayField>()
const schemaRef = useFieldSchema()
const field = fieldRef.value
const schema = schemaRef.value

const prefixCls = `${stylePrefix}-array-cards`
const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

const dataSource = ref(isArr(field.value) ? field.value : [])

autorun(() => {
  dataSource.value = isArr(field.value) ? [...field.value] : []
})
</script>

<template>
  <div :class="prefixCls">
    <ArrayBase :key-map="keyMap">
      <!-- 空状态渲染 -->
      <ElCard
        v-if="!(isArr(field.value) && field.value.length > 0)"
        :class="`${prefixCls}-item`"
        v-bind="props"
      >
        <ElEmpty />
      </ElCard>

      <!-- 数据项渲染 -->
      <template v-if="isArr(props.modelValue)">
        <ArrayBase.Item
          v-for="(item, index) of dataSource"
          :key="getKey(item, index)"
          :index="index"
          :record="item"
        >
          <ElCard
            v-bind="props"
            :class="`${prefixCls}-item`"
          >
            <template #header>
              <ElRow type="flex" justify="space-between">
                <span>
                  <RecursionField
                    :schema="getArrayItemSchema(schema, index)"
                    :name="index"
                    :filter-properties="(schema: ISchema) => isIndexComponent(schema)"
                    :only-render-properties="true"
                  />
                  {{ getArrayItemSchema(schema, index).title ?? props.title ?? field.title }}
                </span>
                <span :class="`${prefixCls}-extra-container`">
                  <RecursionField
                    :schema="getArrayItemSchema(schema, index)"
                    :name="index"
                    :filter-properties="(schema: ISchema) => isOperationComponent(schema)"
                    :only-render-properties="true"
                  />
                </span>
              </ElRow>
            </template>
            <RecursionField
              :schema="getArrayItemSchema(schema, index)"
              :name="index"
              :filter-properties="(schema: ISchema) => !isIndexComponent(schema) && !isOperationComponent(schema)"
            />
          </ElCard>
        </ArrayBase.Item>
      </template>

      <!-- 添加按钮渲染 -->
      <template v-for="(itemSchema, key) in schema.properties" :key="key">
        <RecursionField
          v-if="isAdditionComponent(itemSchema)"
          :schema="itemSchema"
          name="addition"
        />
      </template>
    </ArrayBase>
  </div>
</template>
