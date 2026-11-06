import dayjs from 'dayjs'
import { expect, it } from 'vitest'
import { clone, shallowClone } from '../clone'

it('preserves immutable Dayjs instances instead of calling toJSON', () => {
  const date = dayjs('2026-11-06')
  const values = { date, range: [date, null] }
  const result = clone(values)
  expect(result).not.toBe(values)
  expect(result.range).not.toBe(values.range)
  expect(result.date).toBe(date)
  expect(result.range[0]).toBe(date)
  expect(result.range[1]).toBeNull()
  expect(shallowClone(date)).toBe(date)
  expect(result.date.format('YYYY-MM-DD')).toBe('2026-11-06')
})
