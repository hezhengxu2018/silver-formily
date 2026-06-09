<script setup lang="ts">
import type { Field as FormilyField } from '@silver-formily/core'
import type { DefineComponent } from 'vue'
import type {
  UploadComponentProps,
  UploadFileListItem,
  UploadSlots,
} from './types'
import { reactionWatch } from '@silver-formily/reactive-vue'
import { isFn, shallowClone } from '@silver-formily/shared'
import { useField } from '@silver-formily/vue'
import { Uploader as RawUploader } from 'vant'
import { computed, ref, watch } from 'vue'
import { useCleanAttrs, useHasCustomDefaultSlot } from '../__builtins__'

defineOptions({
  name: 'FUpload',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UploadComponentProps>(), {
  fileList: () => [],
  formatValue: item => item,
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

const slots = defineSlots<UploadSlots>()

const VanUploader = RawUploader as unknown as DefineComponent<Record<string, unknown>>

const uploaderRef = ref()
const innerFileList = ref<UploadFileListItem[]>([])
const fieldRef = useField<FormilyField>()
const { props: uploadProps } = useCleanAttrs()
const hasCustomDefaultSlot = useHasCustomDefaultSlot(slots.default)

const isSingleFileUpload = computed(() => Number(uploadProps.value.maxCount) === 1)

const uploaderProps = computed(() => {
  return {
    ...uploadProps.value,
    afterRead: handleAfterRead,
    modelValue: innerFileList.value,
    reupload: uploadProps.value.reupload ?? isSingleFileUpload.value,
  }
})

watch(() => props.fileList, (value) => {
  innerFileList.value = Array.isArray(value) ? [...value] : []
}, { immediate: true })

fieldRef.value.inject({
  getUploaderRef: () => uploaderRef,
})

reactionWatch(() => {
  return fieldRef.value.dataSource ?? []
}, (value) => {
  const nextList = shallowClone(value) as UploadFileListItem[]
  innerFileList.value = nextList
  emit('update:modelValue', props.formatValue(nextList))
})

function commitFileList(nextList = innerFileList.value) {
  const normalizedList = shallowClone(nextList) as UploadFileListItem[]

  innerFileList.value = normalizedList
  fieldRef.value.setDataSource(normalizedList)
}

function handleModelValueChange(fileList: UploadFileListItem[]) {
  innerFileList.value = shallowClone(fileList) as UploadFileListItem[]
  commitFileList(innerFileList.value)
}

function removeFileItems(items: UploadFileListItem | UploadFileListItem[]) {
  const failedItems = Array.isArray(items) ? items : [items]
  const nextList = innerFileList.value.filter((item) => {
    return !failedItems.includes(item)
  })

  commitFileList(nextList)
}

async function handleAfterRead(items: UploadFileListItem | UploadFileListItem[], detail: { name: string | number, index: number }) {
  const externalAfterRead = uploadProps.value.afterRead ?? uploadProps.value.onAfterRead

  if (isFn(externalAfterRead)) {
    try {
      await externalAfterRead(items, detail)
      commitFileList()
    }
    catch {
      removeFileItems(items)
    }
  }
}
</script>

<template>
  <VanUploader
    v-if="hasCustomDefaultSlot"
    ref="uploaderRef"
    v-bind="uploaderProps"
    @update:model-value="handleModelValueChange"
  >
    <slot />
    <template v-if="$slots['preview-cover']" #preview-cover="slotProps">
      <slot name="preview-cover" v-bind="slotProps" />
    </template>
    <template v-if="$slots['preview-delete']" #preview-delete>
      <slot name="preview-delete" />
    </template>
  </VanUploader>
  <VanUploader
    v-else
    ref="uploaderRef"
    v-bind="uploaderProps"
    @update:model-value="handleModelValueChange"
  >
    <template v-if="$slots['preview-cover']" #preview-cover="slotProps">
      <slot name="preview-cover" v-bind="slotProps" />
    </template>
    <template v-if="$slots['preview-delete']" #preview-delete>
      <slot name="preview-delete" />
    </template>
  </VanUploader>
</template>
