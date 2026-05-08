<script setup lang="tsx">
import { FormItem, FormPopup, Input } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Button as VanButton } from 'vant'
import { defineComponent, ref } from 'vue'
import { showDemoResult } from '../shared'

const latestResult = ref('FormPopup 默认会返回 form.values。')

const BasicContent = defineComponent({
  name: 'FormPopupBasicContent',
  setup() {
    return () => (
      <div class="form-popup-demo-fields">
        <Field
          name="name"
          title="联系人"
          decorator={[FormItem]}
          component={[Input, { placeholder: '请输入联系人姓名' }]}
        />
        <Field
          name="phone"
          title="联系电话"
          decorator={[FormItem]}
          component={[Input, { type: 'tel', placeholder: '请输入联系电话' }]}
        />
      </div>
    )
  },
})

async function handleOpen() {
  const result = await FormPopup<{ name: string, phone: string }>(
    {
      title: '编辑联系人',
      okText: '保存',
    },
    BasicContent,
  ).open({
    values: {
      name: '张三',
      phone: '13800000000',
    },
  })

  latestResult.value = JSON.stringify(result, null, 2)
  await showDemoResult(result, 'FormPopup 默认返回 form.values')
}
</script>

<template>
  <div class="demo-block">
    <VanButton type="primary" block @click="handleOpen">
      打开基础表单弹层
    </VanButton>
    <pre class="demo-result">{{ latestResult }}</pre>
  </div>
</template>

<style scoped>
.demo-block {
  display: grid;
  gap: 12px;
}

.demo-result {
  margin: 0;
  overflow: auto;
  border-radius: 12px;
  padding: 12px;
  background: var(--van-background-2);
  color: var(--van-text-color-2);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
}

:global(.form-popup-demo-fields) {
  display: grid;
}
</style>
