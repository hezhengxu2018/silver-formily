import type { SpaceProps } from 'antd'
import type { CSSProperties } from 'react'
import type { IFormItemProps } from '../form-item'
import { Space } from 'antd'
import cls from 'clsx'
import { createBem } from '../__builtins__'
import { BaseItem } from '../form-item'
import { FormButtonGroupSticky } from './sticky'
import './style.css'

const b = createBem('form-button-group')

export type { IStickyProps } from './sticky'

export type IFormButtonGroupProps = Omit<SpaceProps, 'align' | 'size'> & {
  align?: CSSProperties['textAlign']
  gutter?: SpaceProps['size']
}
function justify(align: CSSProperties['textAlign']) {
  return align === 'left' || align === 'start' ? 'flex-start' : align === 'right' || align === 'end' ? 'flex-end' : 'center'
}
function ButtonGroup({ align = 'left', gutter, className, style, ...props }: IFormButtonGroupProps) {
  return <Space {...props} size={gutter} className={cls(b(), className)} style={{ justifyContent: justify(align), ...style }} />
}
function ButtonGroupFormItem({ gutter, children, ...props }: IFormItemProps & { gutter?: SpaceProps['size'] }) {
  return <BaseItem {...props} label=" " colon={false} style={{ margin: 0, ...props.style }}><Space size={gutter}>{children}</Space></BaseItem>
}
export const FormButtonGroup = Object.assign(ButtonGroup, { FormItem: ButtonGroupFormItem, Sticky: FormButtonGroupSticky })
export default FormButtonGroup
