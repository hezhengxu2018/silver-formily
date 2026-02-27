<script lang="ts" setup>
import type { Field } from '@formily/core'
import type { IFormItemProps } from '../form-item/types'
import { Edit } from '@element-plus/icons-vue'
import { reaction } from '@formily/reactive'
import { isValid } from '@formily/shared'
import { useField } from '@silver-formily/vue'
import { ElPopover, ElText, ClickOutside as vClickOutside } from 'element-plus'
import { ref } from 'vue'
import { stylePrefix } from '../__builtins__/configs'
import { FormBaseItem } from '../form-item'

defineOptions({
  name: 'FEditablePopover',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<IFormItemProps>(), {
  feedbackLayout: 'popover',
  size: 'default',
})

const fieldRef = useField<Field>()
const prefixCls = `${stylePrefix}-editable`
const contentRef = ref<HTMLElement>()
const visible = ref(false)

if (isValid(fieldRef.value.data)) {
  /* istanbul ignore else -- @preserve */
  if (!isValid(fieldRef.value.data.readPretty)) {
    fieldRef.value.data.readPretty = true
  }
}
else {
  fieldRef.value.data = {}
  fieldRef.value.data.readPretty = true
}

function onClickOutside(e) {
  const popoverDOM = contentRef.value.parentElement
  /* istanbul ignore else -- @preserve */
  if (!popoverDOM.contains(e.target)) {
    visible.value = false
  }
}
function onClick() {
  visible.value = true
}

reaction(
  () => fieldRef.value.form.queryFeedbacks({
    type: 'error',
    address: `${fieldRef.value.address.entire}.*`,
  }),
  (errorList) => {
    if (errorList.length > 0) {
      visible.value = true
    }
  },
)
</script>

<template>
  <div :class="prefixCls">
    <ElPopover
      v-bind="$attrs"
      :visible="visible"
      :title="$attrs.title || fieldRef.title" trigger="click" width="auto"
    >
      <template #default>
        <div ref="contentRef" :class="`${prefixCls}-popover-wrapper`">
          <slot />
        </div>
      </template>
      <template #reference>
        <FormBaseItem v-click-outside="onClickOutside" v-bind="props" :class="`${prefixCls}-trigger`">
          <div :class="`${prefixCls}-content`" @click="onClick">
            <ElText>
              {{ fieldRef.title }}
            </ElText>
            <Edit :class="`${prefixCls}-edit-btn`" />
          </div>
        </FormBaseItem>
      </template>
    </ElPopover>
  </div>
</template>
