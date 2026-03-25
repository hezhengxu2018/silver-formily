import { describe, expect, it } from 'vitest'
import { cloneCalendarValue, formatCalendarValue, normalizeCalendarValue } from '../utils'

describe('calendar utils', () => {
  it('应该按日历类型归一化外部值，并返回新的 Date 实例', () => {
    const firstDate = new Date(2026, 2, 23)
    const secondDate = new Date(2026, 2, 25)
    const thirdDate = new Date(2026, 2, 27)

    const singleValue = normalizeCalendarValue([firstDate, secondDate], 'single')
    const rangeValue = normalizeCalendarValue([firstDate, secondDate, thirdDate], 'range')
    const multipleValue = normalizeCalendarValue(firstDate, 'multiple')

    expect(singleValue).toBeInstanceOf(Date)
    expect(singleValue).not.toBe(firstDate)
    expect((singleValue as Date).getTime()).toBe(firstDate.getTime())

    expect(rangeValue).toHaveLength(2)
    expect((rangeValue as Date[])[0]).not.toBe(firstDate)
    expect((rangeValue as Date[])[1]).not.toBe(secondDate)
    expect((rangeValue as Date[])[0].getTime()).toBe(firstDate.getTime())
    expect((rangeValue as Date[])[1].getTime()).toBe(secondDate.getTime())

    expect(multipleValue).toHaveLength(1)
    expect((multipleValue as Date[])[0]).not.toBe(firstDate)
    expect((multipleValue as Date[])[0].getTime()).toBe(firstDate.getTime())
  })

  it('应该在克隆规范值时保留 null，并隔离数组/单值引用', () => {
    const singleDate = new Date(2026, 2, 23)
    const multipleDates = [new Date(2026, 2, 23), new Date(2026, 2, 25)]

    const clonedSingle = cloneCalendarValue(singleDate)
    const clonedMultiple = cloneCalendarValue(multipleDates)

    expect(cloneCalendarValue(null)).toBeNull()

    expect(clonedSingle).toBeInstanceOf(Date)
    expect(clonedSingle).not.toBe(singleDate)
    expect((clonedSingle as Date).getTime()).toBe(singleDate.getTime())

    expect(clonedMultiple).toHaveLength(2)
    expect(clonedMultiple).not.toBe(multipleDates)
    expect((clonedMultiple as Date[])[0]).not.toBe(multipleDates[0])
    expect((clonedMultiple as Date[])[1]).not.toBe(multipleDates[1])
  })

  it('应该格式化规范后的日期值', () => {
    const singleValue = new Date(2026, 2, 23)
    const rangeValue = [new Date(2026, 2, 23), new Date(2026, 2, 25)]

    expect(formatCalendarValue(null)).toBe('')
    expect(formatCalendarValue(singleValue)).toBe('2026-03-23')
    expect(formatCalendarValue(rangeValue, 'range')).toBe('2026-03-23 ~ 2026-03-25')
    expect(formatCalendarValue(rangeValue, 'multiple')).toBe('2026-03-23, 2026-03-25')
  })
})
