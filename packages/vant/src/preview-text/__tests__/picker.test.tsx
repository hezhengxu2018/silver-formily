import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import PreviewText from '../index'
import 'vant/lib/index.css'

describe('previewText.Picker', () => {
  it('应该在空值时显示 PreviewText 提供的占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无选项">
        <PreviewText.Picker modelValue={null} />
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无选项')
  })

  it('应该在空值时忽略输入态占位符并使用 PreviewText 占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无选项">
        <PreviewText.Picker modelValue={null} placeholder="请选择内容" />
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无选项')
  })

  it('应该给 displayFormatter 传入克隆后的值与已选选项', async () => {
    const modelValue = ['travel', 'hotel']
    const displayFormatter = vi.fn((value, selectedOptions) => {
      expect(value).toEqual(modelValue)
      expect(value).not.toBe(modelValue)
      expect(selectedOptions.map(option => option?.text)).toEqual(['出行', '酒店'])

      ;(value as string[])[0] = 'changed'

      return '出行 / 酒店'
    })

    const { container } = render(() => (
      <PreviewText.Picker
        modelValue={modelValue}
        columns={[
          [
            { label: '出行', value: 'travel' },
            { label: '酒店', value: 'hotel' },
          ],
          [
            { label: '机票', value: 'flight' },
            { label: '酒店', value: 'hotel' },
          ],
        ]}
        displayFormatter={displayFormatter}
      />
    ))

    expect(container.textContent?.trim()).toBe('出行 / 酒店')
    expect(displayFormatter).toHaveBeenCalledOnce()
    expect(modelValue[0]).toBe('travel')
  })

  it('应该给 displayFormatter 透传克隆后的原始 modelValue', async () => {
    const modelValue = ['hz']
    const displayFormatter = vi.fn((value, selectedOptions) => {
      expect(value).toEqual(modelValue)
      expect(value).not.toBe(modelValue)
      expect(selectedOptions.map(option => option?.text)).toEqual(['杭州'])

      ;(value as string[])[0] = 'changed'

      return '杭州'
    })

    const { container } = render(() => (
      <PreviewText.Picker
        modelValue={modelValue}
        columns={[
          { label: '杭州', value: 'hz' },
          { label: '宁波', value: 'nb' },
        ]}
        displayFormatter={displayFormatter}
      />
    ))

    expect(container.textContent?.trim()).toBe('杭州')
    expect(displayFormatter).toHaveBeenCalledOnce()
    expect(modelValue[0]).toBe('hz')
  })
})
