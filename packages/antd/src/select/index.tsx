import type { SelectProps } from 'antd'
import type { ComponentRef } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty } from '@silver-formily/react'
import { Select as AntdSelect } from 'antd'
import { forwardRef } from 'react'
import { useControlProps } from '../__builtins__'
import { PreviewText } from '../preview-text'

const SelectControl = forwardRef<ComponentRef<typeof AntdSelect>, SelectProps>((props, ref) => <AntdSelect {...useControlProps(props)} style={{ width: '100%', ...props.style }} ref={ref} />)
export const Select = connect(
  SelectControl,
  mapProps((props, field) => {
    const dataSource = field && 'dataSource' in field ? field.dataSource : undefined
    return {
      options: dataSource?.length ? dataSource : props.options ?? dataSource,
      loading: props.loading ?? (field && 'loading' in field ? field.loading : undefined),
      suffixIcon: field && 'validating' in field && field.validating ? <LoadingOutlined /> : props.suffixIcon,
    }
  }),
  mapReadPretty(PreviewText.Select),
)
export default Select
