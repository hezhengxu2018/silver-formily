<script setup lang="ts">
import { createForm } from '@formily/core'
import {
  FormButtonGroup,
  FormItem,
  FormStep,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormConsumer, FormProvider } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField, SchemaVoidField, SchemaStringField } = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})
const formStep = FormStep.createFormStep()
const form = createForm()

async function log() {
  formStep.submit(console.log)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaVoidField x-component="FormStep" :x-component-props="{ formStep }">
        <SchemaVoidField
          x-component="FormStep.StepPane"
          :x-component-props="{ title: '第一步' }"
        >
          <SchemaStringField
            name="aaa"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaVoidField>
        <SchemaVoidField
          x-component="FormStep.StepPane"
          :x-component-props="{ title: '第二步' }"
        >
          <SchemaStringField
            name="bbb"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaVoidField>
        <SchemaVoidField
          type="void"
          x-component="FormStep.StepPane"
          :x-component-props="{ title: '第三步' }"
        >
          <SchemaStringField
            name="ccc"
            x-decorator="FormItem"
            required
            x-component="Input"
          />
        </SchemaVoidField>
      </SchemaVoidField>
    </SchemaField>
    <FormConsumer>
      <template #default>
        <FormButtonGroup>
          <ElButton
            :disabled="!formStep.allowBack"
            @click="
              () => {
                formStep.back()
              }
            "
          >
            上一步
          </ElButton>
          <ElButton
            :disabled="!formStep.allowNext"
            @click="
              () => {
                formStep.next()
              }
            "
          >
            下一步
          </ElButton>
          <Submit :disabled="formStep.allowNext" @submit="log">
            提交
          </Submit>
        </FormButtonGroup>
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<style lang="scss" scoped></style>
