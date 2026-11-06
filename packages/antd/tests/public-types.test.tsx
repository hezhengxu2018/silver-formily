import type { IFormGridProps, IFormItemProps, IFormLayoutProps, IPreviewTextProps } from '../src'
import { expectTypeOf, it } from 'vitest'

it('does not expose prefixCls on wrapper props', () => {
  expectTypeOf<'prefixCls'>().not.toExtend<keyof IFormItemProps>()
  expectTypeOf<'prefixCls'>().not.toExtend<keyof IFormLayoutProps>()
  expectTypeOf<'prefixCls'>().not.toExtend<keyof IFormGridProps>()
  expectTypeOf<'prefixCls'>().not.toExtend<keyof IPreviewTextProps>()
})
