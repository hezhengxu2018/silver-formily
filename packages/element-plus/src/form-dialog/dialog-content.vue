<script setup lang="ts">
import type { Form } from '@formily/core'
import type { ComponentPublicInstance, PropType } from 'vue'
import type { FormDialogSlots, IFormDialogProps } from './types'
import { isFn } from '@formily/shared'
import { FormProvider } from '@silver-formily/vue'
import { ElButton, ElConfigProvider, ElDialog } from 'element-plus'
import { omit } from 'lodash-es'
import { computed, ref } from 'vue'
import { loadElConfigProvider, stylePrefix, useDebonceSubmitting } from '../__builtins__'
import { useEnterSubmit } from '../__builtins__/shared/use-enter-submit'
import { resolveDialogElement } from '../shared/overlay-elements'

defineOptions({
  name: 'FormDialogContent',
})
const props = defineProps({
  dialogProps: {
    type: Object as PropType<IFormDialogProps>,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
  form: {
    type: Object as PropType<Form>,
    required: true,
  },
  resolve: {
    type: Function as PropType<() => void>,
    required: true,
  },
  reject: {
    type: Function as PropType<() => void>,
    required: true,
  },
})

const slots = defineSlots<FormDialogSlots>()
const prefixCls = `${stylePrefix}-form-dialog`
const elConfig = loadElConfigProvider()
const _dialogProps = omit(props.dialogProps, [
  'modelValue',
  'onUpdate:modelValue',
  'beforeClose',
  'enterSubmit',
])
const { internalSubmitting } = useDebonceSubmitting(props.form)
const dialogRef = ref<ComponentPublicInstance | null>(null)
const enableEnterSubmit = computed(() => props.dialogProps.enterSubmit !== false)

useEnterSubmit({
  visible: computed(() => props.visible),
  resolve: () => props.resolve(),
  submitting: internalSubmitting,
  getContainer: () => resolveDialogElement(dialogRef.value),
  enabled: enableEnterSubmit,
})
</script>

<template>
  <ElDialog
    ref="dialogRef"
    :class="prefixCls"
    :z-index="elConfig.zIndex"
    v-bind="_dialogProps"
    :model-value="visible"
    :before-close="(done) => {
      reject()
      if (isFn(props.dialogProps.beforeClose)) {
        props.dialogProps.beforeClose(done)
      }
      else {
        done()
      }
    }"
  >
    <template v-if="slots.header" #header>
      <slot name="header" :resolve="resolve" :reject="reject" :form="form" />
    </template>

    <template #default>
      <FormProvider :form="props.form">
        <ElConfigProvider v-bind="elConfig">
          <slot :resolve="resolve" :reject="reject" :form="form" />
        </ElConfigProvider>
      </FormProvider>
    </template>

    <template #footer>
      <div :class="`${prefixCls}-footer`">
        <template v-if="slots.footer">
          <slot name="footer" :resolve="resolve" :reject="reject" :form="form" />
        </template>
        <template v-else>
          <ElButton
            v-bind="_dialogProps.cancelButtonProps"
            @click="props.reject()"
          >
            {{ _dialogProps.cancelText || '取消' }}
          </ElButton>
          <ElButton
            type="primary"
            v-bind="_dialogProps.okButtonProps"
            :loading="internalSubmitting"
            @click="props.resolve()"
          >
            {{ _dialogProps.okText || '确定' }}
          </ElButton>
        </template>
      </div>
    </template>
  </ElDialog>
</template>
