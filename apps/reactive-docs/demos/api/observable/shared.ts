import type { Ref } from 'vue'
import { autorun } from '@formily/reactive'
import { onBeforeUnmount } from 'vue'

export function formatValue(value: unknown) {
  return JSON.stringify(value, null, 2)
}

export function parseNumber(value: string | undefined, fallback = 0) {
  const next = Number(value)
  return Number.isFinite(next) ? next : fallback
}

export function pushLog(logs: Ref<string[]>, message: string, max = 6) {
  logs.value = [message, ...logs.value].slice(0, max)
}

export function useAutorunEffect(effect: () => void) {
  const dispose = autorun(effect)
  onBeforeUnmount(() => dispose())
}
