<script lang="ts" setup>
import type { Field } from '@formily/core'
import type { IFormItemProps } from '../form-item/types'
import { Close, Edit } from '@element-plus/icons-vue'
import { isPlainObj, isValid } from '@formily/shared'
import { useField } from '@silver-formily/vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { omit } from 'lodash-es'
import { computed, nextTick, ref } from 'vue'
import { stylePrefix } from '../__builtins__/configs'
import { FormBaseItem } from '../form-item'

defineOptions({
  name: 'FEditable',
})

const props = withDefaults(defineProps<IFormItemProps & { editProps?: IFormItemProps }>(), {
  feedbackLayout: 'popover',
  size: 'default',
})

const fieldRef = useField<Field>()
const innerRef = ref<HTMLElement>(null)
const prefixCls = `${stylePrefix}-editable`
const formItemRef = ref<InstanceType<typeof FormBaseItem>>(null)

const commonProps = computed(() => omit(props, 'editProps'))
const editProps = computed(() => {
  if (isPlainObj(props.editProps)) {
    return { ...omit(props, 'editProps'), ...props.editProps }
  }
  return omit(props, 'editProps')
})

function handleEnsureReadPretty() {
  if (!isValid(fieldRef.value.data)) {
    fieldRef.value.data = {}
  }
}

handleEnsureReadPretty()
fieldRef.value.data.readPretty = true

async function onClick() {
  if (fieldRef.value.disabled)
    return
  handleEnsureReadPretty()
  fieldRef.value.data.readPretty = false
  await nextTick()
  formItemRef.value.feedbackTooltipRef.updatePopper()
  innerRef.value?.querySelector('input')?.focus()
}

function onClickOutside() {
  if (fieldRef.value.data?.readPretty === true)
    return
  handleEnsureReadPretty()
  // 使用下拉菜单等触发的事件完成应有的操作
  setTimeout(async () => {
    fieldRef.value.data.readPretty = true
    await nextTick()
    formItemRef.value?.feedbackTooltipRef.updatePopper()
  }, 0)
}
</script>

<template>
  <div ref="innerRef" :class="[prefixCls, fieldRef.disabled && 'is-disabled']">
    <div v-click-outside="onClickOutside" :class="`${prefixCls}-content`">
      <FormBaseItem ref="formItemRef" v-bind="fieldRef.data?.readPretty === false ? editProps : commonProps" @click="onClick">
        <div>
          <slot />
        </div>
      </FormBaseItem>
      <template v-if="!fieldRef.disabled">
        <template v-if="fieldRef.data?.readPretty === true">
          <FormBaseItem :size="props.size" :feedback-layout="props.feedbackLayout">
            <Edit :class="`${prefixCls}-edit-btn`" @click="onClick" />
          </FormBaseItem>
        </template>
        <template v-else>
          <FormBaseItem :size="props.size" :feedback-layout="props.feedbackLayout">
            <Close :class="`${prefixCls}-close-btn`" @click="onClickOutside" />
          </FormBaseItem>
        </template>
      </template>
    </div>
  </div>
</template>
