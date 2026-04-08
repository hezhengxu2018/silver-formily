<script setup lang="tsx">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, FormStep, Input, Submit } from '@silver-formily/vant'
import { createSchemaField, FormConsumer } from '@silver-formily/vue'
import { Button as VanButton, Icon as VanIcon } from 'vant'
import { defineComponent } from 'vue'
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

const VerifyTitle = defineComponent({
  name: 'VerifyTitle',
  setup() {
    return () => (
      <div class="slot-title">
        <VanIcon name="shield-o" class="slot-title__icon" />
        <span class="slot-title__text">核验资料</span>
      </div>
    )
  },
})

const AddressTitle = defineComponent({
  name: 'AddressTitle',
  setup() {
    return () => (
      <div class="slot-title">
        <VanIcon name="location-o" class="slot-title__icon" />
        <span class="slot-title__text">配送地址</span>
      </div>
    )
  },
})

function createStepIcon(icon: string, modifier: string) {
  return defineComponent({
    name: `StepIcon${modifier}`,
    setup() {
      return () => (
        <span class={['slot-icon', `slot-icon--${modifier}`]}>
          <VanIcon name={icon} class="slot-icon__inner" />
        </span>
      )
    },
  })
}

const ActiveIcon = createStepIcon('underway-o', 'active')
const FinishIcon = createStepIcon('passed', 'finish')
const InactiveIcon = createStepIcon('todo-list-o', 'inactive')

async function handleSubmit(values: typeof form.values) {
  await showDemoResult(values, '插槽自定义渲染提交结果')
}
</script>

<template>
  <Form :form="form">
    <SchemaField>
      <SchemaVoidField x-component="FormStep" :x-component-props="{ formStep, activeColor: '#1989fa' }">
        <SchemaVoidField
          x-component="FormStep.StepPane"
          :x-component-props="{
            title: '资料核验',
          }"
          :x-content="{
            title: VerifyTitle,
          }"
        >
          <SchemaStringField
            name="realName"
            title="真实姓名"
            required
            x-decorator="FormItem"
            x-component="Input"
            :x-component-props="{ placeholder: '请输入真实姓名' }"
          />
          <SchemaStringField
            name="idNumber"
            title="身份证号"
            required
            x-decorator="FormItem"
            x-component="Input"
            :x-component-props="{ placeholder: '请输入身份证号' }"
          />
        </SchemaVoidField>

        <SchemaVoidField
          x-component="FormStep.StepPane"
          :x-component-props="{
            title: '配送地址',
          }"
          :x-content="{
            title: AddressTitle,
            activeIcon: ActiveIcon,
            finishIcon: FinishIcon,
            inactiveIcon: InactiveIcon,
          }"
        >
          <SchemaStringField
            name="city"
            title="所在城市"
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
            :x-component-props="{ rows: 2, placeholder: '请输入街道、楼栋、门牌号' }"
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
            title="补充说明"
            x-decorator="FormItem"
            x-component="Input.TextArea"
            :x-component-props="{ rows: 2, placeholder: '例如送达时间、电话备注等' }"
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
:deep(.slot-title) {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

:deep(.slot-title__icon) {
  color: #1989fa;
  font-size: 16px;
}

:deep(.slot-title__text) {
  font-weight: 600;
  color: var(--van-text-color);
}

:deep(.slot-icon) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 12px;
  line-height: 1;
}

:deep(.slot-icon__inner) {
  font-size: 14px;
}

:deep(.slot-icon--active) {
  color: #fff;
  background: linear-gradient(135deg, #1989fa 0%, #5ca8ff 100%);
}

:deep(.slot-icon--finish) {
  color: #1989fa;
  background: rgba(25, 137, 250, 0.12);
}

:deep(.slot-icon--inactive) {
  color: var(--van-text-color-3);
  background: var(--van-gray-2);
}
</style>
