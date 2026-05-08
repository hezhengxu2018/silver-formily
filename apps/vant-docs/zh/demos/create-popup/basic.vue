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

const defaultPopup = createPopup(
  {
    closeOnClickOverlay: false,
  },
  ConfirmValueCard,
)

const customHeightPopup = createPopup(
  {
    style: {
      height: '60vh',
    },
  },
  ConfirmValueCard,
)

const unlockScrollPopup = createPopup(
  {
    lockScroll: false,
  },
  ConfirmValueCard,
)

async function handleOpenDefault() {
  try {
    const result = await defaultPopup.open({
      modelValue: 3,
    })

    await showDemoResult(result, '默认示例：禁止点击遮罩关闭')
  }
  catch {
  }
}

async function handleOpenCustomHeight() {
  try {
    const result = await customHeightPopup.open({
      modelValue: 5,
    })

    await showDemoResult(result, '自定义高度：style.height = 60vh')
  }
  catch {
  }
}

async function handleOpenUnlockScroll() {
  try {
    const result = await unlockScrollPopup.open({
      modelValue: 8,
    })

    await showDemoResult(result, '允许背景滚动：lockScroll = false')
  }
  catch {
  }
}
</script>

<template>
  <div class="demo-block">
    <div class="demo-block__desc">
      同一个内容组件可以配不同的 `popupProps`，这里分别演示 `closeOnClickOverlay`、`style.height` 和 `lockScroll`。
    </div>
    <VanButton block type="primary" @click="handleOpenDefault">
      禁止点击遮罩关闭
    </VanButton>
    <VanButton block type="success" @click="handleOpenCustomHeight">
      自定义弹层高度
    </VanButton>
    <VanButton block plain type="warning" @click="handleOpenUnlockScroll">
      允许背景滚动
    </VanButton>
  </div>
</template>

<style scoped>
.demo-block {
  display: grid;
  gap: 12px;
}

.demo-block__desc {
  color: var(--van-text-color-2);
  font-size: 13px;
  line-height: 1.6;
}

:global(.functional-popup-demo-card) {
  display: grid;
  gap: 12px;
  padding: 16px;
  min-height: 220px;
  box-sizing: border-box;
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
