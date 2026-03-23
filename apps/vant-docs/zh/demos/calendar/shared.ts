import type { CalendarModelValue } from '@silver-formily/vant'

export const marchStart = new Date(2026, 2, 1)
export const marchEnd = new Date(2026, 2, 31)
export const marchCustomMin = new Date(2026, 2, 10)
export const marchCustomMax = new Date(2026, 2, 20)
export const aprilEnd = new Date(2026, 3, 30)
export const mayStart = new Date(2026, 4, 1)
export const mayEnd = new Date(2026, 4, 31)
export const juneEnd = new Date(2026, 5, 30)

function pad(value: number) {
  return `${value}`.padStart(2, '0')
}

export function formatDate(value: Date) {
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`
}

export function formatMonthDay(value: Date) {
  return `${pad(value.getMonth() + 1)}-${pad(value.getDate())}`
}

export function formatModelValue(value: CalendarModelValue) {
  if (!value) {
    return '未选择'
  }

  if (Array.isArray(value)) {
    return value.map(item => formatDate(item)).join(' ~ ')
  }

  return formatDate(value)
}
