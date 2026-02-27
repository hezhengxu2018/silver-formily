<script lang="ts" setup>
import type { ArrayField } from '@formily/core'
import { DArrowLeft, DArrowRight, MoreFilled } from '@element-plus/icons-vue'
import { formilyComputed, useObserver } from '@silver-formily/reactive-vue'
import { useField } from '@silver-formily/vue'
import { CHANGE_EVENT, ElBadge, useLocale, useNamespace } from 'element-plus'
import { computed, ref, watchEffect } from 'vue'
import { paginationPagerProps } from './pager'

defineOptions({
  name: 'ElPaginationPager',
})
const props = defineProps(paginationPagerProps)
const emit = defineEmits([CHANGE_EVENT])
const nsPager = useNamespace('pager')
const nsIcon = useNamespace('icon')
const { t } = useLocale()

const showPrevMore = ref(false)
const showNextMore = ref(false)
const quickPrevHover = ref(false)
const quickNextHover = ref(false)
const quickPrevFocus = ref(false)
const quickNextFocus = ref(false)
const pagers = computed(() => {
  const pagerCount = props.pagerCount
  const halfPagerCount = (pagerCount - 1) / 2
  const currentPage = Number(props.currentPage)
  const pageCount = Number(props.pageCount)
  let showPrevMore = false
  let showNextMore = false
  if (pageCount > pagerCount) {
    if (currentPage > pagerCount - halfPagerCount) {
      showPrevMore = true
    }
    if (currentPage < pageCount - halfPagerCount) {
      showNextMore = true
    }
  }
  const array: number[] = []
  if (showPrevMore && !showNextMore) {
    const startPage = pageCount - (pagerCount - 2)
    for (let i = startPage; i < pageCount; i++) {
      array.push(i)
    }
  }
  else if (!showPrevMore && showNextMore) {
    for (let i = 2; i < pagerCount; i++) {
      array.push(i)
    }
  }
  else if (showPrevMore && showNextMore) {
    const offset = Math.floor(pagerCount / 2) - 1
    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
      array.push(i)
    }
  }
  else {
    for (let i = 2; i < pageCount; i++) {
      array.push(i)
    }
  }
  return array
})

const prevMoreKls = computed(() => [
  'more',
  'btn-quickprev',
  nsIcon.b(),
  nsPager.is('disabled', props.disabled),
])
const nextMoreKls = computed(() => [
  'more',
  'btn-quicknext',
  nsIcon.b(),
  nsPager.is('disabled', props.disabled),
])

const tabindex = computed(() => (props.disabled ? -1 : 0))
watchEffect(() => {
  const halfPagerCount = (props.pagerCount - 1) / 2
  showPrevMore.value = false
  showNextMore.value = false
  if (props.pageCount! > props.pagerCount) {
    if (props.currentPage > props.pagerCount - halfPagerCount) {
      showPrevMore.value = true
    }
    if (props.currentPage < props.pageCount! - halfPagerCount) {
      showNextMore.value = true
    }
  }
})
function onMouseEnter(forward = false) {
  if (props.disabled)
    return
  if (forward) {
    quickPrevHover.value = true
  }
  else {
    quickNextHover.value = true
  }
}
function onFocus(forward = false) {
  if (forward) {
    quickPrevFocus.value = true
  }
  else {
    quickNextFocus.value = true
  }
}
function onEnter(e: UIEvent) {
  const target = e.target as HTMLElement
  if (
    target.tagName.toLowerCase() === 'li'
    && Array.from(target.classList).includes('number')
  ) {
    const newPage = Number(target.textContent)
    if (newPage !== props.currentPage) {
      emit(CHANGE_EVENT, newPage)
    }
  }
  else if (
    target.tagName.toLowerCase() === 'li'
    && Array.from(target.classList).includes('more')
  ) {
    onPagerClick(e)
  }
}
function onPagerClick(event: UIEvent) {
  const target = event.target as HTMLElement
  if (target.tagName.toLowerCase() === 'ul' || props.disabled) {
    return
  }
  let newPage = Number(target.textContent)
  const pageCount = props.pageCount!
  const currentPage = props.currentPage
  const pagerCountOffset = props.pagerCount - 2
  if (target.className.includes('more')) {
    if (target.className.includes('quickprev')) {
      newPage = currentPage - pagerCountOffset
    }
    else if (target.className.includes('quicknext')) {
      newPage = currentPage + pagerCountOffset
    }
  }
  if (!Number.isNaN(+newPage)) {
    if (newPage < 1) {
      newPage = 1
    }
    if (newPage > pageCount) {
      newPage = pageCount
    }
  }
  if (newPage !== currentPage) {
    emit(CHANGE_EVENT, newPage)
  }
}
/* formily error count */
useObserver()
const fieldRef = useField<ArrayField>()
const field = fieldRef.value
const path = field.address.entire
const errorPageIndexList = formilyComputed(() => {
  const errorPageSet = field.form
    .queryFeedbacks({
      type: 'error',
      address: `${path}.**`,
    })
    .map(feedback => Number(feedback.path.split(`${path}.`)[1].split('.')[0]))
    .reduce((acc, cur) => {
      const pageIndex = Math.floor(cur / props.pageSize)
      acc.add(pageIndex)
      return acc
    }, new Set<number>())

  const errorPageList = Array.from(errorPageSet).sort((a, b) => a - b)
  return errorPageList
})

