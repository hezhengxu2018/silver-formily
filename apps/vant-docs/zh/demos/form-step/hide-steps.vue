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
  await showDemoResult(values, '隐藏步骤条提交结果')
}
</script>

<template>
  <Form :form="form">
    <div class="hide-steps-tip">
      顶部步骤条已隐藏，适合把分步流程嵌进弹窗、抽屉或卡片内容区。
    </div>

    <SchemaField>
      <SchemaVoidField x-component="FormStep" :x-component-props="{ formStep, hideSteps: true }">
        <SchemaVoidField
          x-component="FormStep.StepPane"
          :x-component-props="{
            title: '联系信息',
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
        </SchemaVoidField>

        <SchemaVoidField
          x-component="FormStep.StepPane"
          :x-component-props="{
            title: '确认提交',
          }"
        >
          <SchemaStringField
            name="remark"
            title="备注"
            x-decorator="FormItem"
            x-component="Input.TextArea"
            :x-component-props="{ rows: 2, placeholder: '可选，补充配送时间或到访说明' }"
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

<style scoped>
.hide-steps-tip {
  margin: 0 12px 12px;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.6;
  color: #1989fa;
  background: rgba(25, 137, 250, 0.08);
}
</style>
