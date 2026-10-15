import type { SpaceProps } from 'antd-mobile/es/components/space'
import { Space as AntdSpace } from 'antd-mobile'
import React from 'react'
import { useFormLayout } from '../form-layout'

interface ISpaceProps extends SpaceProps {
  size?: 'small' | 'middle' | 'large' | number
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
}

function getNumberSize(size?: ISpaceProps['size'] | 'mini') {
  return typeof size === 'string' ? spaceSize[size as keyof typeof spaceSize] : size || 0
}

export function Space({ direction, size, ...props }: ISpaceProps) {
  const layout = useFormLayout()
  const numberSize = getNumberSize(size ?? layout.size ?? 'small')
  return React.createElement(AntdSpace, {
    direction: direction ?? layout?.layout,
    ...props,
    style: {
      '--gap': `${numberSize}px`,
    },
  })
}

export default Space
