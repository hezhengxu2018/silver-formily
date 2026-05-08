<script setup lang="ts">
import { createForm } from '@formily/core'
import { PasswordInput } from '@silver-formily/vant'
import { Field, FormProvider } from '@silver-formily/vue'
import { ref } from 'vue'

const form = createForm({
  values: {
    password: '12',
  },
})

const focusCount = ref(0)

function handleFocus() {
  focusCount.value += 1
}
</script>

<template>
  <FormProvider :form="form">
    <div class="demo-panel demo-panel--disable-keyboard">
      <Field
        name="password"
        :component="[
          PasswordInput,
          {
            keyboard: false,
            length: 6,
            onFocus: handleFocus,
          },
        ]"
      />

      <div class="demo-tip">
        已触发 focus：{{ focusCount }} 次，可由业务自行决定后续如何输入
      </div>
    </div>
  </FormProvider>
</template>

<style scoped>
.demo-panel--disable-keyboard {
  gap: 12px;
}

.demo-tip {
  color: var(--van-text-color-2);
  font-size: 14px;
  line-height: 20px;
}
</style>
