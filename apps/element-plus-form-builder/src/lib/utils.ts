import type { ClassValue } from 'clsx'

import { clsx } from 'clsx'
import bem from 'easy-bem'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const stylePrefix = 'epd'

export function createNamespace(name: string) {
  const prefixCls = `${stylePrefix}-${name}`

  return {
    prefixCls,
    b: bem(prefixCls),
  }
}
