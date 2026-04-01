import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import Rate from '../../rate'
import PreviewText from '../index'
import 'vant/lib/index.css'

describe('previewText.Rate', () => {
  it('应该在 readPretty 模式下显示只读评分', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="score"
          initialValue={3}
          readPretty={true}
          component={[Rate]}
        />
      </FormProvider>
    ))

    expect(container.querySelector('.van-rate')).toHaveClass('van-rate--readonly')
    expect(container.querySelector('.van-rate')).not.toHaveClass('van-rate--disabled')
  })

  it('应该透传评分属性到阅读态组件', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="score"
          initialValue={2}
          readPretty={true}
          component={[Rate, {
            allowHalf: true,
            count: 3,
          }]}
        />
      </FormProvider>
    ))

    expect(container.querySelectorAll('.van-rate__item')).toHaveLength(3)
  })

  it('应该在空值时显示 PreviewText 提供的占位符', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无评分">
        <FormProvider form={createForm()}>
          <Field
            name="score"
            initialValue={undefined}
            readPretty={true}
            component={[Rate]}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无评分')
    expect(container.querySelector('.van-rate')).toBeNull()
  })

  it('应该在非数字值时显示占位符而不伪造成 0 分', async () => {
    const { container } = render(() => (
      <PreviewText placeholder="暂无评分">
        <FormProvider form={createForm()}>
          <Field
            name="score"
            initialValue={Number.NaN}
            readPretty={true}
            component={[Rate]}
          />
        </FormProvider>
      </PreviewText>
    ))

    expect(container.textContent?.trim()).toBe('暂无评分')
    expect(container.querySelector('.van-rate')).toBeNull()
  })

  it('应该保留真实 0 分的只读评分展示', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="score"
          initialValue={0}
          readPretty={true}
          component={[Rate]}
        />
      </FormProvider>
    ))

    expect(container.querySelector('.van-rate')).toHaveClass('van-rate--readonly')
    expect(container.querySelectorAll('.van-rate__item')).toHaveLength(5)
  })
})
