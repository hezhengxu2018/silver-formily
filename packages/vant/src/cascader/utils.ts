import type { TreeFieldNames } from '../__builtins__'
import type {
  CascaderFieldNames,
  CascaderModelValue,
  CascaderOption,
  CascaderOptionValue,
  CascaderResolvedValue,
} from './types'
import { isValid } from '@formily/shared'
import { cloneValue, resolveSelectionPlaceholder, resolveTreeFieldNames } from '../__builtins__'

function isCascaderOptionValue(value: unknown): value is CascaderOptionValue {
  return typeof value === 'string' || typeof value === 'number'
}

function getOptionValue(
  option: CascaderOption,
  fieldNames: Required<TreeFieldNames>,
): CascaderOptionValue | undefined {
  const value = option[fieldNames.value]

  return isCascaderOptionValue(value) ? value : undefined
}

function getOptionText(
  option: CascaderOption,
  fieldNames: Required<TreeFieldNames>,
): string {
  const text = option[fieldNames.text]
  const value = getOptionValue(option, fieldNames)

  if (isValid(text)) {
    return String(text)
  }

  return isValid(value) ? String(value) : ''
}

function getOptionChildren(
  option: CascaderOption,
  fieldNames: Required<TreeFieldNames>,
): CascaderOption[] | undefined {
  const children = option[fieldNames.children]

  return Array.isArray(children)
    ? children as CascaderOption[]
    : undefined
}

function normalizeValueList(value: unknown): CascaderOptionValue[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(isCascaderOptionValue)
}

export function resolveCascaderFieldNames(
  fieldNames?: CascaderFieldNames,
): Required<CascaderFieldNames> {
  return resolveTreeFieldNames(fieldNames) as Required<CascaderFieldNames>
}

export function cloneCascaderValue(value: CascaderResolvedValue): CascaderResolvedValue {
  return cloneValue(value)
}

export function mapSelectedOptionsToValues(
  selectedOptions: CascaderOption[],
  fieldNames?: CascaderFieldNames,
): CascaderResolvedValue {
  const resolvedFieldNames = resolveCascaderFieldNames(fieldNames)
  const values = selectedOptions
    .map(option => getOptionValue(option, resolvedFieldNames))
    .filter(isCascaderOptionValue)

  return values.length ? values : null
}

export function findCascaderPathByLeafValue(
  options: CascaderOption[],
  targetValue: CascaderOptionValue,
  fieldNames?: CascaderFieldNames,
): CascaderOption[] | null {
  const resolvedFieldNames = resolveCascaderFieldNames(fieldNames)

  function walk(currentOptions: CascaderOption[]): CascaderOption[] | null {
    for (const option of currentOptions) {
      if (getOptionValue(option, resolvedFieldNames) === targetValue) {
        return [option]
      }

      const children = getOptionChildren(option, resolvedFieldNames)

      if (!children?.length) {
        continue
      }

      const matchedChildren = walk(children)

      if (matchedChildren) {
        return [option, ...matchedChildren]
      }
    }

    return null
  }

  return walk(options)
}

export function findCascaderPathByValues(
  options: CascaderOption[],
  targetValues: CascaderOptionValue[],
  fieldNames?: CascaderFieldNames,
): CascaderOption[] | null {
  if (!targetValues.length) {
    return null
  }

  const resolvedFieldNames = resolveCascaderFieldNames(fieldNames)
  const matchedOptions: CascaderOption[] = []
  let currentOptions = options

  for (const targetValue of targetValues) {
    const matchedOption = currentOptions.find(option => (
      getOptionValue(option, resolvedFieldNames) === targetValue
    ))

    if (!matchedOption) {
      return null
    }

    matchedOptions.push(matchedOption)
    currentOptions = getOptionChildren(matchedOption, resolvedFieldNames) ?? []
  }

  return matchedOptions
}

export function normalizeCascaderValue(
  value: CascaderModelValue,
  options: CascaderOption[] = [],
  fieldNames?: CascaderFieldNames,
): CascaderResolvedValue {
  const normalizedValues = normalizeValueList(value)

  if (normalizedValues.length) {
    const matchedPath = findCascaderPathByValues(options, normalizedValues, fieldNames)

    return matchedPath
      ? mapSelectedOptionsToValues(matchedPath, fieldNames)
      : [...normalizedValues]
  }

  if (!isCascaderOptionValue(value)) {
    return null
  }

  const matchedPath = findCascaderPathByLeafValue(options, value, fieldNames)

  return matchedPath
    ? mapSelectedOptionsToValues(matchedPath, fieldNames)
    : [value]
}

export function resolveCascaderSelectedOptions(
  value: CascaderResolvedValue,
  options: CascaderOption[] = [],
  fieldNames?: CascaderFieldNames,
): CascaderOption[] {
  if (!value?.length) {
    return []
  }

  const exactPath = findCascaderPathByValues(options, value, fieldNames)

  if (exactPath) {
    return exactPath
  }

  const leafValue = value.at(-1)

  return isCascaderOptionValue(leafValue)
    ? (findCascaderPathByLeafValue(options, leafValue, fieldNames) ?? [])
    : []
}

export function formatCascaderValue(
  value: CascaderResolvedValue,
  selectedOptions: CascaderOption[],
  fieldNames?: CascaderFieldNames,
  separator = ' / ',
): string {
  if (!value?.length) {
    return ''
  }

  if (selectedOptions.length) {
    const resolvedFieldNames = resolveCascaderFieldNames(fieldNames)

    return selectedOptions
      .map(option => getOptionText(option, resolvedFieldNames))
      .join(separator)
  }

  return value.map(item => String(item)).join(separator)
}

export function getCascaderLeafValue(
  value: CascaderModelValue,
  options: CascaderOption[] = [],
  fieldNames?: CascaderFieldNames,
): CascaderOptionValue | undefined {
  return normalizeCascaderValue(value, options, fieldNames)?.at(-1)
}

export function resolveCascaderPlaceholder(placeholder?: string) {
  return resolveSelectionPlaceholder(placeholder)
}
