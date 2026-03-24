import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { Form } from '../../form'
import { FormButtonGroup } from '../../form-button-group'
import FormItem from '../../form-item'
import { Input } from '../../input'
import { Reset } from '../../reset'
import { Submit } from '../../submit'
import 'vant/lib/index.css'

describe('form-button-group', () => {
  it('应该支持垂直与水平布局类名', async () => {
    render(() => (
      <>
        <FormButtonGroup>
          <Submit />
          <Reset />
        </FormButtonGroup>
        <FormButtonGroup layout="horizontal">
          <Submit />
          <Reset />
        </FormButtonGroup>
      </>
    ))

    const groups = Array.from(document.querySelectorAll('.silver-formily-vant-form-button-group'))
    expect(groups).toHaveLength(2)
    expect(groups[0]?.className).toContain('silver-formily-vant-form-button-group--vertical')
    expect(groups[1]?.className).toContain('silver-formily-vant-form-button-group--horizontal')
  })

  it('应该在紧凑布局下渲染 ActionBar 样式按钮', async () => {
    render(() => (
      <FormButtonGroup layout="compact">
        <Reset />
        <Submit />
      </FormButtonGroup>
    ))

    expect(document.querySelector('.van-action-bar')).not.toBeNull()
    expect(document.querySelectorAll('.van-action-bar-button')).toHaveLength(2)
    expect(document.querySelector('.van-action-bar-button--default')?.textContent).toContain('重置')
    expect(document.querySelector('.van-action-bar-button--primary')?.textContent).toContain('提交')

    const resetButton = document.querySelector('.van-action-bar-button--default') as HTMLElement | null
    expect(resetButton).not.toBeNull()
    const style = window.getComputedStyle(resetButton!)
    expect(style.borderTopStyle).toBe('solid')
    expect(style.borderTopWidth).not.toBe('0px')
    expect(style.borderTopColor).toBe(style.color)
  })

  it('应该允许在紧凑布局下覆盖默认按钮类型', async () => {
    render(() => (
      <FormButtonGroup layout="compact">
        <Reset type="success" />
        <Submit type="danger" />
      </FormButtonGroup>
    ))

    expect(document.querySelector('.van-action-bar-button--success')?.textContent).toContain('重置')
    expect(document.querySelector('.van-action-bar-button--danger')?.textContent).toContain('提交')
  })

  it('应该在紧凑布局下支持 Submit 原生提交流程', async () => {
    const onAutoSubmit = vi.fn()
    const form = createForm({
      values: {
        keyword: 'silver-formily',
      },
    })

    const { getByRole } = render(() => (
      <Form form={form} onAutoSubmit={onAutoSubmit}>
        <Field
          name="keyword"
          title="关键词"
          decorator={[FormItem]}
          component={[Input]}
        />
        <FormButtonGroup layout="compact">
          <Reset />
          <Submit />
        </FormButtonGroup>
      </Form>
    ))

    await getByRole('button', { name: '提交' }).click()

    await vi.waitFor(() => {
      expect(onAutoSubmit).toHaveBeenCalledWith({
        keyword: 'silver-formily',
      })
    })
  })

  it('应该在紧凑布局下支持 Reset 重置值', async () => {
    const form = createForm({
      initialValues: {
        keyword: '初始值',
      },
    })

    const { getByRole } = render(() => (
      <FormProvider form={form}>
        <Field name="keyword" component={[Input]} />
        <FormButtonGroup layout="compact">
          <Reset />
          <Submit />
        </FormButtonGroup>
      </FormProvider>
    ))

    await getByRole('textbox').fill('新值')
    expect(form.values.keyword).toBe('新值')

    await getByRole('button', { name: '重置' }).click()
    expect(form.values.keyword).toBe('初始值')
  })

  it('应该支持渲染粘性按钮组', async () => {
    const form = createForm({
      values: {
        keyword: 'sticky',
      },
    })

    render(() => (
      <Form form={form}>
        <Field
          name="keyword"
          title="关键词"
          decorator={[FormItem]}
          component={[Input]}
        />
        <FormButtonGroup.Sticky>
          <FormButtonGroup layout="horizontal">
            <Reset />
            <Submit />
          </FormButtonGroup>
        </FormButtonGroup.Sticky>
      </Form>
    ))

    expect(document.querySelector('.silver-formily-vant-form-button-group__sticky')).not.toBeNull()
    expect(document.querySelector('.van-sticky')).not.toBeNull()
    expect(document.querySelectorAll('.van-button')).toHaveLength(2)
  })

  it('应该默认吸附到底部', async () => {
    render(() => (
      <FormButtonGroup.Sticky>
        <FormButtonGroup layout="horizontal">
          <Submit />
        </FormButtonGroup>
      </FormButtonGroup.Sticky>
    ))

    expect(document.querySelector('.silver-formily-vant-form-button-group__sticky')).not.toBeNull()
    expect(document.querySelector('.van-sticky')).not.toBeNull()
  })
})
