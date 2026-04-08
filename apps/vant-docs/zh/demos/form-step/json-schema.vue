<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, FormStep, Input, Submit } from '@silver-formily/vant'
import { createSchemaField, FormConsumer } from '@silver-formily/vue'
import { Button as VanButton } from 'vant'
import { showDemoResult } from '../shared'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})

const form = createForm()
const formStep = FormStep.createFormStep()

const schema = {
  type: 'object',
  properties: {
    stepper: {
      'type': 'void',
      'x-component': 'FormStep',
      'x-component-props': {
        formStep: '{{formStep}}',
        activeColor: '#1989fa',
      },
      'properties': {
        basic: {
          'type': 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '账号信息',
          },
          'properties': {
            username: {
              'type': 'string',
              'title': '用户名',
              'required': true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '请输入用户名',
              },
            },
            password: {
              'type': 'string',
              'title': '密码',
              'required': true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '请输入密码',
                type: 'password',
              },
            },
          },
        },
        profile: {
          'type': 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '资料补充',
          },
          'properties': {
            nickname: {
              'type': 'string',
              'title': '昵称',
              'required': true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '请输入昵称',
              },
            },
            intro: {
              'type': 'string',
              'title': '简介',
              'x-decorator': 'FormItem',
              'x-component': 'Input.TextArea',
              'x-component-props': {
                rows: 2,
                placeholder: '介绍一下自己',
              },
            },
          },
        },
      },
    },
  },
}

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values, 'JSON Schema 提交结果')
}
</script>

<template>
  <Form :form="form">
    <SchemaField :schema="schema" :scope="{ formStep }" />

    <FormConsumer>
      <template #default>
        <FormButtonGroup layout="horizontal">
          <VanButton
            :disabled="!formStep.allowBack"
            plain
            type="default"
            @click="formStep.back()"
          >
            上一步
          </VanButton>
          <VanButton
            v-if="formStep.allowNext"
            type="primary"
            @click="formStep.next()"
          >
            下一步
          </VanButton>
          <Submit v-else :on-submit="handleSubmit">
            提交
          </Submit>
        </FormButtonGroup>
      </template>
    </FormConsumer>
  </Form>
</template>
