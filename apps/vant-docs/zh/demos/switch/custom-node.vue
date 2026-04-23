<script setup lang="ts">
import { createForm } from '@formily/core'
import { Form, FormButtonGroup, FormItem, Submit, Switch } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Icon } from 'vant'
import { showDemoResult } from '../shared'

const form = createForm({
  values: {
    approved: true,
  },
})
</script>

<template>
  <Form :form="form">
    <Field
      name="approved"
      title="自定义按钮"
      :decorator="[FormItem]"
      :component="[Switch]"
    >
      <template #node="{ field }">
        <div class="switch-node-icon">
          <Icon :name="field?.value ? 'success' : 'cross'" />
        </div>
      </template>
    </Field>

    <FormButtonGroup>
      <Submit @submit="showDemoResult">
        查看结果
      </Submit>
    </FormButtonGroup>
  </Form>
</template>

<style scoped>
.switch-node-icon {
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 18px;
}

.switch-node-icon :deep(.van-icon) {
  line-height: 32px;
}

.switch-node-icon :deep(.van-icon-success) {
  color: var(--van-blue);
}

.switch-node-icon :deep(.van-icon-cross) {
  color: var(--van-gray-5);
}
</style>
