<script setup lang="ts">
import type { ArrayField } from '@silver-formily/core'
import type { ISchema } from '@silver-formily/json-schema'
import { autorunEffect, formilyComputed } from '@silver-formily/reactive-vue'
import { isArr } from '@silver-formily/shared'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import { ElBadge, ElEmpty, ElScrollbar } from 'element-plus'
import { ref, watch } from 'vue'
import { ArrayBase } from '../array-base'
import { getArrayItemSchema, isAdditionComponent, isRemoveComponent } from '../array-base/utils'
import { isTabTitleComponent, prefixCls } from './utils'
import './style.scss'

defineOptions({
  name: 'FArrayListTabs',
})

const props = defineProps({
  tabTitleField: {
    required: true,
    type: String,
  },
  showTitleFieldInTab: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const fieldRef = useField<ArrayField>()
const schemaRef = useFieldSchema()
const field = fieldRef.value
const schema = schemaRef.value

const activeIndex = ref(0)
const { getKey, keyMap } = ArrayBase.useKey(schemaRef.value)
const dataSource = ref<Array<{ key: string, record: any, title: string }>>([])

autorunEffect(() => {
  dataSource.value = isArr(field.value)
    ? field.value.map((item, index) => ({
        key: getKey(item, index),
        record: item,
        title: getTabTitle(item),
      }))
    : []
})

const errorCountList = formilyComputed(() => {
  if (!isArr(field.value))
    return []
  if (props.showTitleFieldInTab) {
    return field.value.map((_, index) => {
      const address = field.address.concat(index).toString()
      return field.form.queryFeedbacks({
        type: 'error',
        address: `${address}.**`,
      }).filter((feedback) => {
        return feedback.address !== `${address}.${props.tabTitleField}`
          && feedback.path !== `${address}.${props.tabTitleField}`
      }).length
    })
  }
  return field.value.map((_, index) => {
    const address = field.address.concat(index).toString()
    return field.form.queryFeedbacks({
      type: 'error',
      address: `${address}.**`,
    }).length
  })
})

watch(() => dataSource.value.length, (length) => {
  if (length === 0) {
    activeIndex.value = 0
    return
  }
  if (activeIndex.value >= length) {
    activeIndex.value = length - 1
  }
}, { flush: 'sync' })

function getTabTitle(item) {
  return `${item?.[props.tabTitleField] || '未命名条目'}`
}
</script>

<template>
  <div :class="prefixCls">
    <ArrayBase :key-map="keyMap">
      <ul :class="`${prefixCls}_list`">
        <ElScrollbar :class="`${prefixCls}_list--scroll-wrapper`">
          <ArrayBase.Item
            v-for="(item, index) in dataSource"
            :key="item.key"
            :index="index"
            :record="item.record"
          >
            <li
              :id="`${field.props.name}-tab-${index}`"
              :class="[
                `${prefixCls}_list-item`,
                activeIndex === index && 'is-active',
              ]"
              role="tab"
              :aria-controls="`${field.props.name}-tab-panel-${index}`"
              @click="() => activeIndex = index"
            >
              <div :class="`${prefixCls}_list-item--content`">
                <ElBadge
                  v-if="errorCountList[index] !== 0"
                  :class="[`${prefixCls}-errors-badge`]"
                  :value="errorCountList[index]"
                  :offset="[5, 0]"
                >
                  <template v-if="!props.showTitleFieldInTab">
                    <span :class="`${prefixCls}_list-item--title`">{{ item.title }}</span>
                  </template>
                  <template v-else>
                    <RecursionField
                      v-if="!isArr(schema.items)"
                      :schema="schema.items"
                      :name="index"
                      :filter-properties="(schema: ISchema) => isTabTitleComponent(schema, props.tabTitleField)"
                      only-render-properties
                    />
                  </template>
                </ElBadge>
                <template v-else>
                  <template v-if="!props.showTitleFieldInTab">
                    <span :class="`${prefixCls}_list-item--title`">{{ item.title }}</span>
                  </template>
                  <template v-else>
                    <RecursionField
                      v-if="!isArr(schema.items)"
                      :schema="schema.items"
                      :name="index"
                      :filter-properties="(schema: ISchema) => isTabTitleComponent(schema, props.tabTitleField)"
                      only-render-properties
                    />
                  </template>
                </template>
              </div>
              <!-- remove icon -->
              <RecursionField
                v-if="!isArr(schema.items)"
                :schema="schema.items"
                :name="index"
                :filter-properties="(schema: ISchema) => isRemoveComponent(schema)"
                only-render-properties
              />
            </li>
          </ArrayBase.Item>
        </ElScrollbar>
        <template v-for="(property, key) in schema.properties" :key="key">
          <RecursionField
            v-if="isAdditionComponent(property)"
            :schema="property"
            name="addition"
          />
        </template>
      </ul>
      <div v-if="dataSource.length === 0" :class="`${prefixCls}-tabpane`">
        <ElEmpty :image-size="100" />
      </div>
      <ArrayBase.Item
        v-for="(item, index) in dataSource"
        :key="item.key"
        :index="index"
        :record="item.record"
      >
        <!-- tab-panel -->
        <div
          :id="`${field.props.name}-tab-panel-${index}`"
          :class="`${prefixCls}-tabpane`"
          :style="{ display: activeIndex === index ? undefined : 'none' }"
          role="tabpanel"
          :aria-labelledby="`${field.props.name}-tab-${index}`"
        >
          <RecursionField
            :schema="getArrayItemSchema(schema, index)"
            :name="index"
            :filter-properties="(schema: ISchema) => {
              if (isRemoveComponent(schema)) {
                return false
              }
              if (props.showTitleFieldInTab) {
                return !isTabTitleComponent(schema, props.tabTitleField)
              }
              return true
            }"
            only-render-properties
          />
        </div>
      </ArrayBase.Item>
    </ArrayBase>
  </div>
</template>
