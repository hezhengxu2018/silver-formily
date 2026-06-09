<script setup lang="tsx">
import type { PropType } from 'vue'
import { createForm } from '@silver-formily/core'
import { createPopup, Form, FormButtonGroup, FormItem, FormStep, Input, Submit } from '@silver-formily/vant'
import { createSchemaField, FormConsumer } from '@silver-formily/vue'
import { Button as VanButton } from 'vant'
import { defineComponent } from 'vue'
import { showDemoResult } from '../shared'

interface StepFormValues {
  name: string
  mobile: string
  address: string
  deliveryTime: string
  remark: string
}

const defaultValues: StepFormValues = {
  name: '张三',
  mobile: '13800000000',
  address: '杭州市西湖区文三路 188 号',
  deliveryTime: '工作日晚上 7 点后',
  remark: '',
}

const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    FormStep,
    Input,
  },
})

const stepSchema = {
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
        contact: {
          'type': 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '联系信息',
          },
          'properties': {
            name: {
              'type': 'string',
              'title': '姓名',
              'required': true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '请输入联系人姓名',
              },
            },
            mobile: {
              'type': 'string',
              'title': '手机号',
              'required': true,
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                type: 'tel',
                placeholder: '请输入手机号',
              },
            },
          },
        },
        delivery: {
          'type': 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '配送信息',
          },
          'properties': {
            address: {
              'type': 'string',
              'title': '收货地址',
              'required': true,
              'x-decorator': 'FormItem',
              'x-component': 'Input.TextArea',
              'x-component-props': {
                rows: 3,
                placeholder: '请输入街道、楼栋、门牌号',
              },
            },
            deliveryTime: {
              'type': 'string',
              'title': '送达时间',
              'x-decorator': 'FormItem',
              'x-component': 'Input',
              'x-component-props': {
                placeholder: '例如工作日晚上 7 点后',
              },
            },
          },
        },
        confirm: {
          'type': 'void',
          'x-component': 'FormStep.StepPane',
          'x-component-props': {
            title: '确认提交',
          },
          'properties': {
            remark: {
              'type': 'string',
              'title': '备注',
              'x-decorator': 'FormItem',
              'x-component': 'Input.TextArea',
              'x-component-props': {
                rows: 2,
                placeholder: '可选，补充门禁、楼层或电话备注',
              },
            },
          },
        },
      },
    },
  },
}

const StepFormPopupContent = defineComponent({
  name: 'CreatePopupFormStepDemoContent',
  props: {
    values: {
      type: Object as PropType<StepFormValues>,
      default: () => defaultValues,
    },
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    const form = createForm({
      values: {
        ...defaultValues,
        ...props.values,
      },
    })
    const formStep = FormStep.createFormStep()

    async function handleSubmit(values: typeof form.values) {
      emit('confirm', values)
    }

    return () => (
      <div class="step-form-popup-shell">
        <Form form={form} class="step-form-popup-layout">
          <div class="step-form-popup-header">
            <div class="step-form-popup-card">
              <div class="step-form-popup-card__title">弹出式分步表单</div>
              <div class="step-form-popup-card__desc">
                createPopup 只负责弹层开关，步骤切换和最终提交仍然由 FormStep 管理。
              </div>
            </div>
          </div>

          <div class="step-form-popup-main">
            <SchemaField schema={stepSchema} scope={{ formStep }} />
          </div>

          <FormConsumer>
            {() => (
              <div class="step-form-popup-actions">
                <FormButtonGroup layout="horizontal">
                  {formStep.allowBack
                    ? (
                        <VanButton plain type="default" onClick={() => formStep.back()}>
                          上一步
                        </VanButton>
                      )
                    : (
                        <VanButton plain type="default" onClick={() => emit('cancel')}>
                          取消
                        </VanButton>
                      )}

                  {formStep.allowNext
                    ? (
                        <VanButton type="primary" onClick={() => formStep.next()}>
                          下一步
                        </VanButton>
                      )
                    : (
                        <Submit onSubmit={handleSubmit}>
                          确认提交
                        </Submit>
                      )}
                </FormButtonGroup>
              </div>
            )}
          </FormConsumer>
        </Form>
      </div>
    )
  },
})

const stepFormPopup = createPopup<typeof StepFormPopupContent, StepFormValues>(
  {
    closeOnClickOverlay: false,
    style: {
      minHeight: '72vh',
    },
  },
  StepFormPopupContent,
)

async function handleOpen() {
  try {
    const result = await stepFormPopup.open({
      values: defaultValues,
    })

    await showDemoResult(result, 'createPopup + FormStep 提交结果')
  }
  catch {
  }
}
</script>

<template>
  <div class="demo-block">
    <div class="demo-block__desc">
      通过自定义内容组件把 FormStep 放进 createPopup，适合资料补录、地址编辑这类需要分步完成的移动端弹层流程。
    </div>
    <VanButton block type="primary" @click="handleOpen">
      打开弹出式分步表单
    </VanButton>
  </div>
</template>

<style scoped>
.demo-block {
  display: grid;
  gap: 12px;
}

.demo-block__desc {
  color: var(--van-text-color-2);
  font-size: 13px;
  line-height: 1.6;
}

:global(.step-form-popup-card) {
  padding: 12px;
  border-radius: 12px;
  background: rgba(25, 137, 250, 0.08);
}

:global(.step-form-popup-shell) {
  min-height: 72vh;
}

:global(.step-form-popup-layout) {
  display: flex;
  flex-direction: column;
  min-height: 72vh;
  box-sizing: border-box;
}

:global(.step-form-popup-header) {
  padding: 16px 12px 0;
}

:global(.step-form-popup-main) {
  flex: 1;
  min-height: 0;
  padding-top: 12px;
}

:global(.step-form-popup-actions) {
  margin-top: auto;
  padding: 16px 12px calc(12px + env(safe-area-inset-bottom));
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--van-background-2) 100%);
}

:global(.step-form-popup-actions .van-formily-form-button-group) {
  margin: 0;
}

:global(.step-form-popup-actions .van-formily-form-button-group--horizontal) {
  margin-top: 0;
}

:global(.step-form-popup-actions .van-button) {
  min-height: 44px;
}

:global(.step-form-popup-card__title) {
  color: var(--van-text-color);
  font-size: 15px;
  font-weight: 600;
}

:global(.step-form-popup-card__desc) {
  margin-top: 6px;
  color: #1989fa;
  font-size: 12px;
  line-height: 1.6;
}
</style>
