<script setup lang="ts">
import { createForm } from '@formily/core'
import {
  FormButtonGroup,
  FormItem,
  FormTab,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField, SchemaVoidField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    FormTab,
    Input,
  },
})

const form = createForm()
const formTab = FormTab.createFormTab()

async function log(values) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField
        type="void"
        x-component="FormTab"
        :x-component-props="{ formTab }"
      >
        <SchemaVoidField
          type="void"
          name="tab1"
          x-component="FormTab.TabPane"
          :x-component-props="{ label: 'A1' }"
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
          x-component="FormTab.TabPane"
          :x-component-props="{ label: 'A2' }"
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
          x-component="FormTab.TabPane"
          :x-component-props="{ label: 'A3' }"
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
            formTab.setActiveKey('tab2')
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
