import type { CheckListItemProps, InputProps, SpaceProps, StepperProps, SwitchProps, TextAreaProps } from 'antd-mobile'
import type { ComponentProps, ReactNode } from 'react'
import type {
  ArrayBaseMixins,
  FormStep,
  ICheckListItemProps,
  ICheckListOption,
  ICheckListPickerProps,
  ICheckListValue,
  IDatePickerProps,
  IFormGridProps,
  IFormStep,
  IFormStepPaneProps,
  IFormStepProps,
  IGridColumnProps,
  IInputProps,
  IPasscodeInputProps,
  IPreviewTextProps,
  ISegmentedProps,
  ISelectorProps,
  ISliderProps,
  ISpaceProps,
  IStepperProps,
  ISwitchProps,
  ITextAreaProps,
  PopupResult,
  useFormStep,
} from '../src'
import { expectTypeOf, it } from 'vitest'
import { ArrayBase, CheckList, DatePicker, PreviewText, Selector } from '../src'

it('exports reusable props and preserves compound component types', () => {
  expectTypeOf<IInputProps>().toEqualTypeOf<InputProps>()
  expectTypeOf<ITextAreaProps>().toEqualTypeOf<TextAreaProps>()
  expectTypeOf<ISwitchProps>().toEqualTypeOf<SwitchProps>()
  expectTypeOf<IStepperProps>().toEqualTypeOf<StepperProps>()
  expectTypeOf<ISpaceProps>().toExtend<SpaceProps>()
  expectTypeOf<ICheckListValue>().toEqualTypeOf<string | number>()
  expectTypeOf<ICheckListItemProps>().toEqualTypeOf<ComponentProps<typeof CheckList.Item>>()
  expectTypeOf<ICheckListItemProps>().toEqualTypeOf<CheckListItemProps>()
  expectTypeOf<IFormGridProps['children']>().toEqualTypeOf<ReactNode>()
  expectTypeOf<IGridColumnProps['children']>().toEqualTypeOf<ReactNode>()
  expectTypeOf<ArrayBaseMixins['Remove']>().toEqualTypeOf<typeof ArrayBase.Remove>()
  expectTypeOf<IPreviewTextProps>().not.toBeAny()
  expectTypeOf<ReturnType<typeof PreviewText.usePlaceholder>>().not.toBeAny()
})

it('preserves selector generics and rejects invalid component props', () => {
  // Type-check JSX without mounting components or calling hooks.
  if (false) {
    const selector = (
      <Selector
        options={[{ value: 1 }]}
        onChange={(values) => {
          expectTypeOf(values).toExtend<number[]>()
          expectTypeOf<typeof values[number]>().not.toBeAny()
        }}
      />
    )
    const preview = <PreviewText.Selector<number> options={[{ value: 1 }]} value={[1]} />
    const date: IDatePickerProps = { value: new Date(), onChange: value => expectTypeOf(value).toEqualTypeOf<string>() }
    const dateElement = <DatePicker {...date} />
    const option: ICheckListOption = { label: <span>One</span>, value: 1, description: 'description' }
    const checklist = <CheckList options={['one', 2, option]} />
    const remove = <ArrayBase.Remove onClick={event => expectTypeOf(event.currentTarget).toEqualTypeOf<EventTarget & HTMLSpanElement>()} />
    // @ts-expect-error selector values must match the explicit generic
    const badSelector = <Selector<number> options={[{ value: 'one' }]} />
    // @ts-expect-error selector values cannot be booleans
    const badProps: ISelectorProps<boolean> = { options: [] }
    // @ts-expect-error arbitrary objects are not displayable React nodes
    const badPreview = <PreviewText value={{ arbitrary: true }} />
    // @ts-expect-error Item does not support the parent's options prop
    const badItem = <CheckList.Item value={1} options={[]} />
    void [selector, preview, dateElement, checklist, remove, badSelector, badProps, badPreview, badItem]
  }
})

it('infers popup results from optional confirmation callbacks', () => {
  function _Content(_props: { onConfirm?: (value: number) => void }) {
    return null
  }
  function _NoCallback(_props: { title: string }) {
    return null
  }
  expectTypeOf<PopupResult<typeof _Content>>().toEqualTypeOf<number>()
  expectTypeOf<PopupResult<typeof _NoCallback>>().toBeUnknown()
})

it('exports input control props with upstream value contracts', () => {
  expectTypeOf<IPasscodeInputProps['value']>().toEqualTypeOf<string | undefined>()
  expectTypeOf<ISliderProps['value']>().toEqualTypeOf<number | [number, number] | undefined>()
  expectTypeOf<NonNullable<ISegmentedProps['onChange']>>().parameter(0).toEqualTypeOf<string | number>()
})

it('exports CheckListPicker value and callback types', () => {
  expectTypeOf<ICheckListPickerProps['value']>().toEqualTypeOf<(string | number)[] | undefined>()
  expectTypeOf<NonNullable<ICheckListPickerProps['onConfirm']>>().toEqualTypeOf<(value: (string | number)[]) => void>()
})

it('exports FormStep props and controller types', () => {
  expectTypeOf<ReturnType<typeof FormStep.createFormStep>>().toEqualTypeOf<IFormStep>()
  expectTypeOf<ReturnType<typeof useFormStep>>().toEqualTypeOf<IFormStep>()
  expectTypeOf<IFormStepPaneProps>().toEqualTypeOf<Parameters<typeof FormStep.StepPane>[0]>()
  expectTypeOf<IFormStepProps['current']>().toEqualTypeOf<number | undefined>()
})
