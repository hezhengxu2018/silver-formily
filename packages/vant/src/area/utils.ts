import type { AreaList, PickerOption } from 'vant'
import type { Numeric } from 'vant/es/utils'
import type {
  AreaModelValue,
  AreaResolvedValue,
} from './types'
import { isValid } from '@formily/shared'

const AREA_EMPTY_CODE = '000000'

function makeOption(text = '', value: Numeric = AREA_EMPTY_CODE, children?: PickerOption[]): PickerOption {
  return {
    children,
    text,
    value,
  }
}

function resolveColumnsNum(columnsNum: unknown) {
  const value = Number(columnsNum ?? 3)

  if (Number.isNaN(value))
    return 3

  return Math.min(Math.max(value, 1), 3)
}

function normalizeAreaCode(value: AreaModelValue): AreaResolvedValue {
  if (!isValid(value) || value === '')
    return null

  return String(value)
}

export function formatAreaDataForCascade(
  areaList: AreaList = {} as AreaList,
  columnsNum: unknown = 3,
  columnsPlaceholder: string[] = [],
): PickerOption[] {
  const {
    city_list: city = {},
    county_list: county = {},
    province_list: province = {},
  } = areaList
  const showCity = resolveColumnsNum(columnsNum) > 1
  const showCounty = resolveColumnsNum(columnsNum) > 2
  const getProvinceChildren = () => {
    if (showCity) {
      return columnsPlaceholder.length > 1
        ? [makeOption(columnsPlaceholder[1], AREA_EMPTY_CODE, showCounty ? [] : undefined)]
        : []
    }

    return undefined
  }

  const provinceMap = new Map<string, PickerOption>()

  Object.keys(province).forEach((code) => {
    provinceMap.set(
      code.slice(0, 2),
      makeOption(province[code], code, getProvinceChildren()),
    )
  })

  const cityMap = new Map<string, PickerOption>()

  if (showCity) {
    const getCityChildren = () => {
      if (showCounty) {
        return columnsPlaceholder.length > 2
          ? [makeOption(columnsPlaceholder[2])]
          : []
      }

      return undefined
    }

    Object.keys(city).forEach((code) => {
      const option = makeOption(city[code], code, getCityChildren())

      cityMap.set(code.slice(0, 4), option)
      ;(provinceMap.get(code.slice(0, 2))?.children ?? []).push(option)
    })
  }

  if (showCounty) {
    Object.keys(county).forEach((code) => {
      ;(cityMap.get(code.slice(0, 4))?.children ?? []).push(makeOption(county[code], code))
    })
  }

  const options = Array.from(provinceMap.values())

  if (columnsPlaceholder.length) {
    const countyOptions = showCounty ? [makeOption(columnsPlaceholder[2])] : undefined
    const cityOptions = showCity ? [makeOption(columnsPlaceholder[1], AREA_EMPTY_CODE, countyOptions)] : undefined

    options.unshift(makeOption(columnsPlaceholder[0], AREA_EMPTY_CODE, cityOptions))
  }

  return options
}

export function resolveAreaInnerValue(
  value: AreaModelValue,
  columnsNum: unknown = 3,
): string[] {
  const code = normalizeAreaCode(value)

  if (!code)
    return []

  return [
    `${code.slice(0, 2)}0000`,
    `${code.slice(0, 4)}00`,
    code,
  ].slice(0, resolveColumnsNum(columnsNum))
}

export function resolveAreaModelValue(selectedValues: Numeric[] | undefined): AreaResolvedValue {
  const code = selectedValues?.filter(isValid).at(-1)

  return isValid(code) && code !== ''
    ? String(code)
    : null
}

export function resolveAreaSelectedOptions(
  value: AreaModelValue,
  areaList?: AreaList,
  columnsNum: unknown = 3,
  columnsPlaceholder: string[] = [],
): Array<PickerOption | undefined> {
  const values = resolveAreaInnerValue(value, columnsNum)
  const columns = formatAreaDataForCascade(areaList, columnsNum, columnsPlaceholder)
  const selectedOptions: Array<PickerOption | undefined> = []
  let currentOptions = columns

  for (const code of values) {
    const matchedOption = currentOptions.find(option => option.value === code)

    selectedOptions.push(matchedOption)
    currentOptions = matchedOption?.children ?? []
  }

  return selectedOptions
}

export function formatAreaDisplay(
  value: AreaModelValue,
  areaList?: AreaList,
  columnsNum: unknown = 3,
  columnsPlaceholder: string[] = [],
  separator = ' / ',
) {
  const code = normalizeAreaCode(value)

  if (!code)
    return ''

  const selectedOptions = resolveAreaSelectedOptions(
    code,
    areaList,
    columnsNum,
    columnsPlaceholder,
  )
  const displayText = selectedOptions
    .map(option => option?.text ?? option?.value)
    .filter(isValid)
    .join(separator)

  return displayText || code
}

export function cloneAreaValue(value: AreaModelValue): AreaResolvedValue {
  return normalizeAreaCode(value)
}
