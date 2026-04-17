import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { userEvent } from 'vitest/browser'
import FCascader from '../cascader.vue'
import 'vant/lib/index.css'

const options = [
  {
    text: '浙江',
    value: 'zj',
    children: [
      {
        text: '杭州',
        value: 'hz',
        children: [{ text: '西湖区', value: 'xh' }],
      },
    ],
  },
  {
    text: '江苏',
    value: 'js',
    children: [{ text: '南京', value: 'nj' }],
  },
]

function getTrigger(container: Element) {
  return container.querySelector<HTMLInputElement>('input.van-field__control')!
}

function getVisibleOption(text: string) {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-cascader__option')).find((el) => {
    return el.textContent?.trim() === text
  })
}

describe('field + f-cascader', () => {
  it('can drill down', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field name="region" component={[FCascader, { options }]} />
      </FormProvider>
    ))

    await userEvent.click(getTrigger(container))

    await vi.waitFor(() => {
      expect(getVisibleOption('浙江')).toBeTruthy()
    })

    await userEvent.click(getVisibleOption('浙江')!)

    await vi.waitFor(() => {
      expect(getVisibleOption('杭州')).toBeTruthy()
    })
  })
})
