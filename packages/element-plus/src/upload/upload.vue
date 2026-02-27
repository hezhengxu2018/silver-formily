<script lang="ts" setup>
import type { Field } from '@formily/core'
import type { ImageViewerInstance, ImageViewerProps, UploadFile, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import type { PropType } from 'vue'
import {
  Plus as PlusIcon,
  UploadFilled as UploadFilledIcon,
  Upload as UploadIcon,
} from '@element-plus/icons-vue'
import { reaction } from '@formily/reactive'
import { isFn } from '@formily/shared'
import { useField } from '@silver-formily/vue'
import { ElButton, ElIcon, ElImageViewer, ElUpload, genFileId } from 'element-plus'
import { omit } from 'lodash-es'
import { computed, onBeforeUnmount, ref, useAttrs } from 'vue'
import { hasSlotContent } from '../__builtins__'

defineOptions({
  name: 'FUpload',
  inheritAttrs: false,
})

const props = defineProps({
  textContent: {
    type: String,
    default: '',
  },
  errorAdaptor: {
    type: Function as PropType<(error?: Error) => string>,
    default: (error?: Error) => error?.message,
  },
  formatValue: {
    type: Function as PropType<(fileList?: UploadFile[]) => any>,
    default: item => item,
  },
  fileList: {
    type: Array as PropType<UploadFile[]>,
    default: () => [],
  },
  imageViewerProps: {
    type: Object as PropType<ImageViewerProps>,
    default: () => ({ teleported: true, showProgress: true }),
  },
})

const emit = defineEmits(['update:modelValue'])

const uploadRef = ref<UploadInstance>()
const attrs = useAttrs() as UploadProps
const innerAttrs = computed(() => {
  return omit(attrs, [
    'onChange',
    'onRemove',
    'onExceed',
    'onError',
    'onPreview',
    'fileList',
    'onUpdate:fileList',
  ])
})
const fieldRef = useField<Field>()
fieldRef.value?.inject({
  getElUploadRef: () => {
    return uploadRef
  },
})

const imgPreviewRef = ref<ImageViewerInstance>()
const activeImageIndex = ref(0)
const isShowImgViewer = ref(false)
const imgPreviewList = computed(() => {
  return props.fileList.map(item => item.url)
})

function setFeedBack(error?: Error) {
  const message = props.errorAdaptor(error)
  fieldRef.value?.setFeedback({
    type: 'error',
    code: 'UploadError',
    messages: message ? [message] : [],
  })
}

function handleChange(file: UploadFile, fileList: UploadFile[]) {
  fieldRef.value?.setDataSource([...fileList])
  setFeedBack()
}

function handleRemove(file: UploadFile, fileList: UploadFile[]) {
  if (isFn(attrs.onRemove)) {
    attrs.onRemove(file, fileList)
  }
  fieldRef.value.setDataSource([...fileList])
  setFeedBack()
}

function handleExceed(files: File[], uploadFIles) {
  if (isFn(attrs.onExceed)) {
    attrs.onExceed(files, uploadFIles)
  }
  if (attrs.limit !== 1)
    return
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
  if (attrs.autoUpload ?? true) {
    uploadRef.value!.submit()
  }
}

function handleError(error: Error, file: UploadFile, fileList: UploadFile[]) {
  if (isFn(attrs.onError)) {
    (attrs.onError)(error, file, fileList)
  }
}

function onPreviewClick(uploadFile: UploadFile) {
  if (isFn(attrs.onPreview)) {
    (attrs.onPreview)(uploadFile)
    return
  }
  if (!uploadFile.url && !attrs.accept?.includes('image'))
    return
  const clickIndex = props.fileList.findIndex((element: UploadFile) => element.uid === uploadFile.uid)
  activeImageIndex.value = clickIndex
  isShowImgViewer.value = true
}

const dispose = reaction(() => {
  return fieldRef.value?.dataSource ?? []
}, () => {
  const emitValue = props.formatValue(fieldRef.value.dataSource as UploadFile[])
  emit('update:modelValue', emitValue)
})
onBeforeUnmount(() => {
  dispose()
})
</script>

<template>
  <ElUpload
    ref="uploadRef"
    v-bind="innerAttrs"
    :file-list="$props.fileList"
    @change="handleChange"
    @remove="handleRemove"
    @exceed="handleExceed"
    @error="handleError"
    @preview="onPreviewClick"
  >
    <slot v-if="hasSlotContent($slots?.default)" />
    <template v-else>
      <template v-if="attrs.drag">
        <ElIcon style="font-size: 60px; margin: 40px 0 16px;">
          <UploadFilledIcon color="gray" />
        </ElIcon>
        <div class="el-upload__text">
          {{ props.textContent }}
        </div>
      </template>
      <template v-else-if="attrs.listType === 'picture-card'">
        <PlusIcon style="width: 28px; height: 28px; color: gray" />
      </template>
      <template v-else>
        <ElButton>
          <UploadIcon width="16px" height="16px" />
          <span style="margin-left: 6px">
            {{ props.textContent }}
          </span>
        </ElButton>
      </template>
    </template>
    <template v-if="$slots.file" #file="{ file, index }">
      <slot name="file" :file="file" :index="index" />
    </template>
    <template v-if="$slots.tip" #tip>
      <slot name="tip" />
    </template>
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger" />
    </template>
  </ElUpload>
  <ElImageViewer
    v-if="isShowImgViewer"
    ref="imgPreviewRef"
    :url-list="imgPreviewList"
    :initial-index="activeImageIndex"
    v-bind="props.imageViewerProps"
    @close="isShowImgViewer = false"
  />
</template>
