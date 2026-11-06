import type { FormItemStatusContextProps } from 'antd/es/form/context'
import type { IFormItemProps } from '../form-item/types'
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons'
import { ConfigProvider } from 'antd'
import useCSSVarCls from 'antd/es/config-provider/hooks/useCSSVarCls'
import { FormItemInputContext } from 'antd/es/form/context'
import useFormStyle from 'antd/es/form/style'
import cls from 'clsx'
import { useContext, useMemo } from 'react'

// Ant Design 6.6.5 compatibility boundary. Keep internal context/style imports here
// and run the native feedback comparison tests when upgrading Ant Design.
const icons = {
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
  success: CheckCircleFilled,
  validating: LoadingOutlined,
}

export const NativeFeedbackProvider = FormItemInputContext.Provider
export const useNativeFeedback = () => useContext(FormItemInputContext)

export function useFormItemFeedback({ feedbackStatus, feedbackText, feedbackIcon, hasFeedback, enableOutlineFeedback = true }: Pick<IFormItemProps, 'feedbackStatus' | 'feedbackText' | 'feedbackIcon' | 'hasFeedback' | 'enableOutlineFeedback'>) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext)
  const prefix = getPrefixCls('form')
  const rootCls = useCSSVarCls(prefix)
  const [hashId, cssVarCls] = useFormStyle(prefix, rootCls)
  const status = feedbackStatus === 'pending' ? 'validating' : feedbackStatus ?? ''
  const customIcon = feedbackIcon !== undefined && feedbackIcon !== null && feedbackIcon !== false && feedbackIcon !== ''
  const enabled = hasFeedback ?? customIcon
  const context = useMemo<FormItemStatusContextProps>(() => {
    const Icon = status ? icons[status] : undefined
    const message = feedbackText === undefined || feedbackText === null || feedbackText === false || feedbackText === '' ? [] : [feedbackText]
    return {
      isFormItemInput: true,
      status: enableOutlineFeedback ? status : '',
      errors: status === 'error' ? message : [],
      warnings: status === 'warning' ? message : [],
      hasFeedback: enabled,
      feedbackIcon: enabled && (customIcon || Icon)
        ? <span className={cls(`${prefix}-item-feedback-icon`, status && `${prefix}-item-feedback-icon-${status}`)}>{customIcon ? feedbackIcon : Icon && <Icon />}</span>
        : null,
    }
  }, [status, feedbackText, feedbackIcon, customIcon, enabled, enableOutlineFeedback, prefix])
  return { context, className: cls(`${prefix}-item`, rootCls, hashId, cssVarCls) }
}
