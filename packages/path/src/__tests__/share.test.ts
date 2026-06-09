import { expect, it } from 'vitest'
import { isAssignable, isEqual } from '../shared'

it('isAssignable', () => {
  expect(isAssignable({})).toBeTruthy()
  expect(isAssignable(() => {})).toBeTruthy()

  expect(isAssignable(1)).toBeFalsy()
  expect(isAssignable('str')).toBeFalsy()
})

it('isEqual', () => {
  const sameObj = {}
  const sameArray: unknown[] = []
  expect(isEqual('string', 'string')).toBeTruthy()
  expect(isEqual(123, 123)).toBeTruthy()
  expect(isEqual(undefined, undefined)).toBeTruthy()
  expect(isEqual(null, null)).toBeTruthy()

  expect(isEqual(sameObj, sameObj)).toBeTruthy()
  expect(isEqual(sameArray, sameArray)).toBeTruthy()

  expect(isEqual([1, '123'], [1, '123'])).toBeTruthy()
  expect(
    isEqual([1, '123', { a: 1, b: 2 }], [1, '123', { a: 1, b: 2 }]),
  ).toBeTruthy()
  expect(
    isEqual([1, '123', { a: 1, b: 2 }], [1, '123', { a: 1, b: 3 }]),
  ).toBeFalsy()
  expect(isEqual([1, '123'], [1, '234'])).toBeFalsy()
  expect(isEqual([], [1])).toBeFalsy()
  expect(isEqual([], {})).toBeFalsy()

  expect(isEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] })).toBeTruthy()
  expect(isEqual({ a: [1, 2, 3] }, { a: [1, 2, 4] })).toBeFalsy()
  expect(isEqual({ a: 1 }, { a: 11 })).toBeFalsy()
  expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBeFalsy()

  const b = Object.create({ name: '123' }) as { age: string }
  b.age = '234'
  expect(isEqual({ name: '123' }, b)).toBeFalsy()

  expect(isEqual(Number.NaN, Number.NaN)).toBeTruthy()
})
