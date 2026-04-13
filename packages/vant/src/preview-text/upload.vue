<script setup lang="ts">
import type { PreviewTextUploadProps } from './types'
import { isPlainObj, isValid } from '@formily/shared'
import { computed } from 'vue'
import { usePreviewConfig } from './utils'

defineOptions({
  name: 'FPreviewTextUpload',
  inheritAttrs: false,
})

const props = defineProps<PreviewTextUploadProps>()

interface DisplayItem {
  key: string
  text: string
  url?: string
}

const { placeholder } = usePreviewConfig()

function isLink(value: string) {
  return /^(?:https?:\/\/|data:|blob:|\/)/.test(value)
}

function resolveDisplayItem(item: unknown, index: number): DisplayItem | null {
  if (!isValid(item)) {
    return null
  }

  if (typeof item === 'string' || typeof item === 'number') {
    const text = String(item)

    return {
      key: `${index}-${text}`,
      text,
      url: isLink(text) ? text : undefined,
    }
  }

  if (!isPlainObj(item)) {
    return {
      key: `${index}-${String(item)}`,
      text: String(item),
    }
  }

  const itemRecord = item as Record<string, any>
  const responseRecord = isPlainObj(itemRecord.response)
    ? itemRecord.response as Record<string, any>
    : undefined
  const url = [
    itemRecord.url,
    typeof itemRecord.response === 'string' ? itemRecord.response : undefined,
    responseRecord?.url,
    responseRecord?.src,
  ].find(value => typeof value === 'string')

  const text = [
    itemRecord.name,
    itemRecord.file?.name,
    url,
  ].find(value => isValid(value))

  return {
    key: `${index}-${String(text ?? url ?? 'file')}`,
    text: String(text ?? `文件 ${index + 1}`),
    url,
  }
}

const displayItems = computed(() => {
  const values = Array.isArray(props.modelValue)
    ? props.modelValue
    : isValid(props.modelValue)
      ? [props.modelValue]
      : []

  return values
    .map(resolveDisplayItem)
    .filter((item): item is DisplayItem => Boolean(item))
})
</script>

<template>
  <div class="van-field__control silver-formily-vant-preview-upload">
    <template v-if="!displayItems.length">
      {{ placeholder }}
    </template>
    <template v-else>
      <template v-for="item in displayItems" :key="item.key">
        <a
          v-if="item.url"
          class="silver-formily-vant-preview-upload__item silver-formily-vant-preview-upload__item--link"
          :href="item.url"
          target="_blank"
          rel="noreferrer"
        >
          {{ item.text }}
        </a>
        <span
          v-else
          class="silver-formily-vant-preview-upload__item"
        >
          {{ item.text }}
        </span>
      </template>
    </template>
  </div>
</template>

<style scoped>
.silver-formily-vant-preview-upload {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  line-height: 1.5;
  white-space: normal;
}

.silver-formily-vant-preview-upload__item {
  max-width: 100%;
  border-radius: 999px;
  background: var(--van-gray-1);
  color: var(--van-text-color);
  padding: 4px 10px;
  text-decoration: none;
}

.silver-formily-vant-preview-upload__item--link {
  color: var(--van-primary-color);
}
</style>
