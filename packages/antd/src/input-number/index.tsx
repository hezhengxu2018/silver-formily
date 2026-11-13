import type { InputNumberProps } from 'antd'
import type { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react'
import { connect, mapReadPretty } from '@silver-formily/react'
import { InputNumber as AntdInputNumber } from 'antd'
import { forwardRef } from 'react'
import { useControlProps } from '../__builtins__'
import { PreviewText } from '../preview-text'

const NumberControl = forwardRef<ComponentRef<typeof AntdInputNumber>, InputNumberProps<string | number>>((props, ref) => <AntdInputNumber {...useControlProps(props)} ref={ref} />)
export const InputNumber: ForwardRefExoticComponent<Partial<InputNumberProps<string | number>> & RefAttributes<ComponentRef<typeof AntdInputNumber>>> = connect(NumberControl, mapReadPretty(PreviewText.InputNumber))
export default InputNumber
