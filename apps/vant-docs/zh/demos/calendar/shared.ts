import type { CalendarModelValue } from '@silver-formily/vant'

export const marchStart = '2026-03-01'
export const marchEnd = '2026-03-31'
export const marchCustomMin = '2026-03-10'
export const marchCustomMax = '2026-03-20'
export const aprilEnd = '2026-04-30'
export const mayStart = '2026-05-01'
export const mayEnd = '2026-05-31'
export const juneEnd = '2026-06-30'

export function formatModelValue(value: CalendarModelValue) {
  if (!value) {
    return '未选择'
  }

  if (Array.isArray(value)) {
    return value.join(' ~ ')
  }

  return value
}
