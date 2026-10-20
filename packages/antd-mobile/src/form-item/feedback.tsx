import type { IFormItemProps } from './types'
import cls from 'classnames'

type FeedbackProps = Pick<IFormItemProps, 'feedbackStatus' | 'feedbackText'> & { prefixCls: string }

export function FormItemFeedback({ prefixCls, feedbackText, feedbackStatus }: FeedbackProps) {
  return (
    <div className={cls(`${prefixCls}-help`, {
      [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
    })}
    >
      {feedbackText}
    </div>
  )
}
