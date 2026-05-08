<script setup lang="ts">
import type { DefineComponent } from 'vue'
import type { UploadFileListItem } from '../upload/types'
import type { PreviewTextUploadProps } from './types'
import { isPlainObj, isValid } from '@formily/shared'
import { Uploader as RawUploader } from 'vant'
import { computed } from 'vue'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextUpload',
  inheritAttrs: false,
})

const props = defineProps<PreviewTextUploadProps>()

const { placeholder } = usePreviewConfig()
const VanUploader = RawUploader as unknown as DefineComponent<Record<string, unknown>>

function isLink(value: string) {
  return /^(?:https?:\/\/|data:|blob:|\/)/.test(value)
}

function resolveFileName(url: string) {
  const path = url.split(/[?#]/)[0]
  const name = path.split('/').filter(Boolean).at(-1)

  if (!name) {
    return undefined
  }

  try {
    return decodeURIComponent(name)
  }
  catch {
    return name
  }
}

function createNamedFile(name: unknown) {
  return isValid(name)
    ? { name: String(name) } as File
    : undefined
}

function resolvePreviewItem(item: unknown): UploadFileListItem | null {
  if (!isValid(item)) {
    return null
  }

  if (typeof item === 'string' || typeof item === 'number') {
    const text = String(item)

    return isLink(text)
      ? {
          file: createNamedFile(resolveFileName(text)),
          name: resolveFileName(text),
          url: text,
        }
      : {
          file: createNamedFile(text),
          name: text,
        }
  }

  if (!isPlainObj(item)) {
    return {
      file: createNamedFile(item),
      name: String(item),
    }
  }

  const itemRecord = item as Record<string, any>
  const responseRecord = isPlainObj(itemRecord.response)
    ? itemRecord.response as Record<string, any>
    : undefined
  const dataRecord = isPlainObj(responseRecord?.data)
    ? responseRecord.data as Record<string, any>
    : undefined
  const url = [
    itemRecord.url,
    itemRecord.content,
    typeof itemRecord.response === 'string' ? itemRecord.response : undefined,
    responseRecord?.url,
    responseRecord?.src,
    dataRecord?.url,
    dataRecord?.src,
  ].find(value => typeof value === 'string')

  const name = [
    itemRecord.name,
    itemRecord.file?.name,
    typeof url === 'string' ? resolveFileName(url) : undefined,
  ].find(value => isValid(value))

  return {
    ...itemRecord,
    file: itemRecord.file ?? createNamedFile(name),
    name: isValid(name) ? String(name) : itemRecord.name,
    url,
  }
}

const previewFileList = computed(() => {
  const values = Array.isArray(props.modelValue)
    ? props.modelValue
    : isValid(props.modelValue)
      ? [props.modelValue]
      : []

  return values
    .map(resolvePreviewItem)
    .filter((item): item is UploadFileListItem => Boolean(item))
})

function handleClickPreview(
  file: UploadFileListItem,
  detail: { index?: number, name?: number | string },
) {
  props.previewFile?.(file, {
    ...detail,
    fileList: previewFileList.value,
  })
}
</script>

<template>
  <div class="van-field__control silver-formily-vant-preview-upload">
    <template v-if="!previewFileList.length">
      {{ placeholder }}
    </template>
    <VanUploader
      v-else
      v-bind="$attrs"
      class="silver-formily-vant-preview-upload__uploader"
      :model-value="previewFileList"
      readonly
      :deletable="false"
      :disabled="false"
      :show-upload="false"
      @click-preview="handleClickPreview"
    />
  </div>
</template>

<style scoped>
.silver-formily-vant-preview-upload {
  line-height: 1.5;
  white-space: normal;
}

.silver-formily-vant-preview-upload__uploader {
  width: 100%;
}

.silver-formily-vant-preview-upload__uploader :deep(.van-uploader__upload),
.silver-formily-vant-preview-upload__uploader :deep(.van-uploader__preview-delete) {
  display: none;
}
</style>
