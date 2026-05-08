import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import PreviewText from '../index'
import 'vant/lib/index.css'

describe('previewText.TimePicker', () => {
  it('应该在空值时显示 PreviewText 提供的占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无时间">
        <PreviewText.TimePicker modelValue={null} />
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无时间')
  })

  it('应该在空值时忽略输入态占位符并使用 PreviewText 占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无时间">
        <PreviewText.TimePicker modelValue={null} placeholder="请选择时间" />
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无时间')
  })

  it('应该给 displayFormatter 传入当前值与已选时间选项', async () => {
    const displayFormatter = vi.fn((value, selectedOptions) => {
      expect(value).toBe('10:15')
      expect(selectedOptions).toEqual([
        expect.objectContaining({ text: '10', value: '10' }),
        expect.objectContaining({ text: '15', value: '15' }),
      ])

      selectedOptions[0]!.text = 'changed'

      return '10点15分'
    })

    const { container } = render(() => (
      <PreviewText.TimePicker
        modelValue="10:15"
        displayFormatter={displayFormatter}
      />
    ))

    expect(container.textContent?.trim()).toBe('10点15分')
    expect(displayFormatter).toHaveBeenCalledOnce()
  })
})
