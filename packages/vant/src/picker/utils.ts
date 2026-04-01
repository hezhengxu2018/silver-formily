import type { TreeFieldNames } from '../__builtins__'
import type {
  PickerColumn,
  PickerColumns,
  PickerColumnsType,
  PickerFieldNames,
  PickerModelValue,
  PickerOption,
  PickerOptionLike,
  PickerOptionValue,
  PickerResolvedValue,
} from './types'
import { isPlainObj, isValid } from '@formily/shared'
import { clone } from 'es-toolkit'
import { resolveTreeFieldNames } from '../__builtins__'

type NormalizedPickerOption = Omit<PickerOption, 'children' | 'label' | 'name' | 'text' | 'value'> & {
  children?: NormalizedPickerColumn
  text: any
  value: PickerOptionValue
}

type NormalizedPickerColumn = NormalizedPickerOption[]

type NormalizedPickerColumns = NormalizedPickerColumn | NormalizedPickerColumn[]

function isPickerOptionObject(option: PickerOptionLike): option is PickerOption {
  return isPlainObj(option)
}

function resolvePickerOptionValue(option: PickerOptionLike, fields: Required<TreeFieldNames>): PickerOptionValue {
  if (!isPickerOptionObject(option))
    return option

  if (isValid(option[fields.value]))
    return option[fields.value] as PickerOptionValue

  if (isValid(option.value))
    return option.value

  if (isValid(option.name))
    return option.name

  if (isValid(option[fields.text]))
    return option[fields.text] as PickerOptionValue

  if (isValid(option.text))
    return option.text as PickerOptionValue

  if (isValid(option.label))
    return option.label as PickerOptionValue

  return option as unknown as PickerOptionValue
}

function resolvePickerOptionText(option: PickerOptionLike, value: PickerOptionValue, fields: Required<TreeFieldNames>) {
  if (!isPickerOptionObject(option))
    return option

  if (isValid(option[fields.text]))
    return option[fields.text]

  if (isValid(option.text))
    return option.text

  if (isValid(option.label))
    return option.label

  return value
}

function normalizePickerOption(option: PickerOptionLike, fields: Required<TreeFieldNames>): NormalizedPickerOption {
  const value = resolvePickerOptionValue(option, fields)
  const text = resolvePickerOptionText(option, value, fields)

  if (!isPickerOptionObject(option)) {
    return {
      text,
      value,
    }
  }

  const rawChildren = option[fields.children] ?? option.children

  return {
    ...option,
    children: Array.isArray(rawChildren) ? rawChildren.map(child => normalizePickerOption(child, fields)) : undefined,
    text,
    value,
  }
}

function normalizePickerColumn(column: PickerColumn, fields: Required<TreeFieldNames>): NormalizedPickerColumn {
  return column.map(option => normalizePickerOption(option, fields))
}

function isMultipleColumns(columns: PickerColumns | undefined): columns is PickerColumn[] {
  return Array.isArray(columns) && Array.isArray(columns[0])
}

function getColumnsTypeFromNormalized(columns: NormalizedPickerColumns | undefined): PickerColumnsType {
  if (!columns || !Array.isArray(columns) || columns.length === 0)
    return 'default'

  if (Array.isArray(columns[0]))
    return 'multiple'

  return columns.some(option => Array.isArray(option.children) && option.children.length > 0)
    ? 'cascade'
    : 'default'
}

export function assignPickerFieldNames(fieldNames?: PickerFieldNames): Required<TreeFieldNames> {
  return resolveTreeFieldNames(fieldNames)
}

export function normalizePickerColumns(columns: PickerColumns | undefined, fieldNames?: PickerFieldNames): NormalizedPickerColumns {
  const fields = assignPickerFieldNames(fieldNames)

  if (!Array.isArray(columns))
    return []

  if (isMultipleColumns(columns))
    return columns.map(column => normalizePickerColumn(column, fields))

  return normalizePickerColumn(columns, fields)
}

export function getPickerColumnsType(columns: PickerColumns | undefined, fieldNames?: PickerFieldNames): PickerColumnsType {
  return getColumnsTypeFromNormalized(normalizePickerColumns(columns, fieldNames))
}

export function normalizePickerValue(modelValue: PickerModelValue): PickerOptionValue[] {
  if (Array.isArray(modelValue))
    return modelValue.filter(isValid) as PickerOptionValue[]

  return isValid(modelValue)
    ? [modelValue]
    : []
}

export function getFirstEnabledPickerOption(options: NormalizedPickerColumn) {
  return options.find(option => !option.disabled)
}

