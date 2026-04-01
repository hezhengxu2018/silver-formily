import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import Rate from '../index'
import 'vant/lib/index.css'

function getRate(container: Element) {
  return container.querySelector('.van-rate')
}

function getRateItems(container: Element) {
  return Array.from(container.querySelectorAll<HTMLElement>('.van-rate__item'))
}

function getCheckedItems(container: Element) {
  return getRateItems(container).filter(item => item.getAttribute('aria-checked') === 'true')
}

function triggerItemClick(item: HTMLElement) {
  item.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }))
}

describe('rate', () => {
  it('应该支持点击更新字段值', async () => {
    const form = createForm()
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field name="score" component={[Rate]} />
      </FormProvider>
    ))

    expect(getRate(container)).not.toBeNull()

    await userEvent.click(getRateItems(container)[2]!)

    await vi.waitFor(() => {
      expect(form.values.score).toBe(3)
    })
  })

  it('应该支持半星回显并响应外部赋值', async () => {
    const form = createForm({
      values: {
        score: 2.5,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="score"
          component={[Rate, {
            allowHalf: true,
          }]}
        />
      </FormProvider>
    ))

    expect(container.querySelector('.van-rate__icon--half')).not.toBeNull()

    form.setValues({
      score: 4,
    })

    await vi.waitFor(() => {
      expect(getCheckedItems(container)).toHaveLength(4)
    })
  })

  it('应该支持 readOnly 命名并阻止继续评分', async () => {
    const form = createForm({
      values: {
        score: 2,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="score"
          component={[Rate, {
            readonly: true,
          }]}
        />
      </FormProvider>
    ))

    expect(getRate(container)).toHaveClass('van-rate--readonly')

    await userEvent.click(getRateItems(container)[4]!)

    await vi.waitFor(() => {
      expect(form.values.score).toBe(2)
    })
  })

  it('应该同步 Field.readOnly 到评分组件并阻止继续评分', async () => {
    const form = createForm({
      values: {
        score: 2,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="score"
          readOnly={true}
          component={[Rate]}
        />
      </FormProvider>
    ))

    expect(getRate(container)).toHaveClass('van-rate--readonly')

    await userEvent.click(getRateItems(container)[4]!)

    await vi.waitFor(() => {
      expect(form.values.score).toBe(2)
    })
  })

  it('应该支持 disabled 状态', async () => {
    const form = createForm({
      values: {
        score: 1,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="score"
          component={[Rate, {
            disabled: true,
          }]}
        />
      </FormProvider>
    ))

    expect(getRate(container)).toHaveClass('van-rate--disabled')

    triggerItemClick(getRateItems(container)[3]!)

    await vi.waitFor(() => {
      expect(form.values.score).toBe(1)
    })
  })

  it('应该同步 Field.disabled 到评分组件并阻止继续评分', async () => {
    const form = createForm({
      values: {
        score: 1,
      },
    })
    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="score"
          disabled={true}
          component={[Rate]}
        />
      </FormProvider>
    ))

    expect(getRate(container)).toHaveClass('van-rate--disabled')

    triggerItemClick(getRateItems(container)[3]!)

    await vi.waitFor(() => {
      expect(form.values.score).toBe(1)
    })
  })
})
