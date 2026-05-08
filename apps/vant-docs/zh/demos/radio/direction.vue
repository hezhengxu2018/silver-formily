<script setup lang="ts">
import { createForm } from '@formily/core'
import { Radio } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { Cell, CellGroup } from 'vant'

const form = createForm({
  values: {
    layout: 'grid',
    scene: 'commute',
  },
})

const layoutOptions = [
  { label: '宫格', value: 'grid' },
  { label: '列表', value: 'list' },
  { label: '瀑布流', value: 'waterfall' },
]

const sceneOptions = [
  {
    label: '通勤打卡',
    value: 'commute',
    description: '适合固定地点、固定时间段的移动端签到场景。',
  },
  {
    label: '出差报销',
    value: 'travel',
    description: '适合行程较长、需要补充票据与审批说明的流程。',
  },
  {
    label: '外勤签到',
    value: 'onsite',
    description: '适合需要定位、拍照或拜访记录的现场任务。',
  },
]

function selectScene(value: string) {
  form.setValues({
    scene: value,
  })
}
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <div class="direction-section">
        <div class="direction-section__title">
          横向排列
        </div>
        <Field
          name="layout"
          :component="[Radio.Group, { direction: 'horizontal', shape: 'dot' }]"
          :data-source="layoutOptions"
        />
      </div>

      <div class="direction-section">
        <div class="direction-section__title">
          纵向排列
        </div>
        <div class="direction-section__tip">
          纵向场景改成单元格组合，点击整行即可切换，比简单堆叠更适合移动端展示。
        </div>
        <Field name="scene" :component="[Radio.Group]">
          <CellGroup inset>
            <Cell
              v-for="option in sceneOptions"
              :key="option.value"
              center
              clickable
              :title="option.label"
              :label="option.description"
              @click="selectScene(option.value)"
            >
              <template #right-icon>
                <Radio :name="option.value" />
              </template>
            </Cell>
          </CellGroup>
        </Field>
      </div>
    </div>
  </FormProvider>
</template>

<style scoped>
.direction-section + .direction-section {
  margin-top: 20px;
}

.direction-section__title {
  margin-bottom: 12px;
  color: var(--van-text-color);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}

.direction-section__tip {
  margin-bottom: 12px;
  color: var(--van-text-color-2);
  font-size: 12px;
  line-height: 1.6;
}
</style>
