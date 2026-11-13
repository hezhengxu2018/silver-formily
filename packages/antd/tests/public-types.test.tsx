import type { Dayjs } from 'dayjs'
import type { IFormGridProps, IFormItemProps, IFormLayoutProps, IPreviewTextProps } from '../src'
import { expectTypeOf, it } from 'vitest'
import { AutoComplete, Checkbox, DatePicker, Mentions, OTP, Password, Slider, TimePicker, Transfer, TreeSelect, Upload } from '../src'

it('does not expose prefixCls on wrapper props', () => {
  expectTypeOf<'prefixCls'>().not.toExtend<keyof IFormItemProps>()
  expectTypeOf<'prefixCls'>().not.toExtend<keyof IFormLayoutProps>()
  expectTypeOf<'prefixCls'>().not.toExtend<keyof IFormGridProps>()
  expectTypeOf<'prefixCls'>().not.toExtend<keyof IPreviewTextProps>()
})

// These callbacks exercise generic inference and discriminated native props.
// They are type-checked without mounting controls or invoking callbacks.
it('retains native generic value and event signatures', () => {
  const controls = [
    <AutoComplete<string, { value: string, label: string, detail: number }>
      options={[{ value: 'a', label: 'A', detail: 1 }]}
      onSelect={(value, option) => {
        expectTypeOf(value).toEqualTypeOf<string>()
        expectTypeOf(option.detail).toEqualTypeOf<number>()
      }}
    />,
    <Mentions onChange={(value) => {
      expectTypeOf(value).toEqualTypeOf<string>()
    }}
    />,
    <OTP
      onChange={(value) => {
        expectTypeOf(value).toEqualTypeOf<string>()
      }}
      onInput={(value) => {
        expectTypeOf(value).toEqualTypeOf<string[]>()
      }}
    />,
    <DatePicker
      multiple
      onChange={(values) => {
        expectTypeOf(values).toEqualTypeOf<Dayjs[] | null>()
      }}
    />,
    <Checkbox.Group<number>
      options={[{ label: 'Zero', value: 0 }]}
      onChange={(values) => {
        expectTypeOf(values).toEqualTypeOf<number[]>()
      }}
    />,
    <Slider
      range
      onChange={(values) => {
        expectTypeOf(values).toEqualTypeOf<number[]>()
      }}
    />,
    <Upload<{ url: string }> onChange={(info) => {
      expectTypeOf(info.file.response).toEqualTypeOf<{ url: string } | undefined>()
    }}
    />,
    <Transfer<{ key: string, title: string, detail: number }> render={(item) => {
      expectTypeOf(item.detail).toEqualTypeOf<number>()
      return item.title
    }}
    />,
    <TreeSelect<number> onChange={(value) => {
      expectTypeOf(value).toEqualTypeOf<number>()
    }}
    />,
    // @ts-expect-error Native date values must be Dayjs, not serialized strings.
    <TimePicker value="09:00" />,
    // @ts-expect-error The standalone password wrapper has no legacy strength API.
    <Password checkStrength />,
  ]
  expectTypeOf(controls).toBeArray()
})
