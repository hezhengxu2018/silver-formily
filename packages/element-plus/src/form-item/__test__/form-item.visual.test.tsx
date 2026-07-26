import type { CSSProperties, VNode } from 'vue'
import { createForm } from '@silver-formily/core'
import { FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import { stylePrefix } from '../../__builtins__'
import { DatePicker, FormItem, Input } from '../../index'
import 'element-plus/theme-chalk/index.css'

const canvasStyle: CSSProperties = {
  boxSizing: 'border-box',
  width: '760px',
  padding: '24px',
  background: '#fff',
  color: '#303133',
  fontFamily: 'Arial, sans-serif',
}

function renderCanvas(testId: string, content: () => VNode) {
  return render(() => (
    <div data-testid={testId} style={canvasStyle}>
      <FormProvider form={createForm()}>
        {content()}
      </FormProvider>
    </div>
  ))
}

function queryElement(root: ParentNode, selector: string): HTMLElement {
  const element = root.querySelector<HTMLElement>(selector)
  expect(element, `Expected to find ${selector}`).not.toBeNull()
  return element!
}

async function waitForVisualStability() {
  await document.fonts.ready
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  })
}

function expectApproximately(actual: number, expected: number, tolerance = 1) {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance)
}

describe('formItem visual regression', () => {
  it('preserves horizontal labels, required marker, colon, and tooltip layout', async () => {
    const { getByTestId } = renderCanvas('horizontal-layout', () => (
      <div>
        <FormItem label="Default label" labelWidth={140}>
          <Input placeholder="Default input" />
        </FormItem>
        <FormItem label="Left aligned" labelAlign="left" labelWidth={140}>
          <Input placeholder="Left aligned input" />
        </FormItem>
        <FormItem
          label="Required field"
          labelWidth={140}
          asterisk
          tooltip="Helpful context"
        >
          <Input placeholder="Required input" />
        </FormItem>
      </div>
    ))

    const canvas = getByTestId('horizontal-layout')
    await waitForVisualStability()

    const root = canvas.element()
    const formItems = root.querySelectorAll<HTMLElement>('.el-form-item')
    const firstLabel = queryElement(formItems[0], '.el-form-item__label')
    const firstContent = queryElement(formItems[0], '.el-form-item__content')
    const secondLabel = queryElement(formItems[1], '.el-form-item__label')

    expect(firstLabel.getBoundingClientRect().right)
      .toBeLessThanOrEqual(firstContent.getBoundingClientRect().left)
    expect(getComputedStyle(firstLabel).textAlign).toBe('right')
    expect(getComputedStyle(secondLabel).textAlign).toBe('left')
    expect(queryElement(formItems[2], `.${stylePrefix}-form-item-colon`).textContent).toBe(':')
    expect(queryElement(formItems[2], `.${stylePrefix}-form-item-label-tooltip`)).toBeVisible()

    await expect.element(canvas).toMatchScreenshot('form-item-horizontal-layout')
  })

  it('preserves vertical, ellipsis, and wrapped label geometry', async () => {
    const { getByTestId } = renderCanvas('label-layouts', () => (
      <div>
        <FormItem label="Vertical label" layout="vertical">
          <Input placeholder="Vertical input" />
        </FormItem>
        <FormItem
          label="A long label that must remain on a single truncated line"
          labelWidth={120}
        >
          <Input placeholder="Ellipsis input" />
        </FormItem>
        <FormItem
          label="A long label that is allowed to wrap onto another line"
          labelWidth={120}
          labelWrap
        >
          <Input placeholder="Wrapped label input" />
        </FormItem>
      </div>
    ))

    const canvas = getByTestId('label-layouts')
    await waitForVisualStability()

    const formItems = canvas.element().querySelectorAll<HTMLElement>('.el-form-item')
    const verticalLabel = queryElement(formItems[0], '.el-form-item__label')
    const verticalContent = queryElement(formItems[0], '.el-form-item__content')
    const ellipsisLabel = queryElement(formItems[1], '.el-form-item__label')
    const wrappedLabel = queryElement(formItems[2], '.el-form-item__label')
    const ellipsisText = queryElement(
      ellipsisLabel,
      `.${stylePrefix}-form-item-label-content > span`,
    )
    const wrappedText = queryElement(
      wrappedLabel,
      `.${stylePrefix}-form-item-label-content > span`,
    )

    expect(verticalLabel.getBoundingClientRect().bottom)
      .toBeLessThanOrEqual(verticalContent.getBoundingClientRect().top)
    expectApproximately(ellipsisLabel.getBoundingClientRect().width, 120)
    expectApproximately(wrappedLabel.getBoundingClientRect().width, 120)
    expect(wrappedText.getBoundingClientRect().height)
      .toBeGreaterThan(ellipsisText.getBoundingClientRect().height)

    await expect.element(canvas).toMatchScreenshot('form-item-label-layouts')
  })

  it('preserves grid widths, explicit wrapper width, and wrapper alignment', async () => {
    const { getByTestId } = renderCanvas('width-and-alignment', () => (
      <div>
        <FormItem label="Grid label" labelCol={6} wrapperCol={18}>
          <Input placeholder="Grid input" />
        </FormItem>
        <FormItem
          label="Fixed wrapper"
          labelWidth={140}
          wrapperWidth={260}
          wrapperAlign="right"
        >
          <Input placeholder="Fixed width input" />
        </FormItem>
      </div>
    ))

    const canvas = getByTestId('width-and-alignment')
    await waitForVisualStability()

    const formItems = canvas.element().querySelectorAll<HTMLElement>('.el-form-item')
    const gridLabel = queryElement(formItems[0], `.${stylePrefix}-form-item-col-6`)
    const gridWrapper = queryElement(formItems[0], `.${stylePrefix}-form-item-col-18`)
    const gridItemWidth = formItems[0].getBoundingClientRect().width
    const fixedContent = queryElement(formItems[1], '.el-form-item__content')
    const fixedWrapper = queryElement(formItems[1], `.${stylePrefix}-form-item-content__wrapper`)

    expectApproximately(gridLabel.getBoundingClientRect().width, gridItemWidth * 0.25)
    expectApproximately(gridWrapper.getBoundingClientRect().width, gridItemWidth * 0.75)
    expectApproximately(fixedContent.getBoundingClientRect().width, 260)
    expectApproximately(
      fixedContent.getBoundingClientRect().right,
      fixedWrapper.getBoundingClientRect().right,
    )

    await expect.element(canvas).toMatchScreenshot('form-item-width-and-alignment')
  })

  it('preserves addons and fullness behavior', async () => {
    const { getByTestId } = renderCanvas('addons-and-fullness', () => (
      <div>
        <FormItem
          label="Resource"
          labelWidth={140}
          addonBefore="https://"
          addonAfter=".example.com"
        >
          <Input placeholder="subdomain" />
        </FormItem>
        <FormItem label="Default picker" labelWidth={140}>
          <DatePicker placeholder="Default width" />
        </FormItem>
        <FormItem label="Full picker" labelWidth={140} fullness>
          <DatePicker placeholder="Full width" />
        </FormItem>
      </div>
    ))

    const canvas = getByTestId('addons-and-fullness')
    await waitForVisualStability()

    const formItems = canvas.element().querySelectorAll<HTMLElement>('.el-form-item')
    const before = queryElement(formItems[0], `.${stylePrefix}-form-item-addon-before`)
    const input = queryElement(formItems[0], '.el-input')
    const after = queryElement(formItems[0], `.${stylePrefix}-form-item-addon-after`)
    const defaultPicker = queryElement(formItems[1], '.el-date-editor')
    const fullPicker = queryElement(formItems[2], '.el-date-editor')
    const fullContent = queryElement(formItems[2], '.el-form-item__content')

    expect(before.getBoundingClientRect().right).toBeLessThanOrEqual(input.getBoundingClientRect().left)
    expect(input.getBoundingClientRect().right).toBeLessThanOrEqual(after.getBoundingClientRect().left)
    expect(defaultPicker.getBoundingClientRect().width)
      .toBeLessThan(fullContent.getBoundingClientRect().width)
    expectApproximately(
      fullPicker.getBoundingClientRect().width,
      fullContent.getBoundingClientRect().width,
    )

    await expect.element(canvas).toMatchScreenshot('form-item-addons-and-fullness')
  })

  it('preserves small, default, and large control sizes', async () => {
    const { getByTestId } = renderCanvas('component-sizes', () => (
      <div>
        <FormItem label="Small" labelWidth={140} size="small">
          <Input placeholder="Small input" />
        </FormItem>
        <FormItem label="Default" labelWidth={140} size="default">
          <Input placeholder="Default input" />
        </FormItem>
        <FormItem label="Large" labelWidth={140} size="large">
          <Input placeholder="Large input" />
        </FormItem>
      </div>
    ))

    const canvas = getByTestId('component-sizes')
    await waitForVisualStability()

    const inputs = canvas.element().querySelectorAll<HTMLElement>('.el-input__wrapper')
    const heights = Array.from(inputs, input => input.getBoundingClientRect().height)

    expect(heights[0]).toBeLessThan(heights[1])
    expect(heights[1]).toBeLessThan(heights[2])

    await expect.element(canvas).toMatchScreenshot('form-item-component-sizes')
  })

  it('preserves feedback states and inline feedback layouts', async () => {
    const { getByTestId } = renderCanvas('feedback-states', () => (
      <div>
        <FormItem
          label="Error"
          labelWidth={140}
          feedbackStatus="error"
          feedbackText="Error feedback"
          feedbackLayout="loose"
        >
          <Input placeholder="Error input" />
        </FormItem>
        <FormItem
          label="Warning"
          labelWidth={140}
          feedbackStatus="warning"
          feedbackText="Warning feedback"
          feedbackLayout="terse"
        >
          <Input placeholder="Warning input" />
        </FormItem>
        <FormItem
          label="Success"
          labelWidth={140}
          feedbackStatus="success"
          feedbackText="Success feedback"
          extra="Additional context"
          feedbackLayout="terse"
        >
          <Input placeholder="Success input" />
        </FormItem>
        <FormItem
          label="Pending"
          labelWidth={140}
          feedbackStatus="pending"
          feedbackText="Pending feedback"
          feedbackLayout="terse"
        >
          <Input placeholder="Pending input" />
        </FormItem>
      </div>
    ))

    const canvas = getByTestId('feedback-states')
    await waitForVisualStability()

    const root = canvas.element()
    const errorInput = queryElement(root, '.is-error .el-input')
    const errorFeedback = queryElement(root, `.${stylePrefix}-form-item-feedback.is-error`)
    const warningFeedback = queryElement(root, `.${stylePrefix}-form-item-feedback.is-warning`)
    const successFeedback = queryElement(root, `.${stylePrefix}-form-item-feedback.is-success`)

    expect(errorFeedback.getBoundingClientRect().top)
      .toBeGreaterThanOrEqual(errorInput.getBoundingClientRect().bottom)
    expect(getComputedStyle(errorFeedback).color).not.toBe(getComputedStyle(warningFeedback).color)
    expect(getComputedStyle(warningFeedback).color).not.toBe(getComputedStyle(successFeedback).color)
    expect(queryElement(root, `.${stylePrefix}-form-item-extra`)).toBeVisible()

    await expect.element(canvas).toMatchScreenshot('form-item-feedback-states')
  })

  it('preserves popover feedback layout', async () => {
    const { getByTestId } = renderCanvas('popover-feedback', () => (
      <FormItem
        label="Popover"
        labelWidth={140}
        feedbackStatus="error"
        feedbackText="Popover feedback"
        feedbackLayout="popover"
      >
        <Input placeholder="Popover input" />
      </FormItem>
    ))

    const canvas = getByTestId('popover-feedback')
    let popover: HTMLElement | null = null

    await vi.waitFor(() => {
      popover = document.querySelector<HTMLElement>('.el-popper[role="tooltip"]')
      expect(popover).not.toBeNull()
      expect(popover!.textContent).toContain('Popover feedback')
    })
    await waitForVisualStability()

    const input = queryElement(canvas.element(), '.el-input')
    expect(popover!.getBoundingClientRect().left)
      .toBeGreaterThanOrEqual(input.getBoundingClientRect().left)
    await expect.element(popover!).toMatchScreenshot('form-item-popover-feedback')
  })

  it('preserves the isolated FormItem root layout', async () => {
    const { getByTestId } = renderCanvas('isolated-root', () => (
      <FormItem
        label="Isolated"
        labelWidth={140}
        internalFormItemClass={`${stylePrefix}-form-item--isolated`}
        asterisk
      >
        <Input placeholder="Isolated input" />
      </FormItem>
    ))

    const canvas = getByTestId('isolated-root')
    await waitForVisualStability()

    const root = queryElement(canvas.element(), `.${stylePrefix}-form-item--isolated`)
    const label = queryElement(root, '.el-form-item__label')
    const content = queryElement(root, '.el-form-item__content')

    expect(root).not.toHaveClass('el-form-item')
    expect(label.getBoundingClientRect().right).toBeLessThanOrEqual(content.getBoundingClientRect().left)

    await expect.element(canvas).toMatchScreenshot('form-item-isolated-root')
  })
})
