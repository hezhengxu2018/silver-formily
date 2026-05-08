<script setup lang="tsx">
import type { Form as IForm } from '@formily/core'
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, FormStep, Input, Submit, useFormStep } from '@silver-formily/vant'
import { createSchemaField } from '@silver-formily/vue'
import { Button as VanButton } from 'vant'
import { defineComponent } from 'vue'
import { showDemoResult } from '../shared'

const InternalActions = defineComponent({
  name: 'InternalActions',
  props: {
    resultTitle: {
      type: String,
      default: '内部创建 FormStep 提交结果',
    },
  },
  setup(props) {
    const formStep = useFormStep()

    async function handleSubmit(values: IForm['values']) {
      await showDemoResult(values, props.resultTitle)
    }

    return () => (
      <FormButtonGroup layout="horizontal">
        <VanButton
          disabled={!formStep.value.allowBack}
          plain
          type="default"
          onClick={() => formStep.value.back()}
        >
          上一步
        </VanButton>
        {formStep.value.allowNext
          ? (
              <VanButton
                type="primary"
                onClick={() => formStep.value.next()}
              >
                下一步
              </VanButton>
            )
          : (
              <Submit onSubmit={handleSubmit}>
                提交
              </Submit>
            )}
      </FormButtonGroup>
    )
  },
})

const { SchemaField, SchemaStringField, SchemaVoidField } = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
    InternalActions,
  },
})

const form = createForm()
</script>

<template>
  <Form :form="form">
    <div class="internal-tip">
      这里没有手动调用 <code>FormStep.createFormStep()</code>，底部按钮通过 <code>useFormStep()</code> 直接读取组件内部创建的步骤实例。
    </div>

    <SchemaField>
      <SchemaVoidField x-component="FormStep" :x-component-props="{ activeColor: '#1989fa' }">
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
          <SchemaVoidField x-component="InternalActions" />
        </SchemaVoidField>

        <SchemaVoidField
          x-component="FormStep.StepPane"
          :x-component-props="{
            title: '配送信息',
          }"
        >
          <SchemaStringField
            name="city"
            title="城市"
            required
            x-decorator="FormItem"
            x-component="Input"
            :x-component-props="{ placeholder: '请输入城市' }"
          />
          <SchemaStringField
            name="address"
            title="详细地址"
            required
            x-decorator="FormItem"
            x-component="Input.TextArea"
            :x-component-props="{ rows: 2, placeholder: '请输入街道、楼栋和门牌号' }"
          />
          <SchemaVoidField x-component="InternalActions" />
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
            :x-component-props="{ rows: 2, placeholder: '选填，补充配送时间或上门说明' }"
          />
          <SchemaVoidField
            x-component="InternalActions"
            :x-component-props="{ resultTitle: '内部自动创建步骤实例提交结果' }"
          />
        </SchemaVoidField>
      </SchemaVoidField>
    </SchemaField>
  </Form>
</template>

<style scoped>
.internal-tip {
  margin: 0 12px 12px;
  padding: 10px 12px;
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.6;
  color: #1989fa;
  background: rgba(25, 137, 250, 0.08);
}

.internal-tip code {
  padding: 0 4px;
  border-radius: 4px;
  color: inherit;
  background: rgba(25, 137, 250, 0.12);
}
</style>
