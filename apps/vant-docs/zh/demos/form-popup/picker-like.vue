<script setup lang="tsx">
import type { FormPopupSlotProps } from '@silver-formily/vant'
import { FormItem, FormPopup, Input } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Button as VanButton } from 'vant'
import { ref } from 'vue'
import { showDemoResult } from '../shared'

interface AddressValues {
  receiver: string
  phone: string
}

const latestResult = ref('这里演示一个仿 Picker 工具栏风格的 FormPopup：取消和确定都放在头部，底部不再显示 footer。')

const pickerLikeContent = {
  header: ({ form, reject, resolve }: FormPopupSlotProps<AddressValues>) => (
    <div class="van-picker__toolbar">
      <button
        class="van-picker__cancel van-haptics-feedback"
        disabled={form.submitting}
        type="button"
        onClick={() => reject()}
      >
        取消
      </button>
      <div class="van-picker__title van-ellipsis">编辑收货人</div>
      <button
        class="van-picker__confirm van-haptics-feedback"
        disabled={form.submitting}
        type="button"
        onClick={() => resolve()}
      >
        确定
      </button>
    </div>
  ),
  default: () => (
    <div class="form-popup-demo-fields">
      <Field
        name="receiver"
        title="收货人"
        validator={[{ required: true, message: '请输入收货人姓名' }]}
        decorator={[FormItem]}
        component={[Input, { placeholder: '例如：张三' }]}
      />
      <Field
        name="phone"
        title="联系电话"
        validator={[{ required: true, message: '请输入联系电话' }]}
        decorator={[FormItem]}
        component={[Input, { type: 'tel', placeholder: '例如：13800000000' }]}
      />
    </div>
  ),
  footer: () => null,
}

async function handleOpen() {
  const result = await FormPopup<AddressValues>(
    {
      class: 'form-popup-picker-like',
      closeOnClickOverlay: false,
    },
    pickerLikeContent,
  ).open({
    values: {
      receiver: '张三',
      phone: '13800000000',
    },
  })

  latestResult.value = JSON.stringify(result, null, 2)
  await showDemoResult(result, 'FormPopup Picker 风格头部')
}
</script>

<template>
  <div class="demo-block">
    <VanButton block type="primary" @click="handleOpen">
      打开 Picker 风格 FormPopup
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

:global(.form-popup-picker-like .silver-formily-vant-form-popup__header) {
  padding: 0;
}

:global(.form-popup-picker-like .silver-formily-vant-form-popup__body) {
  padding-top: 12px;
}

:global(.form-popup-picker-like .silver-formily-vant-form-popup__footer) {
  display: none;
}

:global(.form-popup-picker-like .van-picker__cancel:disabled),
:global(.form-popup-picker-like .van-picker__confirm:disabled) {
  opacity: 0.45;
}
</style>
