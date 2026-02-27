<script setup lang="ts">
import type { ArrayField } from '@formily/core'
import type { Schema } from '@formily/json-schema'
import type { TableInstance } from 'element-plus'
import type { IArrayTableProps } from './types'
import { autorun, reaction } from '@formily/reactive'
import { isArr, isEqual } from '@formily/shared'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import { ElTable, ElTableColumn, vLoading } from 'element-plus'
import { omit } from 'lodash-es'
import { computed, nextTick, ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { stylePrefix, useCleanAttrs } from '../__builtins__'
import { ArrayBase } from '../array-base'
import { isAdditionComponent } from '../array-base/utils'
import ElPagination from '../pagination/pagination'
import { hasRequiredProperty, isColumnComponent, isTableComponent, prefixCls } from './utils'

defineOptions({
  name: 'FArrayTable',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<IArrayTableProps>(), {
  modelValue: () => [],
  pagination: true,
})
const { props: elTableProps } = useCleanAttrs()
const paginationProps = computed(() => omit(props.paginationProps, ['pageSize', 'currentPage']))
const fieldRef = useField<ArrayField>()
const field = fieldRef.value
const schemaRef = useFieldSchema()
const additionSchemas = computed<Record<string, Schema>>(() => schemaRef.value?.properties ?? {})
const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)

const elTableRef = ref<TableInstance>()

function extractTableSources(schema: Schema): any[] {
  if (isTableComponent(schema)) {
    return createTableSource(schema)
  }
  return schema.properties
    ? Object.values(schema.properties).flatMap(element => extractTableSources(element))
    : []
}

function createTableSource(schema: Schema): any[] {
  const propName = schema['x-component-props']?.prop || schema.name
  /* istanbul ignore if -- @preserve */
  if (!propName)
    return []

  const field = fieldRef.value.query(fieldRef.value.address.concat(propName)).take()

  return [{
    name: propName,
    display: field?.display || schema['x-display'],
    required: hasRequiredProperty(schema),
    field,
    fieldProps: field?.props || schema.toFieldProps(),
    schema,
    columnProps: (field?.component as any[])?.[1] || schema['x-component-props'] || {},
  }]
}

const triggerUpdateKey = ref(0)
reaction(() => {
  const path = field.path.entire
  return field.query(`${path}.*`).map((item) => {
    return {
      name: item.component[0],
      visible: item.visible,
    }
  }).filter(item => item.name.includes('Column'))
}, async () => {
  triggerUpdateKey.value++
}, { equals: isEqual })

const dataSource = ref([])
const pageSize = ref(props.paginationProps?.pageSize ?? 10)
const currentPage = ref(props.paginationProps?.currentPage ?? 1)

function updateDataSource() {
  /* istanbul ignore if -- @preserve */
  if (!isArr(field.value)) {
    dataSource.value = []
    return
  }
  if (props.pagination === false) {
    dataSource.value = [...field.value]
    return
  }
  dataSource.value = field.value.slice((currentPage.value - 1) * pageSize.value, (currentPage.value) * pageSize.value)
}
watch([pageSize, currentPage], updateDataSource)
autorun(updateDataSource)

const sources = formilyComputed(() => {
  const schema = schemaRef.value.items
  const items = isArr(schema) ? schema : [schema]
  return items.reduce((columns, schema) => {
    const item = extractTableSources(schema)
    return columns.concat(item)
  }, []).filter(item => item.display !== 'none')
})

const columns = computed(() => {
  const currentSources = sources.value ?? []
  return currentSources
    .map((source, index) => ({ source, index }))
    .filter(({ source }) => source.display === 'visible' && isColumnComponent(source.schema))
    .map(({ source, index: key }) => {
      const { name, columnProps, required, field } = source
      const { title, asterisk, ...restProps } = columnProps
      const props = {
        label: title,
        ...restProps,
        prop: name,
      }
      return {
        key,
        props,
        field,
        asterisk: asterisk ?? required,
      }
    })
})

const stateManagerColumns = computed(() => {
  const currentSources = sources.value ?? []
  return currentSources.filter((column) => {
    return column.display !== 'none' && isColumnComponent(column.schema)
  })
})

const baseIndex = computed(() => {
  return (currentPage.value - 1) * pageSize.value
})

async function onAddItemClick() {
  if (props.pagination === false) {
    await nextTick()
    const scrollWarpDOM = elTableRef.value?.$el.querySelector('.el-scrollbar__wrap')
    scrollWarpDOM?.scrollTo({
      top: scrollWarpDOM.scrollHeight,
      behavior: 'smooth',
    })
    return
  }
  /* istanbul ignore if -- @preserve */
  if (!isArr(field.value)) {
    currentPage.value = 1
    return
  }
  currentPage.value = Math.ceil(field.value.length / pageSize.value)
}

async function handleDragEnd(evt: { oldIndex: number, newIndex: number }) {
  const { oldIndex, newIndex } = evt
  await field.move(oldIndex, newIndex)
  triggerUpdateKey.value++
}
</script>

<template>
  <div :class="prefixCls">
    <ArrayBase :key="triggerUpdateKey" :key-map="keyMap" :add="onAddItemClick">
      <VueDraggable
        :model-value="dataSource" target="tbody" :handle="`.${stylePrefix}-array-base-sort-handle`"
        :animation="150" @end="handleDragEnd"
      >
        <ElTable ref="elTableRef" v-loading="field.loading" :row-key="getKey" :data="dataSource" v-bind="elTableProps">
          <template v-for="(column, colIndex) of columns" :key="column.key">
            <ElTableColumn v-bind="column.props">
              <template #default="{ row, $index }">
                <ArrayBase.Item :key="getKey(row)" :index="$index + baseIndex" :record="row">
                  <RecursionField
                    :key="`${getKey(row)}`" :schema="sources[colIndex].schema"
                    :name="$index + baseIndex" only-render-properties
                  />
                </ArrayBase.Item>
              </template>
              <template #header="{ column: col }">
                <template v-if="column.field.content?.header">
                  <component :is="column.field.content.header" v-bind="{ ...col, field }" />
                </template>
                <span v-else-if="column.asterisk">
                  <span :class="`${prefixCls}-asterisk`">*</span>
                  {{ col.label }}
                </span>
              </template>
            </ElTableColumn>
          </template>
        </ElTable>
      </VueDraggable>

      <!-- 状态管理器 -->
      <template v-for="(column, key) of stateManagerColumns" :key="key">
        <RecursionField :name="column.name" :schema="column.schema" :only-render-self="true" />
      </template>
      <ElPagination
        v-if="props.pagination" v-model:current-page="currentPage" v-model:page-size="pageSize"
        :class="`${prefixCls}-pagination`" background layout="total, sizes, prev, pager, next"
        :total="props.modelValue.length" v-bind="paginationProps"
      />
      <template v-for="(itemSchema, key) of additionSchemas" :key="key">
        <RecursionField v-if="isAdditionComponent(itemSchema)" :schema="itemSchema" name="addition" />
      </template>
    </ArrayBase>
  </div>
</template>
