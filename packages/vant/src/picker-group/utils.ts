import type { PickerFieldNames, PickerOption } from '../picker/types'
import type {
  PickerGroupDataSource,
  PickerGroupModelValue,
  PickerGroupResolvedValue,
  PickerGroupValueItem,
} from './types'
import { isValid } from '@formily/shared'
import {
  findPickerOptionByValue,
  normalizePickerColumns,
} from '../picker/utils'

type NormalizedPickerGroupOptions = Parameters<typeof findPickerOptionByValue>[0]

interface NormalizedPickerGroupItem {
  title: string
  options: NormalizedPickerGroupOptions
}

function isNormalizedSingleColumn(
  value: ReturnType<typeof normalizePickerColumns>,
): value is NormalizedPickerGroupOptions {
  return Array.isArray(value) && (value.length === 0 || !Array.isArray(value[0]))
}

function normalizePickerGroupDataSource(
  dataSource: PickerGroupDataSource | undefined,
  fieldNames?: PickerFieldNames,
): NormalizedPickerGroupItem[] {
  if (!Array.isArray(dataSource))
    return []

  return dataSource.map((item) => {
    const normalizedOptions = normalizePickerColumns(item.options ?? [], fieldNames)

    return {
      title: String(item.title ?? ''),
      options: isNormalizedSingleColumn(normalizedOptions)
        ? normalizedOptions
        : [],
    }
  })
}

function formatPickerGroupValueItem(value: PickerGroupValueItem) {
  if (Array.isArray(value)) {
    return value
      .filter(isValid)
      .map(item => String(item))
      .join(' ')
  }

  return isValid(value)
    ? String(value)
    : ''
}

function normalizePickerGroupValue(modelValue: PickerGroupModelValue): PickerGroupValueItem[] {
  return Array.isArray(modelValue)
    ? modelValue
        .reduce<PickerGroupValueItem[]>((values, item) => {
          if (Array.isArray(item)) {
            values.push([...item])
          }
          else if (isValid(item)) {
            values.push(item)
          }

          return values
        }, [])
    : []
}

export function clonePickerGroupValue(value: PickerGroupResolvedValue): PickerGroupResolvedValue {
  return value
    ? value.map(item => Array.isArray(item) ? [...item] : item)
    : null
}

export function resolvePickerGroupTabs(
  dataSource: PickerGroupDataSource | undefined,
  fieldNames?: PickerFieldNames,
) {
  return normalizePickerGroupDataSource(dataSource, fieldNames).map(item => item.title)
}

function resolvePickerGroupSelectedOptions(
  modelValue: PickerGroupModelValue,
  dataSource: PickerGroupDataSource | undefined,
  fieldNames?: PickerFieldNames,
): Array<PickerOption | undefined> {
  const selectedValues = normalizePickerGroupValue(modelValue)
  const normalizedDataSource = normalizePickerGroupDataSource(dataSource, fieldNames)

  return normalizedDataSource.map((item, index) => {
    const selectedValue = selectedValues[index]
    const matchedOption = findPickerOptionByValue(
      item.options,
      Array.isArray(selectedValue) ? undefined : selectedValue,
    )

    return matchedOption
  })
}

export function resolvePickerGroupModelValue(modelValue: PickerGroupModelValue): PickerGroupResolvedValue {
  const selectedValues = normalizePickerGroupValue(modelValue)

  return selectedValues.length
    ? [...selectedValues]
    : null
}

export function resolvePickerGroupSlotInnerValue(
  modelValue: PickerGroupModelValue,
  tabCount: number,
): Array<PickerGroupValueItem | undefined> {
  const currentValues = Array.isArray(modelValue)
    ? modelValue
    : []

  return Array.from({ length: tabCount }, (_, index) => {
    const currentValue = currentValues[index]

    if (Array.isArray(currentValue))
      return [...currentValue]

    return isValid(currentValue)
      ? currentValue
      : undefined
  })
}

export function formatPickerGroupDisplay(
  modelValue: PickerGroupModelValue,
  dataSource: PickerGroupDataSource | undefined,
  fieldNames?: PickerFieldNames,
  separator = ' / ',
) {
  return resolvePickerGroupSelectedOptions(modelValue, dataSource, fieldNames)
    .map((option) => {
      if (!option)
        return undefined

      return isValid(option.text)
        ? option.text
        : option.value
    })
    .filter(isValid)
    .join(separator)
    || normalizePickerGroupValue(modelValue)
      .map(formatPickerGroupValueItem)
      .filter(Boolean)
      .join(separator)
}
