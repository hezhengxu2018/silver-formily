import type { Form } from '@formily/core'
import { reaction } from '@formily/reactive'
import { useDebounceFn } from '@vueuse/core'
import { ElLoading } from 'element-plus'
import { ref } from 'vue'

export async function loading(loadingText = 'Loading...', processor: () => Promise<any>) {
  let loadingInstance
  const loading = setTimeout(() => {
    loadingInstance = ElLoading.service({
      text: loadingText,
      background: 'transparent',
    })
  }, 100)
  try {
    return await processor()
  }
  finally {
    loadingInstance?.close()
    clearTimeout(loading)
  }
}

/**
 * 获取当前element-plus的过渡时长并转换为毫秒
 * @param cssVarName CSS 变量名，默认为 '--el-transition-duration'
 * @param defaultValue 默认值（毫秒），默认为 200
 * @returns 过渡时长（毫秒）
 */
export function getTransitionDuration(cssVarName = '--el-transition-duration', defaultValue = 200): number {
  const cssVar = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVarName)
    .trim()
  if (!cssVar) {
    return defaultValue
  }
  const durationMatch = cssVar.match(/^([\d.]+)\s*(s|ms)?$/)
  if (!durationMatch) {
    return defaultValue
  }

  const value = Number.parseFloat(durationMatch[1])
  const unit = durationMatch[2] || 'ms'

  switch (unit) {
    case 's': {
      return value * 1000
    }
    case 'ms': {
      return value
    }
  }
}

export function useDebonceSubmitting(form: Form) {
  const internalSubmitting = ref(false)
  const transitionDuration = getTransitionDuration()

  const setSubmittingFalse = useDebounceFn(() => {
    internalSubmitting.value = false
  }, () => transitionDuration)

  reaction(() => form.submitting, (val) => {
    if (val === false) {
      setSubmittingFalse()
    }
    else {
      internalSubmitting.value = val
    }
  })

  return {
    internalSubmitting,
  }
}
