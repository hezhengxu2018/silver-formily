import type { InputNumberProps } from 'antd'
import type { ComponentRef, ForwardRefExoticComponent, RefAttributes } from 'react'
import { connect, mapReadPretty } from '@silver-formily/react'
import { InputNumber } from 'antd'
import { forwardRef } from 'react'
import { useControlProps } from '../__builtins__'
import { PreviewText } from '../preview-text'

const NumberControl = forwardRef<ComponentRef<typeof InputNumber>, InputNumberProps<string | number>>((props, ref) => <InputNumber {...useControlProps(props)} ref={ref} />)
export const NumberPicker: ForwardRefExoticComponent<Partial<InputNumberProps<string | number>> & RefAttributes<ComponentRef<typeof InputNumber>>> = connect(NumberControl, mapReadPretty(PreviewText.NumberPicker))
export default NumberPicker
