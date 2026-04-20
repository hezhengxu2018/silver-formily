import type { PickerFieldNames, PickerOption } from '../picker/types'
import type {
  PickerGroupDataSource,
  PickerGroupModelValue,
  PickerGroupResolvedValue,
  PickerGroupValueItem,
} from './types'
import { isValid } from '@formily/shared'
import { cloneDeep } from 'es-toolkit/compat'
import {
  findPickerOptionByValue,
  getFirstEnabledPickerOption,
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

export function normalizePickerGroupDataSource(
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

function isPickerGroupValueItem(value: unknown): value is PickerGroupValueItem {
  return Array.isArray(value) || isValid(value)
}

function resolveSinglePickerGroupValue(value: PickerGroupValueItem | undefined) {
  return Array.isArray(value)
    ? undefined
    : value
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

export function normalizePickerGroupValue(modelValue: PickerGroupModelValue): PickerGroupValueItem[] {
  return Array.isArray(modelValue)
    ? modelValue
      .filter(isPickerGroupValueItem)
      .map(item => cloneDeep(item)) as PickerGroupValueItem[]
    : []
}

export function clonePickerGroupValue(value: PickerGroupResolvedValue): PickerGroupResolvedValue {
  return cloneDeep(value)
}

export function resolvePickerGroupTabs(
  dataSource: PickerGroupDataSource | undefined,
  fieldNames?: PickerFieldNames,
) {
  return normalizePickerGroupDataSource(dataSource, fieldNames).map(item => item.title)
}

export function resolvePickerGroupSelectedOptions(
  modelValue: PickerGroupModelValue,
  dataSource: PickerGroupDataSource | undefined,
  fieldNames?: PickerFieldNames,
): Array<PickerOption | undefined> {
  const selectedValues = normalizePickerGroupValue(modelValue)
  const normalizedDataSource = normalizePickerGroupDataSource(dataSource, fieldNames)

  return normalizedDataSource.map((item, index) => {
    const matchedOption = findPickerOptionByValue(
      item.options,
      resolveSinglePickerGroupValue(selectedValues[index]),
    )

    return matchedOption
      ? cloneDeep(matchedOption)
      : undefined
  })
}

export function resolvePickerGroupSelectedIndexes(
  modelValue: PickerGroupModelValue,
  dataSource: PickerGroupDataSource | undefined,
  fieldNames?: PickerFieldNames,
) {
  const selectedValues = normalizePickerGroupValue(modelValue)
  const normalizedDataSource = normalizePickerGroupDataSource(dataSource, fieldNames)

  return normalizedDataSource.map((item, index) => {
    return item.options.findIndex((option) => {
      return option.value === resolveSinglePickerGroupValue(selectedValues[index])
    })
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

    return isPickerGroupValueItem(currentValue)
      ? cloneDeep(currentValue)
      : undefined
  })
}

export function resolvePickerGroupInnerValue(
  modelValue: PickerGroupModelValue,
  dataSource: PickerGroupDataSource | undefined,
  fieldNames?: PickerFieldNames,
) {
  const normalizedDataSource = normalizePickerGroupDataSource(dataSource, fieldNames)
  const currentValues = normalizePickerGroupValue(modelValue)

  return normalizedDataSource.flatMap((item, index) => {
    const matchedOption = findPickerOptionByValue(
      item.options,
      resolveSinglePickerGroupValue(currentValues[index]),
    ) ?? getFirstEnabledPickerOption(item.options)

    return matchedOption
      ? [matchedOption.value]
      : []
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
