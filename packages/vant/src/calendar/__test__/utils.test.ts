import { describe, expect, it } from 'vitest'
import {
  formatCalendarValue,
  normalizeCalendarValue,
  resolveCalendarBoundaryDates,
  resolveCalendarInnerValue,
  resolveCalendarPlaceholder,
  resolveCalendarSelectedValue,
} from '../utils'

describe('calendar utils', () => {
  it('应该按日历类型把外部字符串值解析为 Vant 需要的 Date 实例', () => {
    const singleValue = resolveCalendarInnerValue(['2026-03-23', '2026-03-25'], 'single')
    const rangeValue = resolveCalendarInnerValue(['2026-03-23', '2026-03-25', '2026-03-27'], 'range')
    const multipleValue = resolveCalendarInnerValue('2026-03-23', 'multiple')

    expect(singleValue).toBeInstanceOf(Date)
    expect((singleValue as Date).getFullYear()).toBe(2026)
    expect((singleValue as Date).getMonth()).toBe(2)
    expect((singleValue as Date).getDate()).toBe(23)

    expect(rangeValue).toHaveLength(2)
    expect((rangeValue as Date[])[0].getDate()).toBe(23)
    expect((rangeValue as Date[])[1].getDate()).toBe(25)

    expect(multipleValue).toHaveLength(1)
    expect((multipleValue as Date[])[0].getDate()).toBe(23)
  })

  it('应该把 Date 内部值格式化为字符串模型值', () => {
    const singleDate = new Date(2026, 2, 23)
    const rangeDates = [new Date(2026, 2, 23), new Date(2026, 2, 25)]

    expect(normalizeCalendarValue(singleDate as any)).toBe('2026-03-23')
    expect(normalizeCalendarValue(rangeDates as any, 'range')).toEqual(['2026-03-23', '2026-03-25'])
    expect(normalizeCalendarValue(singleDate as any, 'single', { valueFormat: 'DD/MM/YYYY' })).toBe('23/03/2026')
  })

  it('应该在选中事件中保留区间模式的临时选择值', () => {
    const selectedDate = new Date(2026, 2, 23)

    expect(resolveCalendarSelectedValue([selectedDate], 'range')).toEqual(['2026-03-23'])
    expect(resolveCalendarSelectedValue([selectedDate], 'range', { valueFormat: 'DD/MM/YYYY' })).toEqual(['23/03/2026'])
  })

  it('应该按 valueFormat 解析字符串边界日期', () => {
    const { maxDate, minDate } = resolveCalendarBoundaryDates({
      maxDate: '31/03/2026',
      minDate: '01/03/2026',
      valueFormat: 'DD/MM/YYYY',
    })

    expect(minDate).toBeInstanceOf(Date)
    expect(maxDate).toBeInstanceOf(Date)
    expect(minDate?.getFullYear()).toBe(2026)
    expect(minDate?.getMonth()).toBe(2)
    expect(minDate?.getDate()).toBe(1)
    expect(maxDate?.getDate()).toBe(31)
  })

  it('应该格式化规范后的日期值', () => {
    const singleValue = '2026-03-23'
    const rangeValue = ['2026-03-23', '2026-03-25']

    expect(formatCalendarValue(null)).toBe('')
    expect(formatCalendarValue(singleValue)).toBe('2026-03-23')
    expect(formatCalendarValue([])).toBe('')
    expect(formatCalendarValue(rangeValue)).toBe('2026-03-23, 2026-03-25')
    expect(formatCalendarValue(rangeValue, 'range')).toBe('2026-03-23 ~ 2026-03-25')
    expect(formatCalendarValue(rangeValue, 'multiple')).toBe('2026-03-23, 2026-03-25')
    expect(formatCalendarValue('23/03/2026', 'single', {
      format: 'YYYY年MM月DD日',
      valueFormat: 'DD/MM/YYYY',
    })).toBe('2026年03月23日')
  })

  it('应该在非法或不足量的日期值下返回空结果', () => {
    expect(normalizeCalendarValue('invalid' as any)).toBeNull()
    expect(normalizeCalendarValue(['2026-03-23'], 'range')).toBeNull()
    expect(normalizeCalendarValue(['2026-03-23', 'invalid'] as any, 'range')).toBeNull()
  })

  it('应该按类型返回对应的默认占位符', () => {
    expect(resolveCalendarPlaceholder(undefined)).toBe('请选择日期')
    expect(resolveCalendarPlaceholder(undefined, 'range')).toBe('请选择日期范围')
    expect(resolveCalendarPlaceholder('自定义占位', 'range')).toBe('自定义占位')
  })
})
