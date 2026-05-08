<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormItem, Picker } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { Tag } from 'vant'
import { cityOptions } from './shared'

const form = createForm({
  values: {
    city: 'nb',
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="city"
        title="自定义插槽"
        :decorator="[FormItem, { isLink: true }]"
        :component="[Picker]"
        :data-source="cityOptions"
      >
        <template #title>
          <div class="picker-slot-title">
            选择服务城市
          </div>
        </template>

        <template #cancel>
          <span class="picker-slot-action">返回</span>
        </template>

        <template #confirm>
          <span class="picker-slot-action picker-slot-action--confirm">确认并写回</span>
        </template>

        <template #columns-top>
          <div class="picker-slot-note">
            这里直接复用 Vant Picker 官方的 columns-top 区域。
          </div>
        </template>

        <template #option="option">
          <div class="picker-slot-option">
            <span>{{ option.text }}</span>
            <Tag plain size="medium" :type="option.value === 'sh' ? 'danger' : 'primary'">
              {{ option.value === 'sh' ? '热门' : '常用' }}
            </Tag>
          </div>
        </template>

        <template #columns-bottom>
          <div class="picker-slot-note picker-slot-note--bottom">
            选中后点击右上角按钮才会真正写回字段值。
          </div>
        </template>
      </Field>
    </div>
  </FormProvider>
</template>

<style scoped>
.picker-slot-title {
  padding: 8px 0;
  font-size: 16px;
  font-weight: 600;
}

.picker-slot-action {
  font-size: 14px;
  color: var(--van-text-color-2);
}

.picker-slot-action--confirm {
  color: var(--van-primary-color);
}

.picker-slot-note {
  padding: 12px 16px 4px;
  font-size: 12px;
  line-height: 1.5;
  color: var(--van-text-color-2);
}

.picker-slot-note--bottom {
  padding-top: 4px;
  padding-bottom: 16px;
}

.picker-slot-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}
</style>