const isPrevMoreError = formilyComputed(() => {
  return errorPageIndexList.value.some(pageIdx => (pageIdx < pagers.value[0] - 1) && pageIdx !== 0)
})
const isNextMoreError = formilyComputed(() => {
  return errorPageIndexList.value.some(pageIdx => (pageIdx > pagers.value.at(-1) - 1) && pageIdx !== errorPageIndexList.value.length - 1)
})
</script>

<template>
  <ul :class="nsPager.b()" @click="onPagerClick" @keyup.enter="onEnter">
    <ElBadge v-if="pageCount > 1" is-dot :value="1" :hidden="errorPageIndexList[0] !== 0">
      <li
        :class="[
          nsPager.is('active', currentPage === 1),
          nsPager.is('disabled', disabled),
        ]" class="number" :aria-current="currentPage === 1" :aria-label="t('el.pagination.currentPage', { pager: 1 })"
        :tabindex="tabindex"
      >
        1
      </li>
    </ElBadge>
    <ElBadge v-if="showPrevMore" is-dot :value="1" :hidden="!isPrevMoreError">
      <li
        :class="prevMoreKls" :tabindex="tabindex"
        :aria-label="t('el.pagination.prevPages', { pager: pagerCount - 2 })" @mouseenter="onMouseEnter(true)"
        @mouseleave="quickPrevHover = false" @focus="onFocus(true)" @blur="quickPrevFocus = false"
      >
        <DArrowLeft v-if="(quickPrevHover || quickPrevFocus) && !disabled" />
        <MoreFilled v-else />
      </li>
    </ElBadge>
    <ElBadge
      v-for="pager in pagers" :key="pager" is-dot :value="1"
      :hidden="!errorPageIndexList.includes(pager - 1)"
    >
      <li
        :class="[
          nsPager.is('active', currentPage === pager),
          nsPager.is('disabled', disabled),
        ]" class="number" :aria-current="currentPage === pager" :aria-label="t('el.pagination.currentPage', { pager })"
        :tabindex="tabindex"
      >
        {{ pager }}
      </li>
    </ElBadge>
    <ElBadge v-if="showNextMore" is-dot :value="1" :hidden="!isNextMoreError">
      <li
        :class="nextMoreKls" :tabindex="tabindex"
        :aria-label="t('el.pagination.nextPages', { pager: pagerCount - 2 })" @mouseenter="onMouseEnter()"
        @mouseleave="quickNextHover = false" @focus="onFocus()" @blur="quickNextFocus = false"
      >
        <DArrowRight v-if="(quickNextHover || quickNextFocus) && !disabled" />
        <MoreFilled v-else />
      </li>
    </ElBadge>
    <ElBadge
      is-dot
      :value="1"
      :hidden="errorPageIndexList[errorPageIndexList.length - 1] !== pageCount - 1"
    >
      <li
        :class="[
          nsPager.is('active', currentPage === pageCount),
          nsPager.is('disabled', disabled),
        ]" class="number" :aria-current="currentPage === pageCount"
        :aria-label="t('el.pagination.currentPage', { pager: pageCount })" :tabindex="tabindex"
      >
        {{ pageCount }}
      </li>
    </ElBadge>
  </ul>
</template>
