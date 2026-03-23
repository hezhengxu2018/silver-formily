import { createForm } from '@formily/core'
import { Field, FormProvider } from '@silver-formily/vue'
import { describe, expect, it, vi } from 'vitest'
import { render } from 'vitest-browser-vue'
import FormItem from '../../form-item'
import Calendar from '../index'
import 'vant/lib/index.css'

const marchStart = new Date(2026, 2, 1)
const marchEnd = new Date(2026, 2, 31)
const defaultDate = new Date(2026, 2, 23)

function getTrigger(container: Element) {
  return container.querySelector<HTMLInputElement>('input.van-field__control')!
}

function getVisibleCalendar() {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-calendar')).find((calendar) => {
    const popup = calendar.closest<HTMLElement>('.van-popup')

    if (!popup) {
      return true
    }

    return window.getComputedStyle(popup).display !== 'none'
  }) ?? null
}

function getCalendarDay(text: string) {
  return Array.from(document.querySelectorAll<HTMLElement>('.van-calendar__day')).find((element) => {
    return element.textContent?.trim() === text && !element.className.includes('van-calendar__day--disabled')
  })!
}

describe('calendar', () => {
  it('应该在不手动维护 show 的情况下打开弹层', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="date"
          title="日期"
          decorator={[FormItem]}
          component={[Calendar, {
            minDate: marchStart,
            maxDate: marchEnd,
          }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    expect(trigger).toHaveAttribute('placeholder', '请选择日期')
    expect(trigger).toHaveAttribute('readonly')

    trigger.click()

    await vi.waitFor(() => {
      expect(getVisibleCalendar()).not.toBeNull()
    })
  })

  it('应该在确认后更新字段值并自动关闭弹层', async () => {
    const form = createForm({
      values: {
        travelDate: defaultDate,
      },
    })

    const { container } = render(() => (
      <FormProvider form={form}>
        <Field
          name="travelDate"
          title="出发日期"
          decorator={[FormItem]}
          component={[Calendar, {
            minDate: marchStart,
            maxDate: marchEnd,
          }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    trigger.click()

    await vi.waitFor(() => {
      expect(getVisibleCalendar()).not.toBeNull()
    })

    getCalendarDay('25').click()
    document.querySelector<HTMLElement>('.van-calendar__confirm')!.click()

    await vi.waitFor(() => {
      const value = form.values.travelDate as Date

      expect(value).toBeInstanceOf(Date)
      expect(value.getFullYear()).toBe(2026)
      expect(value.getMonth()).toBe(2)
      expect(value.getDate()).toBe(25)
      expect(getVisibleCalendar()).toBeNull()
      expect(trigger.value).toBe('2026-03-25')
    })
  })

  it('应该在只读状态下阻止打开弹层', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm()}>
        <Field
          name="date"
          title="日期"
          decorator={[FormItem]}
          component={[Calendar, {
            readonly: true,
            minDate: marchStart,
            maxDate: marchEnd,
          }]}
        />
      </FormProvider>
    ))

    const trigger = getTrigger(container)

    trigger.click()

    await vi.waitFor(() => {
      expect(getVisibleCalendar()).toBeNull()
    })
  })

  it('应该透传官方插槽', async () => {
    const { container } = render(() => (
      <Calendar
        minDate={marchStart}
        maxDate={marchEnd}
      >
        {{
          title: () => <div class="calendar-slot-title">自定义标题</div>,
          footer: () => <div class="calendar-slot-footer">自定义底部</div>,
        }}
      </Calendar>
    ))

    getTrigger(container).click()

    await vi.waitFor(() => {
      expect(document.querySelector('.calendar-slot-title')).not.toBeNull()
      expect(document.querySelector('.calendar-slot-footer')).not.toBeNull()
      expect(getVisibleCalendar()).not.toBeNull()
    })
  })
})

describe('calendar readPretty', () => {
  it('应该在阅读态下显示格式化后的日期文本', async () => {
    const { container } = render(() => (
      <FormProvider form={createForm({
        values: {
          date: defaultDate,
        },
      })}
      >
        <Field
          name="date"
          pattern="readPretty"
          decorator={[FormItem]}
          component={[Calendar]}
        />
      </FormProvider>
    ))

    expect(container.textContent).toContain('2026-03-23')
  })
})
