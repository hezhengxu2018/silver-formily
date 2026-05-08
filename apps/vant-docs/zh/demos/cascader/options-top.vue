<script setup lang="ts">
import { createForm } from '@formily/core'
import { Cascader, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { cityOptions } from './shared'

const form = createForm({
  values: {
    area: null,
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="area"
        title="自定义选项上方内容"
        :decorator="[FormItem, { isLink: true }]"
        :component="[Cascader]"
        :data-source="cityOptions"
      >
        <template #options-top="{ tabIndex }">
          <div class="cascader-level-tip">
            当前为第 {{ tabIndex + 1 }} 级
          </div>
        </template>
      </Field>
    </div>
  </FormProvider>
</template>

<style scoped>
.cascader-level-tip {
  padding: 12px 16px 8px;
  font-size: 12px;
  color: var(--van-text-color-2);
  background: var(--van-gray-1);
}
</style>
