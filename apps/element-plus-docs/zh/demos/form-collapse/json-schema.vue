<script setup lang="ts">
import { createForm } from '@formily/core'
import {
  FormButtonGroup,
  FormCollapse,
  FormItem,
  FormLayout,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormProvider } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    FormCollapse,
    Input,
  },
})

const schema = {
  type: 'object',
  properties: {
    collapse: {
      'type': 'void',
      'title': '折叠面板',
      'x-decorator': 'FormItem',
      'x-component': 'FormCollapse',
      'x-component-props': {
        formCollapse: '{{formCollapse}}',
      },
      'properties': {
        tab1: {
          'type': 'void',
          'x-component': 'FormCollapse.Item',
          'x-component-props': {
            title: 'A1',
          },
          'properties': {
            aaa: {
              'type': 'string',
              'title': 'AAA',
              'x-decorator': 'FormItem',
              'required': true,
              'x-component': 'Input',
            },
          },
        },
        tab2: {
          'type': 'void',
          'x-component': 'FormCollapse.Item',
          'x-component-props': {
            title: 'A2',
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
          'x-component': 'FormCollapse.Item',
          'x-component-props': {
            title: 'A3',
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
const formCollapse = FormCollapse.createFormCollapse()

async function log(values) {
  console.log(values)
}
</script>

<template>
  <FormProvider :form="form">
    <FormLayout :label-col="6" :wrapper-col="10">
      <SchemaField :schema="schema" :scope="{ formCollapse }" />
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
    </FormLayout>
  </FormProvider>
</template>

<style lang="scss" scoped></style>
