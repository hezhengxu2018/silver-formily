import type { DatePickerProps as AntdDatePickerProps } from 'antd-mobile/es/components/date-picker/date-picker'
import type { PickerValue } from 'antd-mobile/es/components/picker'
import type { QuarterPrecision } from './date-quarter-utils'
import { Picker } from 'antd-mobile'
import { useCallback, useMemo } from 'react'
import { useCreation } from '../__builtins__'
import * as quarterUtils from './date-quarter-utils'

const thisYear = new Date().getFullYear()

export function QuarterDatePicker({
  min = new Date(new Date().setFullYear(thisYear - 10)),
  max = new Date(new Date().setFullYear(thisYear + 10)),
  renderLabel = quarterUtils.defaultRenderLabel as AntdDatePickerProps['renderLabel'],
  ...props
}: AntdDatePickerProps) {
  const pickerValue = useMemo(
    () => quarterUtils.convertDateToStringArray(props.value),
    [props.value],
  )

  const columns = useCallback(
    (selected: PickerValue[]) =>
      quarterUtils.generateDatePickerColumns(
        selected as string[],
        min,
        max,
        props.precision as QuarterPrecision,
        renderLabel as any,
        props.filter,
      ),
    [min, max, props.precision, renderLabel],
  )

  const onConfirm = useCallback((val: PickerValue[]) => {
    props.onConfirm?.(quarterUtils.convertStringArrayToDate(val))
  }, [])

  const onSelect = useCreation(
    () => (val: PickerValue[]) => {
      const date = quarterUtils.convertStringArrayToDate(val)
      props.onSelect?.(date)
    },
    [],
  )

  return (
    <Picker
      columns={columns}
      value={pickerValue}
      onCancel={props.onCancel}
      onClose={props.onClose}
      visible={props.visible}
      confirmText={props.confirmText}
      cancelText={props.cancelText}
      onConfirm={onConfirm}
      onSelect={onSelect}
      getContainer={props.getContainer}
      afterShow={props.afterShow}
      afterClose={props.afterClose}
      onClick={props.onClick}
      title={props.title}
      stopPropagation={props.stopPropagation}
    >
      {(items, actions) =>
        props.children?.(
          items.length === 0
            ? null
            : quarterUtils.convertStringArrayToDate(
                items.map(item => item?.value),
              ),
          actions,
        )}
    </Picker>
  )
}

export default QuarterDatePicker
