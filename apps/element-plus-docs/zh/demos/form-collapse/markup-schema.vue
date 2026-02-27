<script setup lang="ts">
import { createForm } from '@formily/core'
import {
  FormButtonGroup,
  FormCollapse,
  FormItem,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElButton } from 'element-plus'
import { h } from 'vue'

const { SchemaField, SchemaVoidField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    FormCollapse,
    Input,
  },
})

const form = createForm()
const formCollapse = FormCollapse.createFormCollapse()
async function log(values) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField
        type="void"
        title="折叠面板"
        x-decorator="FormItem"
        x-component="FormCollapse"
        :x-component-props="{ formCollapse }"
      >
        <SchemaVoidField
          type="void"
          name="tab1"
          x-component="FormCollapse.Item"
          :x-component-props="{ title: 'A1' }"
          :x-content="{
            title: '标题Tab1',
          }"
        >
          <SchemaStringField
            name="aaa"
            x-decorator="FormItem"
            title="AAA"
            required
            x-component="Input"
          />
        </SchemaVoidField>
        <SchemaVoidField
          name="tab2"
          x-component="FormCollapse.Item"
          :x-component-props="{ title: 'A2' }"
          :x-content="{
            title: (errorLength) => h('span', `render 函数渲染的VNode, 错误数量：${errorLength ?? 0}`),
          }"
        >
          <SchemaStringField
            name="bbb"
            x-decorator="FormItem"
            title="BBB"
            required
            x-component="Input"
          />
        </SchemaVoidField>
        <SchemaVoidField
          name="tab3"
          :x-visible="false"
          x-component="FormCollapse.Item"
          :x-component-props="{ title: 'A3' }"
        >
          <SchemaStringField
            name="ccc"
            x-decorator="FormItem"
            title="CCC"
            required
            x-component="Input"
          />
        </SchemaVoidField>
      </SchemaVoidField>
    </SchemaField>
    <FormButtonGroup align-form-item>
      <ElButton
        @click="
          () => {
            form.query('tab3').take((field) => {
              field.visible = !field.visible
            })
          }
        "
      >
        显示/隐藏最后一个Tab
      </ElButton>
      <ElButton
        @click="
          () => {
            formCollapse.toggleActiveKey('tab2')
          }
        "
      >
        切换第二个Tab
      </ElButton>
      <Submit @submit="log">
        提交
      </Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<style lang="scss" scoped></style>
