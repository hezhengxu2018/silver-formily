import { afterEach, expect, it } from 'vitest'
import { cleanup, render } from 'vitest-browser-react'
import { CalendarPicker, CascadePicker, Cascader, CheckListPicker, DatePicker, FormItem, Picker } from '../src'

afterEach(cleanup)

it.each([false, true])('shares trigger scrolling and wrapping across every picker (wrap: %s)', async (triggerWrap) => {
  const props = { triggerWrap, placeholder: '很长的选项名称用于检查是否自动换行显示'.repeat(5), style: { width: 120 } }
  await render(
    <>
      <Picker {...props} columns={[]} />
      <CascadePicker {...props} options={[]} />
      <Cascader {...props} options={[]} />
      <DatePicker {...props} />
      <CalendarPicker {...props} />
      <CheckListPicker {...props} />
    </>,
  )
  const triggers = document.querySelectorAll<HTMLButtonElement>('[data-form-item-trigger]')
  expect(triggers).toHaveLength(6)
  for (const button of triggers) {
    expect(getComputedStyle(button).whiteSpace).toBe(triggerWrap ? 'normal' : 'nowrap')
    if (triggerWrap)
      expect(button.clientHeight).toBeGreaterThan(40)
    else
      expect(button.scrollWidth).toBeGreaterThan(button.clientWidth)
  }
})

it.each([false, true])('lays out multiple selections as tags (wrap: %s)', async (triggerWrap) => {
  await render(<CheckListPicker multiple triggerWrap={triggerWrap} value={[1, 2, 3, 4]} options={[1, 2, 3, 4].map(value => ({ value, label: `选项 ${value}` }))} style={{ width: 120 }} />)
  const button = document.querySelector<HTMLButtonElement>('[data-form-item-trigger]')!
  expect(button.querySelectorAll('.adm-space .adm-tag')).toHaveLength(4)
  expect(button.textContent).not.toContain('/')
  if (triggerWrap)
    expect(button.clientHeight).toBeGreaterThan(24)
  else
    expect(button.scrollWidth).toBeGreaterThan(button.clientWidth)
})

it.each([false, true])('keeps the FormItem arrow in bounds with long tags (wrap: %s)', async (triggerWrap) => {
  await render(
    <div style={{ width: 360 }}>
      <FormItem.BaseItem label="多选">
        <CheckListPicker multiple triggerWrap={triggerWrap} value={Array.from({ length: 20 }, (_, index) => index)} options={Array.from({ length: 20 }, (_, value) => ({ value, label: `长选项 ${value}` }))} />
      </FormItem.BaseItem>
    </div>,
  )
  await expect.poll(() => document.querySelector('.adm-list-item-content-arrow')).not.toBeNull()
  const row = document.querySelector('[data-form-item]')!
  const button = row.querySelector<HTMLButtonElement>('[data-form-item-trigger]')!
  const arrow = row.querySelector('.adm-list-item-content-arrow')!
  expect(arrow.getBoundingClientRect().right).toBeLessThanOrEqual(row.getBoundingClientRect().right)
  expect(row.scrollWidth).toBeLessThanOrEqual(row.clientWidth)
  if (triggerWrap) {
    expect(button.clientHeight).toBeGreaterThan(40)
  }
  else {
    expect(button.scrollWidth).toBeGreaterThan(button.clientWidth)
    button.scrollLeft = 100
    expect(button.scrollLeft).toBeGreaterThan(0)
  }
})
