import type { ReactNode } from 'react'
import type { IFormItemProps } from './types'
import cls from 'classnames'

export interface FeedbackMessage {
  type: 'error' | 'warning' | 'success'
  message: ReactNode
}

export interface InternalFeedbackProps {
  feedbackMessages?: FeedbackMessage[]
}

type FeedbackProps = Pick<IFormItemProps, 'feedbackStatus' | 'feedbackText'> & InternalFeedbackProps & { prefixCls: string }

export function FormItemFeedback({ prefixCls, feedbackText, feedbackStatus, feedbackMessages }: FeedbackProps) {
  const messages = feedbackText !== undefined
    ? [{ type: feedbackStatus, message: feedbackText }]
    : feedbackMessages ?? []
  return messages.map(({ type, message }, index) => (
    <div
      key={index}
      className={cls(`${prefixCls}-help`, {
        [`${prefixCls}-${type}-help`]: !!type,
      })}
    >
      {message}
    </div>
  ))
}
