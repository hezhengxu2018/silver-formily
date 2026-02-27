import type { DatePickerProps } from 'element-plus'

type FormatType = 'format' | 'valueFormat'

export function getDefaultFormat(type: DatePickerProps['type'] = 'date', formatType: FormatType = 'format') {
  if (type === 'week' && formatType === 'format') {
    return '[Week] ww'
  }
  else {
    switch (type) {
      case 'year':
      case 'years':
      case 'yearrange': {
        return 'YYYY'
      }
      case 'month':
      case 'months':
      case 'monthrange': {
        return 'YYYY-MM'
      }
      case 'week': {
        return 'ww'
      }
      case 'date':
      case 'dates':
      case 'daterange': {
        return 'YYYY-MM-DD'
      }
      case 'datetime':
      case 'datetimerange': {
        return 'YYYY-MM-DD HH:mm:ss'
      }
    }
  }
}
