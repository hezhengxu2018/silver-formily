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

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    FormTab,
    Input,
  },
})

const schema = {
  type: 'object',
  properties: {
    collapse: {
      'type': 'void',
      'x-component': 'FormTab',
      'x-component-props': {
        formTab: '{{formTab}}',
      },
      'properties': {
        tab1: {
          'type': 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            label: 'A1',
          },
          'properties': {
            aaa: {
              'type': 'string',
              'title': 'AAA',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
            aaaa: {
              'type': 'string',
              'title': 'AAAA',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
          },
        },
        tab2: {
          'type': 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            label: 'A2',
          },
          'properties': {
            bbb: {
              'type': 'string',
              'title': 'BBB',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
          },
        },
        tab3: {
          'type': 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            label: 'A3',
          },
          'properties': {
            ccc: {
              'type': 'string',
              'title': 'CCC',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
          },
        },
      },
    },
  },
}

const form = createForm()
const formTab = FormTab.createFormTab()

async function log(values) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" :scope="{ formTab }" />
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
