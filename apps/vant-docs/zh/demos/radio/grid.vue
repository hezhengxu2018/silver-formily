<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Grid, Radio } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'

const form = createForm({
  values: {
    scene: 'repair',
  },
})

const sceneOptions = [
  {
    label: '维修申请',
    value: 'repair',
    description: '适合设备报修、工单登记这类处理时效明确的场景。',
  },
  {
    label: '拜访记录',
    value: 'visit',
    description: '适合需要沉淀客户跟进内容、拍照和备注的移动流程。',
  },
  {
    label: '补货申请',
    value: 'restock',
    description: '适合门店巡检后快速提交库存补充需求。',
  },
  {
    label: '请假审批',
    value: 'leave',
    description: '适合字段较少，但希望入口展示更清晰的轻流程。',
  },
]

const GridColumn = Grid.GridColumn
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="scene"
        title="流程类型"
        :decorator="[FormItem, { labelAlign: 'top' }]"
        :component="[Radio.Group]"
      >
        <Grid :min-columns="2" :max-columns="2" :column-gap="10" :row-gap="10">
          <GridColumn
            v-for="option in sceneOptions"
            :key="option.value"
          >
            <Radio
              :name="option.value"
              class="scene-radio"
              label-position="left"
            >
              <div class="scene-radio__content">
                <div class="scene-radio__title">
                  {{ option.label }}
                </div>
                <div class="scene-radio__description">
                  {{ option.description }}
                </div>
              </div>
            </Radio>
          </GridColumn>
        </Grid>
      </Field>
    </div>
  </FormProvider>
</template>

<style scoped>
:deep(.scene-radio) {
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-height: 100%;
  margin: 0;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid var(--van-border-color);
  border-radius: 12px;
  background: var(--van-background-2);
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

:deep(.scene-radio .van-radio__label) {
  flex: 1;
  margin: 0;
}

:deep(.scene-radio .van-radio__icon) {
  flex: none;
  margin-left: 10px;
}

:deep(.scene-radio.van-radio--checked) {
  border-color: var(--van-primary-color);
  background: color-mix(in srgb, var(--van-primary-color) 10%, #fff);
}

.scene-radio__content {
  display: grid;
  gap: 6px;
}

.scene-radio__title {
  color: var(--van-text-color);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}

.scene-radio__description {
  color: var(--van-text-color-2);
  font-size: 12px;
  line-height: 1.5;
}
</style>
