<script setup lang="ts">
import { createForm } from '@silver-formily/core'
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
async function log(values: Record<string, any>) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField
        type="void"
        title="Collapse Panel"
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
            title: 'Tab Title 1',
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
            title: (errorLength) => h('span', `VNode rendered by a render function, error count: ${errorLength ?? 0}`),
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
        Show/Hide the Last Tab
      </ElButton>
      <ElButton
        @click="
          () => {
            formCollapse.toggleActiveKey('tab2')
          }
        "
      >
        Switch to the Second Tab
      </ElButton>
      <Submit @submit="log">
        Submit
      </Submit>
    </FormButtonGroup>
  </FormProvider>
</template>

<style lang="scss" scoped></style>



