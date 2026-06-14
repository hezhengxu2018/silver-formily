<script setup lang="ts">
import { createForm } from '@silver-formily/core'
import {
  FormButtonGroup,
  FormItem,
  FormStep,
  Input,
  Submit,
} from '@silver-formily/element-plus'
import { createSchemaField, FormConsumer, FormProvider } from '@silver-formily/vue'
import { ElButton } from 'element-plus'

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})

const schema = {
  type: 'object',
  properties: {
    collapse: {
      'type': 'void',
      'x-component': 'FormStep',
      'x-component-props': {
        formStep: '{{formStep}}',
        finishStatus: 'success',
      },
      'properties': {
        step1: {
          'type': 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: 'Step 1',
          },
          'properties': {
            aaa: {
              'type': 'string',
              'title': 'AAA',
              'required': true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
        step2: {
          'type': 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: 'Step 2',
          },
          'properties': {
            bbb: {
              'type': 'string',
              'title': 'BBB',
              'required': true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
        step3: {
          'type': 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: 'Step 3',
          },
          'properties': {
            ccc: {
              'type': 'string',
              'title': 'CCC',
              'required': true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
            },
          },
        },
      },
    },
  },
}
const form = createForm()
const formStep = FormStep.createFormStep()

async function log() {
  formStep.submit(console.log)
}
</script>

<template>
  <FormProvider :form="form">
    <SchemaField :schema="schema" :scope="{ formStep }" />
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
            Previous
          </ElButton>
          <ElButton
            :disabled="!formStep.allowNext"
            @click="
              () => {
                formStep.next()
              }
            "
          >
            Next
          </ElButton>
          <Submit :disabled="formStep.allowNext" @submit="log">
            Submit
          </Submit>
        </FormButtonGroup>
      </template>
    </FormConsumer>
  </FormProvider>
</template>

<style lang="scss" scoped></style>



