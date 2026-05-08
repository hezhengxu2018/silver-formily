import type { VNode } from 'vue'

export type FormItemContent = string | number | VNode

export type FormItemFeedbackStatus = 'error' | 'warning' | 'success' | 'pending'

export interface FormItemProps {
  label?: FormItemContent
  extra?: FormItemContent
  feedbackText?: FormItemContent
  feedbackStatus?: FormItemFeedbackStatus
  fieldAddress?: string
  fieldPath?: string
  asterisk?: boolean
}
