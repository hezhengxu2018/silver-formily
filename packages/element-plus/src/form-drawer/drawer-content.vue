<script setup lang="ts">
import type { Form } from '@formily/core'
import type { ComponentPublicInstance, PropType } from 'vue'
import type { FormDrawerSlots, IFormDrawerProps } from './types'
import { isFn } from '@formily/shared'
import { FormProvider } from '@silver-formily/vue'
import { ElButton, ElConfigProvider, ElDrawer } from 'element-plus'
import { omit } from 'lodash-es'
import { computed, ref } from 'vue'
import { loadElConfigProvider, stylePrefix, useDebonceSubmitting } from '../__builtins__'
import { useEnterSubmit } from '../__builtins__/shared/use-enter-submit'
import { resolveDrawerElement } from '../shared/overlay-elements'

defineOptions({
  name: 'FormDrawerContent',
})

const props = defineProps({
  drawerProps: {
    type: Object as PropType<IFormDrawerProps>,
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
    type: Function as PropType<(type?: string) => void>,
    required: true,
  },
  reject: {
    type: Function as PropType<() => void>,
    required: true,
  },
})
const slots = defineSlots<FormDrawerSlots>()
const prefixCls = `${stylePrefix}-form-drawer`
const elConfig = loadElConfigProvider()

const { internalSubmitting } = useDebonceSubmitting(props.form)
const _drawerProps = omit(props.drawerProps, ['modelValue', 'onUpdate:modelValue', 'beforeClose', 'enterSubmit'])
const drawerRef = ref<ComponentPublicInstance | null>(null)
const enableEnterSubmit = computed(() => props.drawerProps.enterSubmit !== false)

useEnterSubmit({
  visible: computed(() => props.visible),
  resolve: () => props.resolve(),
  submitting: internalSubmitting,
  getContainer: () => resolveDrawerElement(drawerRef.value),
  enabled: enableEnterSubmit,
})
</script>

<template>
  <ElDrawer
    ref="drawerRef"
    :class="prefixCls"
    :z-index="elConfig.zIndex"
    v-bind="_drawerProps"
    :model-value="visible"
    :before-close="(done) => {
      reject()
      if (isFn(props.drawerProps.beforeClose)) {
        props.drawerProps.beforeClose(done)
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
      <FormProvider :form="form">
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
            v-bind="_drawerProps.cancelButtonProps"
            @click="reject()"
          >
            {{ _drawerProps.cancelText || '取消' }}
          </ElButton>
          <ElButton
            type="primary"
            v-bind="_drawerProps.okButtonProps"
            :loading="internalSubmitting"
            @click="resolve()"
          >
            {{ _drawerProps.okText || '确定' }}
          </ElButton>
        </template>
      </div>
    </template>
  </ElDrawer>
</template>
