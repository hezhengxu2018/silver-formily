<script setup lang="ts">
import type { ArrayField } from '@formily/core'
import type { ISchema } from '@formily/json-schema'
import { autorun } from '@formily/reactive'
import { isArr } from '@formily/shared'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { RecursionField, useField, useFieldSchema } from '@silver-formily/vue'
import { ElBadge, ElEmpty, ElScrollbar } from 'element-plus'
import { ref } from 'vue'
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

const errorCountList = formilyComputed(() => {
  if (props.showTitleFieldInTab) {
    return field.value.map((item, index) => {
      const path = field.path.concat(index)
      return field.form.queryFeedbacks({
        type: 'error',
        path: `${path}.*(!${props.tabTitleField})`,
      }).length
    })
  }
  return field.value.map((item, index) => {
    const path = field.path.concat(index)
    return field.form.queryFeedbacks({
      type: 'error',
      path: `${path}.**`,
    }).length
  })
})

// 保证arrayBase在必要时重新渲染
const arrayBaseKey = ref()

autorun(() => {
  if (props.showTitleFieldInTab) {
    const key = field.value.map((item, index) => {
      const keyParts = [
        index,
        errorCountList.value[index],
      ]
      return keyParts.join('|')
    }).join(',')
    arrayBaseKey.value = key
  }
  else {
    const key = field.value.map((item, index) => {
      const keyParts = [
        index,
        item?.[props.tabTitleField],
        errorCountList.value[index],
      ]
      return keyParts.join('|')
    }).join(',')
    arrayBaseKey.value = key
  }
})

autorun(() => {
  if (field.value.length > 0 && activeIndex.value >= field.value.length) {
    activeIndex.value = field.value.length - 1
  }
})

function getTabTitle(item) {
  return `${item?.[props.tabTitleField] || '未命名条目'}`
}
</script>

<template>
  <div :class="prefixCls">
    <ArrayBase :key="props.modelValue.length" :key-map="keyMap">
      <ul :class="`${prefixCls}_list`">
        <ElScrollbar :class="`${prefixCls}_list--scroll-wrapper`">
          <ArrayBase.Item
            v-for="(item, index) in props.modelValue"
            :key="index"
            :index="index"
            :record="item"
          >
            <li
              :id="`${field.props.name}-tab-${index}`"
              :key="arrayBaseKey"
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
                  :class="[`${prefixCls}-errors-badge`]"
                  :value="errorCountList[index]"
                  :offset="[5, 0]"
                  :hidden="errorCountList[index] === 0"
                >
                  <template v-if="!props.showTitleFieldInTab">
                    <span :class="`${prefixCls}_list-item--title`">{{ getTabTitle(item) }}</span>
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
      <div v-if="props.modelValue.length === 0" :class="`${prefixCls}-tabpane`">
        <ElEmpty :image-size="100" />
      </div>
      <ArrayBase.Item
        v-for="(item, index) in props.modelValue"
        :key="getKey(item, index)"
        :index="index"
        :record="item"
      >
        <!-- tab-panel -->
        <div
          :id="`${field.props.name}-tab-panel-${index}`"
          :key="getKey(item, index)"
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
