import { expect, it } from 'vitest'
import { getValidateFormats, validate } from '../'

it.each([
  'https://münchen.de/',
  'http://例子.中国/',
  'https://silver.中国/',
  'https://xn--mnchen-3ya.de/',
  'https://xn--fsqu00a.xn--fiqs8s/',
  'https://silver.xn--fiqs8s/',
  'https://a--b.com/',
  'https://a---b.com/',
  '//例子.中国/',
  'ftp://münchen.de/file',
])('accepts internationalized and hyphenated URL %s', async (url) => {
  const format = getValidateFormats().url
  expect(typeof format === 'function' && format(url)).toBe(true)
  expect((await validate(url, { format: 'url' })).error).toEqual([])
})

it.each([
  'https://-example.com/',
  'https://example-.com/',
  'https://a--.com/',
  'https://example..com/',
  'https://example.c/',
  'https://example.123/',
  'https://example.c0m/',
  'https://example.co-m/',
  'https://example.xn--/',
  'https://example.xn--fiqs8s-/',
  'https://127.0.0.1/',
  'https://192.168.1.1/',
  'file://example.com/',
])('rejects invalid or unsupported URL %s', async (url) => {
  const format = getValidateFormats().url
  expect(typeof format === 'function' && format(url)).toBe(false)
  expect((await validate(url, { format: 'url' })).error).toHaveLength(1)
})
