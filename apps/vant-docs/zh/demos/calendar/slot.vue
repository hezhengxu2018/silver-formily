<script setup lang="ts">
import { createForm } from '@formily/core'
import { Calendar, FormItem } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { mayEnd, mayStart } from './shared'

const form = createForm({
  values: {
    tripRange: [new Date(2026, 4, 18), new Date(2026, 4, 21)],
  },
})
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel">
      <Field
        name="tripRange"
        title="自定义插槽"
        :decorator="[FormItem, { isLink: true }]"
        :component="[
          Calendar,
          {
            type: 'range',
            minDate: mayStart,
            maxDate: mayEnd,
          },
        ]"
      >
        <template #title>
          <div class="calendar-slot-title">
            行程日历
          </div>
        </template>

        <template #bottom-info="day">
          <span
            v-if="day.date?.getDate?.() === 18"
            class="calendar-slot-tip"
          >
            出发
          </span>
          <span
            v-else-if="day.date?.getDate?.() === 21"
            class="calendar-slot-tip"
          >
            返程
          </span>
        </template>

        <template #footer>
          <div class="calendar-slot-footer">
            已透传官方插槽，可在这里放业务说明或快捷提示
          </div>
        </template>
      </Field>
    </div>
  </FormProvider>
</template>

<style scoped>
.calendar-slot-title {
  padding: 8px 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.calendar-slot-tip {
  font-size: 10px;
  color: var(--van-primary-color);
}

.calendar-slot-footer {
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  font-size: 12px;
  line-height: 1.5;
  color: var(--van-text-color-2);
  background: linear-gradient(180deg, rgba(250, 250, 250, 0) 0%, rgba(247, 248, 250, 1) 100%);
}
</style>
