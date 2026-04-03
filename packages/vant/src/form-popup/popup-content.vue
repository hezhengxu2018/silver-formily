<script setup lang="ts">
import type { Form } from '@formily/core'
import type { PropType } from 'vue'
import type { FormPopupProps, FormPopupResolve, FormPopupSlots } from './types'
import { formilyComputed } from '@silver-formily/reactive-vue'
import { FormProvider } from '@silver-formily/vue'
import { Button as VanButton, Popup as VanPopup } from 'vant'
import { computed } from 'vue'
import { createNamespace } from '../__builtins__'

defineOptions({
  name: 'FormPopupContent',
})

const props = defineProps({
  popupProps: {
    type: Object as PropType<FormPopupProps>,
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
    type: Function as PropType<FormPopupResolve>,
    required: true,
  },
  reject: {
    type: Function as PropType<() => void>,
    required: true,
  },
  handlePopupClosed: {
    type: Function as PropType<() => void>,
    required: true,
  },
  handlePopupShowChange: {
    type: Function as PropType<(value: boolean) => void>,
    required: true,
  },
})

const slots = defineSlots<FormPopupSlots>()
const { prefixCls, b } = createNamespace('form-popup')
const popupBindings = computed(() => {
  const {
    show: _show,
    title: _title,
    cancelText: _cancelText,
    cancelButtonProps: _cancelButtonProps,
    okText: _okText,
    okButtonProps: _okButtonProps,
    onClosed: _onClosed,
    'onUpdate:show': _onUpdateShow,
    ...vanPopupProps
  } = props.popupProps

  return vanPopupProps
})
const hasHeader = computed(() => Boolean(slots.header || props.popupProps.title))
const internalSubmitting = formilyComputed(() => {
  return Boolean(props.form.submitting || props.popupProps.okButtonProps?.loading)
})
const cancelDisabled = computed(() => {
  return Boolean(props.form.submitting || props.popupProps.cancelButtonProps?.disabled)
})
</script>

<template>
  <VanPopup
    v-bind="popupBindings"
    :show="props.visible"
    @update:show="props.handlePopupShowChange"
    @closed="props.handlePopupClosed"
  >
    <div :class="prefixCls">
      <div
        v-if="hasHeader"
        :class="b('header')"
      >
        <slot
          v-if="slots.header"
          name="header"
          :resolve="resolve"
          :reject="reject"
          :form="form"
        />
        <div
          v-else
          :class="b('title')"
        >
          {{ props.popupProps.title }}
        </div>
      </div>

      <div :class="b('body')">
        <FormProvider :form="props.form">
          <slot
            :resolve="resolve"
            :reject="reject"
            :form="form"
          />
        </FormProvider>
      </div>

      <div :class="b('footer')">
        <slot
          v-if="slots.footer"
          name="footer"
          :resolve="resolve"
          :reject="reject"
          :form="form"
        />
        <template v-else>
          <VanButton
            v-bind="props.popupProps.cancelButtonProps"
            :block="props.popupProps.cancelButtonProps?.block ?? true"
            :disabled="cancelDisabled"
            @click="reject()"
          >
            {{ props.popupProps.cancelText || props.popupProps.cancelButtonProps?.text || '取消' }}
          </VanButton>
          <VanButton
            v-bind="props.popupProps.okButtonProps"
            :block="props.popupProps.okButtonProps?.block ?? true"
            :loading="internalSubmitting"
            :type="props.popupProps.okButtonProps?.type ?? 'primary'"
            @click="resolve()"
          >
            {{ props.popupProps.okText || props.popupProps.okButtonProps?.text || '确定' }}
          </VanButton>
        </template>
      </div>
    </div>
  </VanPopup>
</template>
