<script setup lang="ts">
import { createForm } from '@formily/core'
import { Cascader, Form, FormItem } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Tag } from 'vant'
import { cityOptions } from './shared'

const form = createForm({
  values: {
    serviceRegion: ['320000', '320100', '320106'],
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="serviceRegion"
      title="服务区域"
      :decorator="[FormItem, { isLink: true }]"
      :component="[
        Cascader,
        {
          activeColor: '#ee0a24',
          closeIcon: 'cross',
        },
      ]"
      :data-source="cityOptions"
    >
      <template #title>
        <div class="demo-cascader-title">
          选择服务片区
        </div>
      </template>

      <template #option="{ option }">
        <div class="demo-cascader-option">
          <span>{{ option.text }}</span>
          <Tag
            plain
            size="medium"
            :type="option.children?.length ? 'primary' : 'success'"
          >
            {{ option.children?.length ? '继续选择' : '最终节点' }}
          </Tag>
        </div>
      </template>
    </Field>
  </Form>
</template>

<style scoped>
.demo-cascader-title {
  padding: 8px 0;
  font-size: 16px;
  font-weight: 600;
}

.demo-cascader-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}
</style>
