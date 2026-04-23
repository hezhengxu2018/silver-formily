<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, Slider, Submit } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    progress: 50,
    progressRange: [20, 60],
  },
})
</script>

<template>
  <Form :form="form">
    <div class="slider-vertical-panel">
      <div class="slider-vertical-item">
        <div class="slider-vertical-label">
          单滑块
        </div>
        <div class="slider-vertical-field">
          <Field
            name="progress"
            :component="[Slider, { vertical: true }]"
          />
        </div>
      </div>

      <div class="slider-vertical-item">
        <div class="slider-vertical-label">
          双滑块
        </div>
        <div class="slider-vertical-field">
          <Field
            name="progressRange"
            :component="[Slider, { range: true, vertical: true }]"
          />
        </div>
      </div>
    </div>

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>

<style scoped>
.slider-vertical-panel {
  display: flex;
  gap: 40px;
  align-items: flex-end;
  justify-content: center;
  min-height: 180px;
  padding: 16px 0 8px;
}

.slider-vertical-item {
  display: grid;
  gap: 12px;
  justify-items: center;
}

.slider-vertical-label {
  font-size: 12px;
  color: var(--van-text-color-2);
}

.slider-vertical-field {
  height: 150px;
}

.slider-vertical-field :deep(.van-slider) {
  height: 100%;
}
</style>
