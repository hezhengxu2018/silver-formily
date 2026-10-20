import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { FormLayout, Space } from '../src'

afterEach(cleanup)

it.each([
  { size: undefined, gap: 8 },
  { size: 'small', gap: 8 },
  { size: 'middle', gap: 16 },
  { size: 'large', gap: 24 },
  { size: 12, gap: 12 },
  { size: 0, gap: 0 },
] as const)('keeps Space size=$size independent while inheriting direction', async ({ size, gap }) => {
  const { container } = await render(
    <FormLayout layout="vertical">
      <Space size={size}>
        <div style={{ width: 20, height: 20 }}>A</div>
        <div style={{ width: 20, height: 20 }}>B</div>
      </Space>
    </FormLayout>,
  )
  const [first, second] = Array.from(container.querySelectorAll('.adm-space-item')).map(item => item.getBoundingClientRect())
  expect(second.top - first.bottom).toBe(gap)
  expect(second.left).toBe(first.left)
})
