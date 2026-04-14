<script setup lang="ts">
import type { Field as FormilyField } from '@formily/core'
import type { DefineComponent } from 'vue'
import type {
  UploadFileListItem,
  UploadProps,
  UploadRequestData,
  UploadRequestDataValue,
  UploadRequestOptions,
  UploadSlots,
} from './types'
import { isFn, isPlainObj } from '@formily/shared'
import { reactionWatch } from '@silver-formily/reactive-vue'
import { useField } from '@silver-formily/vue'
import { Uploader as RawUploader } from 'vant'
import { computed, ref, watch } from 'vue'
import { useCleanAttrs, useHasCustomDefaultSlot } from '../__builtins__'

defineOptions({
  name: 'FUpload',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<UploadProps>(), {
  action: '',
  errorAdaptor: (error?: Error) => error?.message ?? '上传失败',
  fileList: () => [],
  formatValue: item => item,
  method: 'POST',
  textContent: '',
  withCredentials: false,
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
const { props: attrs } = useCleanAttrs(['modelValue', 'onAfterRead', 'onUpdate:modelValue'])
const hasCustomDefaultSlot = useHasCustomDefaultSlot(slots.default)

const shouldAutoUpload = computed(() => {
  return Boolean(props.httpRequest || (props.action && props.action !== '#'))
})

const resolvedMaxCount = computed(() => {
  const rawValue = Number(attrs.value.maxCount)

  if (!Number.isFinite(rawValue)) {
    return undefined
  }

  return Math.max(Math.trunc(rawValue), 0)
})

const resolvedUploadText = computed(() => {
  return attrs.value.uploadText ?? props.textContent
})

const uploaderProps = computed(() => {
  return {
    ...attrs.value,
    afterRead: handleAfterRead,
    modelValue: innerFileList.value,
    reupload: attrs.value.reupload ?? resolvedMaxCount.value === 1,
    uploadText: resolvedUploadText.value,
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

    if (shouldDeferValueSync(nextList)) {
      return
    }

    emit('update:modelValue', props.formatValue(nextList))
  })
}

function shouldDeferValueSync(fileList: UploadFileListItem[]) {
  if (!shouldAutoUpload.value) {
    return false
  }

  return fileList.some((item) => {
    return Boolean(item.file)
      && item.status !== 'done'
      && !hasUploadResult(item)
  })
}

function hasUploadResult(item: UploadFileListItem) {
  return 'response' in item || Boolean(item.url)
}

function setFeedBack(error?: Error) {
  if (!fieldRef.value) {
    return
  }

  const message = props.errorAdaptor(error)

  fieldRef.value.setFeedback({
    type: 'error',
    code: 'UploadError',
    messages: message ? [message] : [],
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

  if (!shouldDeferValueSync(normalizedList)) {
    emit('update:modelValue', props.formatValue(normalizedList))
  }
}

function resolveFieldName() {
  const rawName = attrs.value.name

  if (typeof rawName === 'number') {
    return String(rawName)
  }

  return rawName || 'file'
}

async function resolveMaybeFactory<T>(
  source: T | ((file: File, item: UploadFileListItem) => T | Promise<T>) | undefined,
  file: File,
  item: UploadFileListItem,
) {
  if (!isFn(source)) {
    return source
  }

  return await source(file, item)
}

function appendFormDataValue(formData: FormData, key: string, value: UploadRequestDataValue) {
  if (Array.isArray(value)) {
    value.forEach(item => appendFormDataValue(formData, key, item))
    return
  }

  if (value === null || value === undefined) {
    return
  }

  if (value instanceof Blob) {
    formData.append(key, value)
    return
  }

  formData.append(key, String(value))
}

function createRequestPayload(
  file: File,
  data: UploadRequestData | undefined,
  name: string,
) {
  if (data instanceof FormData) {
    data.append(name, file)
    return data
  }

  const formData = new FormData()

  Object.entries(data ?? {}).forEach(([key, value]) => {
    appendFormDataValue(formData, key, value)
  })
  formData.append(name, file)

  return formData
}

async function runDefaultRequest(options: UploadRequestOptions) {
  const response = await fetch(options.action, {
    body: createRequestPayload(options.file, options.data, options.name),
    credentials: options.withCredentials ? 'include' : 'same-origin',
    headers: options.headers,
    method: options.method,
  })

  if (!response.ok) {
    throw new Error(`Upload request failed with status ${response.status}`)
  }

  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return await response.json()
  }

  return await response.text()
}

function applyUploadResponse(item: UploadFileListItem, response: any) {
  const adapted = props.responseAdaptor?.(response, item)

  item.response = response

  if (typeof adapted === 'string') {
    item.url = adapted
    return
  }

  if (isPlainObj(adapted)) {
    Object.assign(item, adapted)
    return
  }

  if (typeof response === 'string') {
    item.url = response
    return
  }

  if (!isPlainObj(response)) {
    return
  }

  const responseRecord = response as Record<string, any>
  const dataRecord = isPlainObj(responseRecord.data)
    ? responseRecord.data as Record<string, any>
    : undefined
  const inferredUrl = [
    responseRecord.url,
    responseRecord.src,
    dataRecord?.url,
    dataRecord?.src,
  ].find(value => typeof value === 'string')

  if (typeof inferredUrl === 'string') {
    item.url = inferredUrl
  }
}

async function uploadItem(item: UploadFileListItem) {
  const file = item.file

  if (!file) {
    return
  }

  item.status = 'uploading'
  item.message = ''
  commitFileList()

  try {
    const [data, headers] = await Promise.all([
      resolveMaybeFactory(props.data, file, item),
      resolveMaybeFactory(props.headers, file, item),
    ])

    const requestOptions: UploadRequestOptions = {
      action: props.action,
      data,
      file,
      fileList: innerFileList.value,
      headers,
      item,
      method: props.method,
      name: resolveFieldName(),
      withCredentials: props.withCredentials,
    }

    const response = props.httpRequest
      ? await props.httpRequest(requestOptions)
      : await runDefaultRequest(requestOptions)

    applyUploadResponse(item, response)
    item.status = 'done'
    item.message = ''
    setFeedBack()
    commitFileList()
  }
  catch (error) {
    const nextError = error instanceof Error
      ? error
      : new Error(String(error))

    item.status = 'failed'
    item.message = props.errorAdaptor(nextError)
    setFeedBack(nextError)
    commitFileList()
  }
}

function handleModelValueChange(fileList: UploadFileListItem[]) {
  innerFileList.value = [...fileList]
  setFeedBack()
  commitFileList(innerFileList.value)
}

async function handleAfterRead(items: UploadFileListItem | UploadFileListItem[], detail: { name: string | number, index: number }) {
  const externalAfterRead = attrs.value.afterRead ?? attrs.value.onAfterRead

  if (isFn(externalAfterRead)) {
    externalAfterRead(items, detail)
  }

  if (!shouldAutoUpload.value) {
    return
  }

  const nextItems = Array.isArray(items) ? items : [items]

  await Promise.all(nextItems.map(uploadItem))
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
    v-else-if="resolvedUploadText"
    ref="uploaderRef"
    v-bind="uploaderProps"
    @update:model-value="handleModelValueChange"
  >
    <div class="van-uploader__upload">
      <span class="van-uploader__upload-text">
        {{ resolvedUploadText }}
      </span>
    </div>
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
