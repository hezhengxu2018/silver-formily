<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, FormStep, Input, Submit } from '@silver-formily/vant'
import { createSchemaField, FormConsumer } from '@silver-formily/vue'
import { Button as VanButton } from 'vant'
import { showDemoResult } from '../shared'

const { SchemaField, SchemaStringField, SchemaVoidField } = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})

const form = createForm()
const formStep = FormStep.createFormStep()

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values, 'Markup Schema 提交结果')
}
</script>

<template>
  <Form :form="form">
    <SchemaField>
      <SchemaVoidField x-component="FormStep" :x-component-props="{ formStep }">
        <SchemaVoidField
          x-component="FormStep.StepPane"
          :x-component-props="{
            title: '基础信息',
          }"
        >
          <SchemaStringField
            name="name"
            title="姓名"
            required
            x-decorator="FormItem"
            x-component="Input"
            :x-component-props="{ placeholder: '请输入姓名' }"
          />
          <SchemaStringField
            name="mobile"
            title="手机号"
            required
            x-decorator="FormItem"
            x-component="Input"
            :x-component-props="{ placeholder: '请输入手机号' }"
          />
        </SchemaVoidField>

        <SchemaVoidField
          x-component="FormStep.StepPane"
          :x-component-props="{
            title: '配送信息',
          }"
        >
          <SchemaStringField
            name="address"
            title="收货地址"
            required
            x-decorator="FormItem"
            x-component="Input.TextArea"
            :x-component-props="{ rows: 3, placeholder: '请输入详细地址' }"
          />
          <SchemaStringField
            name="remark"
            title="补充说明"
            x-decorator="FormItem"
            x-component="Input.TextArea"
            :x-component-props="{ rows: 2, placeholder: '如门牌号、楼层、到访时间等' }"
          />
        </SchemaVoidField>

        <SchemaVoidField
          x-component="FormStep.StepPane"
          :x-component-props="{
            title: '确认提交',
          }"
        >
          <SchemaStringField
            name="summary"
            title="备注摘要"
            x-decorator="FormItem"
            x-component="Input.TextArea"
            :x-component-props="{ rows: 2, placeholder: '选填，用于演示最后一步也能继续编辑字段' }"
          />
        </SchemaVoidField>
      </SchemaVoidField>
    </SchemaField>

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
