<script setup lang="ts">
import type { Field as FormilyField } from '@formily/core'
import type { DefineComponent } from 'vue'
import type {
  UploadComponentProps,
  UploadFileListItem,
  UploadSlots,
} from './types'
import { isFn, isPlainObj } from '@formily/shared'
import { reactionWatch } from '@silver-formily/reactive-vue'
import { useField } from '@silver-formily/vue'
import { Uploader as RawUploader } from 'vant'
import { computed, ref, watch } from 'vue'
import { useAttrs, useCleanAttrs, useHasCustomDefaultSlot } from '../__builtins__'

defineOptions({
  name: 'FUpload',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UploadComponentProps>(), {
  fileList: () => [],
  formatValue: item => item,
})

const emit = defineEmits<{
  'update:fileList': [value: UploadFileListItem[]]
  'update:modelValue': [value: any]
}>()

const slots = defineSlots<UploadSlots>()

const VanUploader = RawUploader as unknown as DefineComponent<Record<string, unknown>>

const uploaderRef = ref()
const innerFileList = ref<UploadFileListItem[]>([])
const fieldRef = useField<FormilyField | undefined>()
const rawAttrs = useAttrs()
const { props: attrs } = useCleanAttrs(['afterRead', 'modelValue', 'onAfterRead', 'onUpdate:modelValue'])
const hasCustomDefaultSlot = useHasCustomDefaultSlot(slots.default)

const resolvedMaxCount = computed(() => {
  const rawValue = Number(attrs.value.maxCount)

  if (!Number.isFinite(rawValue)) {
    return undefined
  }

  return Math.max(Math.trunc(rawValue), 0)
})

const uploaderProps = computed(() => {
  return {
    ...attrs.value,
    afterRead: handleAfterRead,
    modelValue: innerFileList.value,
    reupload: attrs.value.reupload ?? resolvedMaxCount.value === 1,
  }
})

watch(() => props.fileList, (value) => {
  innerFileList.value = Array.isArray(value) ? [...value] : []
}, { immediate: true })

fieldRef.value?.inject({
  getUploaderRef: () => uploaderRef,
})

if (fieldRef.value) {
  reactionWatch(() => {
    return fieldRef.value?.dataSource ?? []
  }, (value) => {
    const nextList = Array.isArray(value) ? [...value as UploadFileListItem[]] : []
    innerFileList.value = nextList
    emit('update:fileList', nextList)
    emit('update:modelValue', props.formatValue(nextList))
  })
}

function commitFileList(nextList = innerFileList.value) {
  const normalizedList = [...nextList]

  innerFileList.value = normalizedList

  if (fieldRef.value) {
    fieldRef.value.setDataSource(normalizedList)
    return
  }

  emit('update:fileList', normalizedList)
  emit('update:modelValue', props.formatValue(normalizedList))
}

function handleModelValueChange(fileList: UploadFileListItem[]) {
  innerFileList.value = [...fileList]
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
  const nestedAttrs = isPlainObj(rawAttrs.value.attrs)
    ? rawAttrs.value.attrs as Record<string, any>
    : {}
  const externalAfterRead = rawAttrs.value.afterRead
    ?? rawAttrs.value.onAfterRead
    ?? nestedAttrs.afterRead
    ?? nestedAttrs.onAfterRead

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
