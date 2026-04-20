<script setup lang="tsx">
import type { PropType } from 'vue'
import { createPopup } from '@silver-formily/vant'
import { Button as VanButton } from 'vant'
import { defineComponent } from 'vue'
import { showDemoResult } from '../shared'

const ConfirmValueCard = defineComponent({
  name: 'FunctionalPopupBasicDemoContent',
  props: {
    modelValue: {
      type: Number as PropType<number>,
      default: 3,
    },
  },
  emits: ['confirm', 'cancel', 'update:modelValue'],
  setup(props, { emit }) {
    return () => (
      <div class="functional-popup-demo-card">
        <div class="functional-popup-demo-card__title">
          当前值：
          {props.modelValue}
        </div>
        <div class="functional-popup-demo-card__desc">
          这里会在组件内部不断更新 modelValue，但外部最终只会拿到 confirm 返回的 payload。
        </div>
        <div class="functional-popup-demo-card__actions">
          <VanButton
            block
            type="primary"
            onClick={() => emit('update:modelValue', Number(props.modelValue ?? 0) + 1)}
          >
            内部 +1
          </VanButton>
          <VanButton
            block
            type="success"
            onClick={() => emit('confirm', { value: props.modelValue })}
          >
            确认并返回当前值
          </VanButton>
          <VanButton
            block
            plain
            type="default"
            onClick={() => emit('cancel')}
          >
            取消
          </VanButton>
        </div>
      </div>
    )
  },
})

const popup = createPopup(
  {
    closeOnClickOverlay: false,
  },
  ConfirmValueCard,
)

async function handleOpen() {
  try {
    const result = await popup.open({
      modelValue: 3,
    })

    await showDemoResult(result, '自定义组件 confirm 返回值')
  }
  catch {
  }
}
</script>

<template>
  <div class="demo-block">
    <VanButton block type="primary" @click="handleOpen">
      打开自定义组件
    </VanButton>
  </div>
</template>

<style scoped>
.demo-block {
  display: grid;
}

:global(.functional-popup-demo-card) {
  display: grid;
  gap: 12px;
  padding: 16px;
}

:global(.functional-popup-demo-card__title) {
  color: var(--van-text-color);
  font-size: 16px;
  font-weight: 600;
}

:global(.functional-popup-demo-card__desc) {
  color: var(--van-text-color-2);
  font-size: 13px;
  line-height: 1.6;
}

:global(.functional-popup-demo-card__actions) {
  display: grid;
  gap: 8px;
}
</style>
