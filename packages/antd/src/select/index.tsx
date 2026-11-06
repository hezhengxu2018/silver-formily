import type { SelectProps } from 'antd'
import type { ComponentRef } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { Select as AntdSelect } from 'antd'
import { forwardRef } from 'react'
import { useControlProps } from '../__builtins__'
import { useNativeFeedback } from '../__builtins__/feedback'
import { PreviewText } from '../preview-text'

interface SelectControlProps extends SelectProps {
  fieldValidating?: boolean
}

const SelectControl = forwardRef<ComponentRef<typeof AntdSelect>, SelectControlProps>(({ fieldValidating, ...props }, ref) => {
  const { hasFeedback } = useNativeFeedback()
  const suffixIcon = fieldValidating && !hasFeedback
    ? (
        <>
          {props.suffixIcon}
          <LoadingOutlined />
        </>
      )
    : props.suffixIcon
  return <AntdSelect {...useControlProps(props)} suffixIcon={suffixIcon} style={{ width: '100%', ...props.style }} ref={ref} />
})
export const Select = connect(
  SelectControl,
  mapProps((props, field) => {
    const dataSource = field && 'dataSource' in field ? field.dataSource : undefined
    return {
      options: dataSource?.length ? dataSource : props.options ?? dataSource,
      loading: props.loading ?? (field && 'loading' in field ? field.loading : undefined),
      fieldValidating: field && 'validating' in field ? field.validating : undefined,
    }
  }),
  mapReadPretty(PreviewText.Select),
)
export default Select
