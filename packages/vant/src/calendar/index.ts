import { isVoidField } from '@formily/core'
import { observer } from '@silver-formily/reactive-vue'
import { useField } from '@silver-formily/vue'
import { computed, defineComponent, h, markRaw } from 'vue'
import { PreviewText } from '../preview-text'
import FCalendar from './calendar.vue'

export const Calendar = markRaw(observer(defineComponent({
  name: FCalendar.name,
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const fieldRef = useField()

    const componentProps = computed(() => {
      const normalizedAttrs = { ...attrs } as Record<string, any>

      if (!('readonly' in normalizedAttrs) && 'readOnly' in normalizedAttrs) {
        normalizedAttrs.readonly = normalizedAttrs.readOnly
      }

      return normalizedAttrs
    })

    const targetComponent = computed(() => {
      const field = fieldRef.value

      if (field && !isVoidField(field) && field.pattern === 'readPretty') {
        return PreviewText.Calendar
      }

      return FCalendar
    })

    return {
      componentProps,
      targetComponent,
      slots,
    }
  },
  render() {
    return h(this.targetComponent as any, {
      ...this.componentProps,
    }, this.slots)
  },
}))) as unknown as typeof FCalendar

export default Calendar

export type {
  CalendarConfirmTextSlotProps,
  CalendarDayItem,
  CalendarDayType,
  CalendarDisplayFormatter,
  CalendarModelValue,
  CalendarMonthTitleSlotProps,
  CalendarSlots,
  CalendarSubtitleSlotProps,
  CalendarSwitchMode,
  CalendarSwitchSlotProps,
  CalendarThemeVars,
  CalendarType,
  VanCalendarInstance,
  VanCalendarProps,
} from './types'