export function findPickerOptionByValue(options: NormalizedPickerColumn, value: PickerOptionValue | undefined) {
  return options.find(option => option.value === value && !option.disabled)
}

export function resolvePickerCurrentColumns(
  columns: PickerColumns | undefined,
  modelValue: PickerModelValue,
  fieldNames?: PickerFieldNames,
): NormalizedPickerColumn[] {
  const normalizedColumns = normalizePickerColumns(columns, fieldNames)
  const columnsType = getColumnsTypeFromNormalized(normalizedColumns)
  const selectedValues = normalizePickerValue(modelValue)

  if (columnsType === 'multiple')
    return normalizedColumns as NormalizedPickerColumn[]

  if (columnsType === 'default')
    return [normalizedColumns as NormalizedPickerColumn]

  const result: NormalizedPickerColumn[] = []
  let currentColumn = normalizedColumns as NormalizedPickerColumn
  let columnIndex = 0

  while (currentColumn.length) {
    result.push(currentColumn)

    const selectedOption = findPickerOptionByValue(currentColumn, selectedValues[columnIndex])
    currentColumn = selectedOption?.children ?? []
    columnIndex += 1
  }

  return result
}

export function resolvePickerSelectedOptions(
  modelValue: PickerModelValue,
  columns: PickerColumns | undefined,
  fieldNames?: PickerFieldNames,
): Array<PickerOption | undefined> {
  const selectedValues = normalizePickerValue(modelValue)
  const currentColumns = resolvePickerCurrentColumns(columns, modelValue, fieldNames)

  return currentColumns.map((options, index) => {
    const matchedOption = findPickerOptionByValue(options, selectedValues[index])

    return matchedOption
      ? clone(matchedOption)
      : undefined
  })
}

export function resolvePickerSelectedIndexes(
  modelValue: PickerModelValue,
  columns: PickerColumns | undefined,
  fieldNames?: PickerFieldNames,
) {
  const selectedValues = normalizePickerValue(modelValue)
  const currentColumns = resolvePickerCurrentColumns(columns, modelValue, fieldNames)

  return currentColumns.map((options, index) => {
    return options.findIndex(option => option.value === selectedValues[index])
  })
}

export function resolvePickerModelValue(
  modelValue: PickerModelValue,
  columns: PickerColumns | undefined,
  fieldNames?: PickerFieldNames,
): PickerResolvedValue {
  const selectedValues = normalizePickerValue(modelValue)
  const columnsType = getPickerColumnsType(columns, fieldNames)

  if (!selectedValues.length)
    return null

  if (columnsType === 'default')
    return selectedValues[0] ?? null

  return [...selectedValues]
}

export function resolvePickerInnerValue(
  modelValue: PickerModelValue,
  columns: PickerColumns | undefined,
  fieldNames?: PickerFieldNames,
) {
  const normalizedColumns = normalizePickerColumns(columns, fieldNames)
  const columnsType = getColumnsTypeFromNormalized(normalizedColumns)
  const currentValues = normalizePickerValue(modelValue)

  if (columnsType === 'multiple') {
    return (normalizedColumns as NormalizedPickerColumn[]).flatMap((options, index) => {
      const matchedOption = findPickerOptionByValue(options, currentValues[index]) ?? getFirstEnabledPickerOption(options)
      return matchedOption ? [matchedOption.value] : []
    })
  }

  if (columnsType === 'default') {
    const options = normalizedColumns as NormalizedPickerColumn
    const matchedOption = findPickerOptionByValue(options, currentValues[0]) ?? getFirstEnabledPickerOption(options)
    return matchedOption ? [matchedOption.value] : []
  }

  const resolvedValues: PickerOptionValue[] = []
  let currentColumn = normalizedColumns as NormalizedPickerColumn
  let columnIndex = 0

  while (currentColumn.length) {
    const matchedOption = findPickerOptionByValue(currentColumn, currentValues[columnIndex]) ?? getFirstEnabledPickerOption(currentColumn)

    if (!matchedOption)
      break

    resolvedValues.push(matchedOption.value)
    currentColumn = matchedOption.children ?? []
    columnIndex += 1
  }

  return resolvedValues
}

export function formatPickerDisplay(
  modelValue: PickerModelValue,
  columns: PickerColumns | undefined,
  fieldNames?: PickerFieldNames,
  separator = ' / ',
) {
  return resolvePickerSelectedOptions(modelValue, columns, fieldNames)
    .map((option) => {
      if (!option)
        return undefined

      return isValid(option.text)
        ? option.text
        : option.value
    })
    .filter(isValid)
    .join(separator)
}
