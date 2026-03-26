import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import PreviewText from '../index'
import 'vant/lib/index.css'

describe('previewText.Calendar', () => {
  it('应该在空值时显示 PreviewText 提供的占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无日期">
        <PreviewText.Calendar modelValue={null} />
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无日期')
  })

  it('应该在空值时优先使用组件自身占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无日期">
        <PreviewText.Calendar modelValue={null} placeholder="请选择日期" />
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('请选择日期')
  })

  it('应该支持自定义 displayFormatter，并传入克隆后的值', async () => {
    const startDate = new Date(2026, 2, 23)
    const endDate = new Date(2026, 2, 25)
    const modelValue = [startDate, endDate]
    const displayFormatter = vi.fn((value, type) => {
      expect(type).toBe('range')
      expect(Array.isArray(value)).toBe(true)
      expect(value).not.toBe(modelValue)
      expect((value as Date[])[0]).not.toBe(startDate)
      expect((value as Date[])[1]).not.toBe(endDate)

      ;(value as Date[])[0].setDate(1)

      return '2026-03-23 ~ 2026-03-25'
    })

    const { container } = render(() => (
      <PreviewText.Calendar
        modelValue={modelValue}
        type="range"
        displayFormatter={displayFormatter}
      />
    ))

    expect(container.textContent?.trim()).toBe('2026-03-23 ~ 2026-03-25')
    expect(displayFormatter).toHaveBeenCalledOnce()
    expect(startDate.getDate()).toBe(23)
    expect(endDate.getDate()).toBe(25)
  })
})
