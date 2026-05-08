<script setup lang="tsx">
import type { FormPopupSlotProps } from '@silver-formily/vant'
import { toJS } from '@formily/reactive'
import { FormItem, FormPopup, Input } from '@silver-formily/vant'
import { Field } from '@silver-formily/vue'
import { Button as VanButton } from 'vant'
import { ref } from 'vue'
import { showDemoResult } from '../shared'

const latestResult = ref('这里同时演示 header / footer 作用域插槽，以及直接通过 saveDraft() 触发动态 middleware。')

interface PublishValues {
  title: string
  summary: string
}

const publishContent = {
  header: () => (
    <div class="form-popup-demo-header">
      <div class="form-popup-demo-header__title">自定义头部</div>
      <div class="form-popup-demo-header__desc">
        你可以保留 FormPopup 的表单生命周期，同时按业务需求接管头部和底部按钮。
      </div>
    </div>
  ),
  default: () => (
    <div class="form-popup-demo-fields">
      <Field
        name="title"
        title="方案标题"
        validator={[{ required: true, message: '请输入方案标题' }]}
        decorator={[FormItem]}
        component={[Input, { placeholder: '例如：华东巡检改版' }]}
      />
      <Field
        name="summary"
        title="摘要"
        decorator={[FormItem, { labelAlign: 'top' }]}
        component={[Input.TextArea, {
          rows: 3,
          maxlength: 60,
          showWordLimit: true,
          placeholder: '简要说明这次发布要点',
        }]}
      />
    </div>
  ),
  footer: ({ form, reject, resolve, saveDraft }: FormPopupSlotProps<PublishValues>) => (
    <div class="form-popup-demo-actions">
      <VanButton block plain disabled={form.submitting} onClick={() => reject()}>
        取消
      </VanButton>
      <VanButton block loading={form.submitting} onClick={() => saveDraft()}>
        保存草稿
      </VanButton>
      <VanButton block type="primary" loading={form.submitting} onClick={() => resolve()}>
        发布
      </VanButton>
    </div>
  ),
}

async function handleOpen() {
  const result = await FormPopup<PublishValues, ['save-draft']>(
    {
      title: '发布配置',
      closeOnClickOverlay: false,
    },
    publishContent,
    ['save-draft'] as const,
  )
    .forConfirm(async (form) => {
      await new Promise(resolve => setTimeout(resolve, 400))
      return toJS(form.values)
    })
    .forSaveDraft((form) => {
      form.setValues({
        summary: `${form.values.summary || ''}（草稿）`,
      })
    })
    .open({
      values: {
        title: '华东巡检改版',
        summary: '先同步到预发布环境，确认券后价和库存展示。',
      },
    })

  latestResult.value = JSON.stringify(result, null, 2)
  await showDemoResult(result, 'FormPopup saveDraft 返回值')
}
</script>

<template>
  <div class="demo-block">
    <VanButton block @click="handleOpen">
      打开 slots + middleware 示例
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

:global(.form-popup-demo-header) {
  display: grid;
  gap: 6px;
  padding: 2px 2px 4px;
}

:global(.form-popup-demo-header__title) {
  font-size: 16px;
  font-weight: 600;
  color: var(--van-text-color);
}

:global(.form-popup-demo-header__desc) {
  font-size: 13px;
  line-height: 1.5;
  color: var(--van-text-color-2);
}

:global(.form-popup-demo-fields) {
  display: grid;
}

:global(.form-popup-demo-actions) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
</style>
